
export const mockJobData = {
  id: 123,
  title: 'Senior Developer',
  department: 'Engineering',
  location: 'Remote',
  employment_type: 'Full-time',
  experience_level: 'Senior',
  description: 'Great opportunity',
  requirements: '5+ years',
  status: 'Open',
};

// Mock jobs list response
export const mockJobsResponse = {
  results: [
    {
      id: 1,
      title: 'Frontend Developer',
      department: 'Engineering',
      location: 'Remote',
      employment_type: 'Full-time',
      experience_level: 'Mid',
      status: 'Open',
      created_at: '2025-11-01T00:00:00Z',
    },
    {
      id: 2,
      title: 'Backend Developer',
      department: 'Engineering',
      location: 'San Francisco',
      employment_type: 'Full-time',
      experience_level: 'Senior',
      status: 'Closed',
      created_at: '2025-11-10T00:00:00Z',
    },
  ],
};

// Mock public jobs response for index page
export const mockPublicJobsResponse = {
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

// Mock file for testing file uploads
export const createMockFile = (name = 'resume.pdf', type = 'application/pdf', content = 'resume content') => {
  return new File([content], name, { type });
};
