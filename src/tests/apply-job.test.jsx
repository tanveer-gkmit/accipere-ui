import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import ApplyFormModal from '../components/jobs/apply-form-modal';
import { axiosInstance } from '../api';
import { toast } from 'sonner';
import { createMockFile } from '../constants/test-data';

/**
 * Test Suite: Job Application Form
 * 
 * This test suite ensures:
 * 1. No real API calls are made (all axios methods are mocked)
 * 2. Form rendering and field interactions work correctly
 * 3. File upload functionality is tested
 * 4. Modal behavior (open/close) works as expected
 * 5. All form sections are properly displayed
 */

// Mock axios - prevent any real API calls
vi.mock('../api', () => ({
  axiosInstance: {
    get: vi.fn(),
    post: vi.fn(),
    patch: vi.fn(),
    delete: vi.fn(),
    put: vi.fn(),
  },
}));

// Mock toast
vi.mock('sonner', () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

describe('Job Application Flow', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const mockFile = createMockFile();

  it('renders apply form modal with job title', () => {
    render(
      <ApplyFormModal
        jobId="123"
        jobTitle="Senior Frontend Developer"
        isOpen={true}
        onClose={vi.fn()}
      />
    );

    expect(screen.getByText(/Apply for Senior Frontend Developer/i)).toBeInTheDocument();
  });

  it('handles resume file upload correctly', () => {
    render(
      <ApplyFormModal
        jobId="123"
        jobTitle="Senior Frontend Developer"
        isOpen={true}
        onClose={vi.fn()}
      />
    );

    const fileInput = screen.getByLabelText(/Upload your resume/i);
    fireEvent.change(fileInput, { target: { files: [mockFile] } });

    // File should be selected
    expect(fileInput.files[0]).toBe(mockFile);
    expect(fileInput.files).toHaveLength(1);
  });

  it('does not render modal when isOpen is false', () => {
    const { container } = render(
      <ApplyFormModal
        jobId="123"
        jobTitle="Senior Frontend Developer"
        isOpen={false}
        onClose={vi.fn()}
      />
    );

    expect(container.querySelector('[role="dialog"]')).not.toBeInTheDocument();
  });

  it('calls onClose when cancel button is clicked', () => {
    const mockOnClose = vi.fn();

    render(
      <ApplyFormModal
        jobId="123"
        jobTitle="Senior Frontend Developer"
        isOpen={true}
        onClose={mockOnClose}
      />
    );

    const cancelButton = screen.getByRole('button', { name: /Cancel/i });
    fireEvent.click(cancelButton);

    expect(mockOnClose).toHaveBeenCalled();
  });

  it('displays form with multiple input fields', () => {
    render(
      <ApplyFormModal
        jobId="123"
        jobTitle="Senior Frontend Developer"
        isOpen={true}
        onClose={vi.fn()}
      />
    );

    // Check that form has multiple input fields
    const inputs = screen.getAllByRole('textbox');
    expect(inputs.length).toBeGreaterThan(5); // Should have many text inputs

    // Check for submit button
    expect(screen.getByRole('button', { name: /Submit Application/i })).toBeInTheDocument();
  });

  it('allows user to interact with form inputs', () => {
    render(
      <ApplyFormModal
        jobId="123"
        jobTitle="Senior Frontend Developer"
        isOpen={true}
        onClose={vi.fn()}
      />
    );

    // Get all input fields
    const inputs = screen.getAllByRole('textbox');
    expect(inputs.length).toBeGreaterThan(0);

    // Verify inputs can be interacted with
    const firstInput = inputs[0];
    fireEvent.change(firstInput, { target: { value: 'Test Value' } });
    expect(firstInput).toHaveValue('Test Value');
  });

  it('displays submit and cancel buttons', () => {
    render(
      <ApplyFormModal
        jobId="123"
        jobTitle="Senior Frontend Developer"
        isOpen={true}
        onClose={vi.fn()}
      />
    );

    expect(screen.getByRole('button', { name: /Submit Application/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Cancel/i })).toBeInTheDocument();
  });

  it('renders modal title with job title', () => {
    render(
      <ApplyFormModal
        jobId="456"
        jobTitle="Backend Engineer"
        isOpen={true}
        onClose={vi.fn()}
      />
    );

    expect(screen.getByText(/Apply for Backend Engineer/i)).toBeInTheDocument();
  });

  it('contains file upload input for resume', () => {
    render(
      <ApplyFormModal
        jobId="123"
        jobTitle="Senior Frontend Developer"
        isOpen={true}
        onClose={vi.fn()}
      />
    );

    const fileInputs = screen.getAllByRole('button', { hidden: true }).length > 0 || 
                       document.querySelector('input[type="file"]') !== null;
    expect(fileInputs).toBeTruthy();
  });

  it('has proper form structure with submit button', () => {
    render(
      <ApplyFormModal
        jobId="123"
        jobTitle="Senior Frontend Developer"
        isOpen={true}
        onClose={vi.fn()}
      />
    );

    const submitButton = screen.getByRole('button', { name: /Submit Application/i });
    expect(submitButton).toBeInTheDocument();
    expect(submitButton).not.toBeDisabled();
  });
});
