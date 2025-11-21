import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import { JobForm } from '../components/dashboard/job-form';
import { ConfirmDialog } from '../components/ui/confirm-dialog';
import JobCreate from '../pages/dashboard/job-create';
import JobEdit from '../pages/dashboard/job-edit';
import JobOpeningList from '../pages/dashboard/job-opening-list';
import { axiosInstance } from '../api';
import { mockJobData, mockJobsResponse } from '../constants/test-data';

// Mock axios
vi.mock('../api', () => ({
  axiosInstance: {
    get: vi.fn(),
    post: vi.fn(),
    patch: vi.fn(),
    delete: vi.fn(),
  },
}));

// Mock useNavigate
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
    useParams: () => ({ jobId: '123' }),
  };
});

// Mock DashboardLayout
vi.mock('../components/layout/dashboard-layout', () => ({
  DashboardLayout: ({ children }) => <div data-testid="dashboard-layout">{children}</div>,
}));

// Mock RoleGuard
vi.mock('../middleware/role-guard', () => ({
  RoleGuard: ({ children }) => <div>{children}</div>,
}));

// Mock constants
vi.mock('../constants/roles', () => ({
  ROLE_GROUPS: {
    ADMIN_ONLY: ['admin'],
  },
}));

describe('JobForm Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders form and submits with valid data', async () => {
    const mockSubmit = vi.fn();
    render(<JobForm onSubmit={mockSubmit} />);

    fireEvent.change(screen.getByLabelText(/Job Title/i), { target: { value: 'Developer' } });
    fireEvent.change(screen.getByLabelText(/Department/i), { target: { value: 'Engineering' } });
    fireEvent.change(screen.getByLabelText(/Location/i), { target: { value: 'Remote' } });
    fireEvent.change(screen.getByLabelText(/Job Description/i), { target: { value: 'Great job' } });
    fireEvent.change(screen.getByLabelText(/Requirements/i), { target: { value: 'Experience' } });

    fireEvent.submit(screen.getByRole('button', { name: /Publish Job/i }));

    await waitFor(() => {
      expect(mockSubmit).toHaveBeenCalledWith(
        expect.objectContaining({
          title: 'Developer',
          department: 'Engineering',
          location: 'Remote',
        })
      );
    });
  });

  it('populates form with initial data in edit mode', () => {
    const initialData = {
      title: 'Frontend Developer',
      department: 'Engineering',
      location: 'San Francisco',
    };

    render(<JobForm initialData={initialData} isEditMode={true} />);

    expect(screen.getByLabelText(/Job Title/i)).toHaveValue('Frontend Developer');
    expect(screen.getByRole('button', { name: /Update Job/i })).toBeInTheDocument();
  });

  it('disables buttons when loading', () => {
    const mockCancel = vi.fn();
    render(<JobForm onCancel={mockCancel} loading={true} />);

    expect(screen.getByRole('button', { name: /Saving.../i })).toBeDisabled();
    expect(screen.getByRole('button', { name: /Cancel/i })).toBeDisabled();
  });
});

describe('ConfirmDialog Component', () => {
  it('renders and triggers confirm action', () => {
    const mockConfirm = vi.fn();
    const trigger = <button>Delete</button>;

    render(
      <ConfirmDialog
        trigger={trigger}
        title="Confirm Delete"
        description="Are you sure?"
        onConfirm={mockConfirm}
      />
    );

    fireEvent.click(screen.getByRole('button', { name: /Delete/i }));
    expect(screen.getByText(/Confirm Delete/i)).toBeInTheDocument();
  });
});

describe('JobCreate Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('creates job successfully and navigates', async () => {
    axiosInstance.post.mockResolvedValueOnce({ data: { id: 1 } });

    render(
      <BrowserRouter>
        <JobCreate />
      </BrowserRouter>
    );

    fireEvent.change(screen.getByLabelText(/Job Title/i), { target: { value: 'Developer' } });
    fireEvent.change(screen.getByLabelText(/Department/i), { target: { value: 'Engineering' } });
    fireEvent.change(screen.getByLabelText(/Location/i), { target: { value: 'Remote' } });
    fireEvent.change(screen.getByLabelText(/Job Description/i), { target: { value: 'Great job' } });
    fireEvent.change(screen.getByLabelText(/Requirements/i), { target: { value: 'Experience' } });

    fireEvent.submit(screen.getByRole('button', { name: /Publish Job/i }));

    await waitFor(() => {
      expect(axiosInstance.post).toHaveBeenCalledWith('/api/jobs/', expect.any(Object));
      expect(mockNavigate).toHaveBeenCalledWith('/dashboard/jobs');
    });
  });

  it('displays error when job creation fails', async () => {
    axiosInstance.post.mockRejectedValueOnce({
      response: { data: { detail: 'Failed to create job' } },
    });

    render(
      <BrowserRouter>
        <JobCreate />
      </BrowserRouter>
    );

    fireEvent.change(screen.getByLabelText(/Job Title/i), { target: { value: 'Developer' } });
    fireEvent.change(screen.getByLabelText(/Department/i), { target: { value: 'Engineering' } });
    fireEvent.change(screen.getByLabelText(/Location/i), { target: { value: 'Remote' } });
    fireEvent.change(screen.getByLabelText(/Job Description/i), { target: { value: 'Great job' } });
    fireEvent.change(screen.getByLabelText(/Requirements/i), { target: { value: 'Experience' } });

    fireEvent.submit(screen.getByRole('button', { name: /Publish Job/i }));

    await waitFor(() => {
      expect(screen.getByText(/Failed to create job/i)).toBeInTheDocument();
    });
  });
});

describe('JobEdit Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('fetches and displays job data', async () => {
    axiosInstance.get.mockResolvedValueOnce({ data: mockJobData });

    render(
      <BrowserRouter>
        <JobEdit />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(axiosInstance.get).toHaveBeenCalledWith('/api/jobs/123/');
      expect(screen.getByLabelText(/Job Title/i)).toHaveValue('Senior Developer');
    });
  });

  it('updates job successfully', async () => {
    axiosInstance.get.mockResolvedValueOnce({ data: mockJobData });
    axiosInstance.patch.mockResolvedValueOnce({ data: mockJobData });

    render(
      <BrowserRouter>
        <JobEdit />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByLabelText(/Job Title/i)).toHaveValue('Senior Developer');
    });

    fireEvent.change(screen.getByLabelText(/Job Title/i), { target: { value: 'Lead Developer' } });
    fireEvent.submit(screen.getByRole('button', { name: /Update Job/i }));

    await waitFor(() => {
      expect(axiosInstance.patch).toHaveBeenCalledWith('/api/jobs/123/', expect.any(Object));
      expect(mockNavigate).toHaveBeenCalledWith('/dashboard/jobs');
    });
  });

  it('displays error when fetch fails', async () => {
    axiosInstance.get.mockRejectedValueOnce(new Error('Failed to fetch job details'));

    render(
      <BrowserRouter>
        <JobEdit />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/Failed to fetch job details/i)).toBeInTheDocument();
    });
  });
});

describe('JobOpeningList Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('fetches and displays jobs list', async () => {
    axiosInstance.get.mockResolvedValueOnce({ data: mockJobsResponse });

    render(
      <BrowserRouter>
        <JobOpeningList />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(axiosInstance.get).toHaveBeenCalledWith('/api/jobs/');
      expect(screen.getByText('Frontend Developer')).toBeInTheDocument();
      expect(screen.getByText('Backend Developer')).toBeInTheDocument();
    });
  });

  it('deletes job successfully', async () => {
    axiosInstance.get.mockResolvedValueOnce({ data: mockJobsResponse });
    axiosInstance.delete.mockResolvedValueOnce({});

    render(
      <BrowserRouter>
        <JobOpeningList />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Frontend Developer')).toBeInTheDocument();
    });

    const deleteButtons = screen.getAllByRole('button', { name: /Delete/i });
    fireEvent.click(deleteButtons[0]);

    const confirmButton = screen.getByRole('button', { name: /Delete/i });
    fireEvent.click(confirmButton);

    await waitFor(() => {
      expect(axiosInstance.delete).toHaveBeenCalledWith('/api/jobs/1/');
      expect(screen.queryByText('Frontend Developer')).not.toBeInTheDocument();
    });
  });

  it('displays error when fetch fails', async () => {
    axiosInstance.get.mockRejectedValueOnce(new Error('Failed to fetch jobs'));

    render(
      <BrowserRouter>
        <JobOpeningList />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/Error: Failed to fetch jobs/i)).toBeInTheDocument();
    });
  });

  it('displays empty state when no jobs', async () => {
    axiosInstance.get.mockResolvedValueOnce({ data: { results: [] } });

    render(
      <BrowserRouter>
        <JobOpeningList />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/No jobs found/i)).toBeInTheDocument();
    });
  });
});
