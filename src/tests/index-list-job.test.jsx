import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Jobs from '../pages/index';
import { axiosInstance } from '../api';

/**
 * Test Suite: Public Job Listing Page
 * 
 * This test suite ensures:
 * 1. No real API calls are made (all axios methods are mocked)
 * 2. Job listing functionality works correctly
 * 3. Error handling and edge cases are covered
 * 4. Uses real React components without mocking
 */

// Mock only axios - use real React components
vi.mock('../api', () => ({
  axiosInstance: {
    get: vi.fn(),
    post: vi.fn(),
    patch: vi.fn(),
    delete: vi.fn(),
    put: vi.fn(),
  },
}));

describe('Index Page - Public Job Listing', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const mockPublicJobsResponse = {
    results: [
      {
        id: 1,
        title: 'Senior Frontend Developer',
        department: 'Engineering',
        location: 'Remote',
        employment_type: 'Full-time',
        experience_level: 'Senior',
        status: 'Open',
        description: 'We are looking for a senior frontend developer',
        requirements: '5+ years of React experience',
        created_at: '2025-11-01T00:00:00Z',
      },
      {
        id: 2,
        title: 'Product Designer',
        department: 'Design',
        location: 'San Francisco, CA',
        employment_type: 'Full-time',
        experience_level: 'Mid',
        status: 'Open',
        description: 'Join our design team',
        requirements: '3+ years of design experience',
        created_at: '2025-11-05T00:00:00Z',
      },
    ],
  };

  it('fetches and displays public job listings on page load', async () => {
    axiosInstance.get.mockResolvedValueOnce({ data: mockPublicJobsResponse });

    render(<Jobs />);

    // Check loading state
    expect(screen.getByText(/Loading jobs.../i)).toBeInTheDocument();

    // Wait for jobs to load
    await waitFor(() => {
      expect(axiosInstance.get).toHaveBeenCalledWith('/api/jobs/');
      expect(screen.getByText('Senior Frontend Developer')).toBeInTheDocument();
      expect(screen.getByText('Product Designer')).toBeInTheDocument();
    });
  });

  it('displays correct job count in header', async () => {
    axiosInstance.get.mockResolvedValueOnce({ data: mockPublicJobsResponse });

    render(<Jobs />);

    await waitFor(() => {
      expect(screen.getByText('2 jobs available')).toBeInTheDocument();
    });
  });

  it('displays error message when job fetch fails', async () => {
    axiosInstance.get.mockRejectedValueOnce(new Error('Network error'));

    render(<Jobs />);

    await waitFor(() => {
      expect(screen.getByText(/Error: Network error/i)).toBeInTheDocument();
    });
  });

  it('displays empty state when no jobs are available', async () => {
    axiosInstance.get.mockResolvedValueOnce({ data: { results: [] } });

    render(<Jobs />);

    await waitFor(() => {
      expect(screen.getByText(/No jobs available at the moment/i)).toBeInTheDocument();
    });
  });

  it('renders hero section with company logo and title', async () => {
    axiosInstance.get.mockResolvedValueOnce({ data: { results: [] } });

    render(<Jobs />);

    await waitFor(() => {
      expect(screen.getAllByText('Open Positions').length).toBeGreaterThan(0);
      expect(screen.getByText(/Explore current opportunities and join our team/i)).toBeInTheDocument();
      expect(screen.getByAltText('Accipere')).toBeInTheDocument();
    });
  });

  it('displays job cards when jobs are loaded', async () => {
    axiosInstance.get.mockResolvedValueOnce({ data: mockPublicJobsResponse });

    render(<Jobs />);

    await waitFor(() => {
      expect(screen.getByText('Senior Frontend Developer')).toBeInTheDocument();
      expect(screen.getByText('Product Designer')).toBeInTheDocument();
    });
  });

  it('shows job information correctly', async () => {
    axiosInstance.get.mockResolvedValueOnce({ data: mockPublicJobsResponse });

    render(<Jobs />);

    await waitFor(() => {
      expect(screen.getByText('Engineering')).toBeInTheDocument();
      expect(screen.getByText('Design')).toBeInTheDocument();
      expect(screen.getByText('Remote')).toBeInTheDocument();
      expect(screen.getByText('San Francisco, CA')).toBeInTheDocument();
    });
  });

  it('handles API error gracefully', async () => {
    const errorMessage = 'Failed to fetch jobs';
    axiosInstance.get.mockRejectedValueOnce(new Error(errorMessage));

    render(<Jobs />);

    await waitFor(() => {
      expect(screen.getByText(`Error: ${errorMessage}`)).toBeInTheDocument();
      expect(screen.queryByText('Senior Frontend Developer')).not.toBeInTheDocument();
    });
  });
});
