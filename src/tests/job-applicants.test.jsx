import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import JobApplicants from '../pages/dashboard/job-applicants';
import { DashboardLayout } from '../components/layout/dashboard-layout';
import ResumeViewerModal from '../components/jobs/resume-viewer-modal';
import axiosInstance from '../api/axios';

vi.mock('../api/axios');

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useParams: () => ({ jobId: '123' }),
  };
});

vi.mock('../components/layout/dashboard-layout');
vi.mock('../components/jobs/resume-viewer-modal');

vi.mock('../hooks/use-resume', () => ({
  useResume: () => ({
    resumeUrl: 'blob:mock-url',
    loading: false,
    fetchResume: vi.fn().mockResolvedValue({ url: 'blob:mock-url' }),
    cleanup: vi.fn(),
  }),
}));

vi.mock('../hooks/use-toast', () => ({
  useToast: () => ({ toast: vi.fn() }),
}));

describe('JobApplicants Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    
    DashboardLayout.mockImplementation(({ children }) => children);
    ResumeViewerModal.mockImplementation(({ isOpen, candidateName }) => 
      isOpen ? <div data-testid="resume-modal">{candidateName}'s Resume</div> : null
    );
  });

  const mockApplicants = [
    {
      id: 1,
      full_name: 'John Doe',
      email: 'john@example.com',
      phone_no: '123-456-7890',
      current_status_name: 'Applied',
      created_at: '2025-11-01T00:00:00Z',
      job_title: 'Frontend Developer',
    },
  ];

  it('fetches and displays applicants', async () => {
    axiosInstance.get.mockResolvedValueOnce({ data: mockApplicants });

    render(
      <BrowserRouter>
        <JobApplicants />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
      expect(screen.getByText('john@example.com')).toBeInTheDocument();
    });
  });

  it('displays empty state when no applicants', async () => {
    axiosInstance.get.mockResolvedValueOnce({ data: [] });

    render(
      <BrowserRouter>
        <JobApplicants />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('No applicants yet')).toBeInTheDocument();
    });
  });

  it('opens resume modal when Resume button clicked', async () => {
    axiosInstance.get.mockResolvedValueOnce({ data: mockApplicants });

    render(
      <BrowserRouter>
        <JobApplicants />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText('Resume'));

    await waitFor(() => {
      expect(screen.getByTestId('resume-modal')).toBeInTheDocument();
    });
  });
});
