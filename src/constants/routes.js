export const ROUTES = {
  // Public routes
  HOME: "/",
  LOGIN: "/login",
  SET_PASSWORD: "/set-password",
  UNAUTHORIZED: "/unauthorized",
  
  // Dashboard routes
  DASHBOARD: "/dashboard",
  DASHBOARD_JOBS: "/dashboard/jobs",
  DASHBOARD_JOBS_NEW: "/dashboard/jobs/new",
  DASHBOARD_JOBS_EDIT: "/dashboard/jobs/:jobId/edit",
  DASHBOARD_JOBS_APPLICANTS: "/dashboard/jobs/:jobId/applicants",
  DASHBOARD_APPLICANT_DETAIL: "/dashboard/applicants/:applicantId",
  DASHBOARD_ORGANIZATION: "/dashboard/organization",
  DASHBOARD_SETTINGS: "/dashboard/settings",
  DASHBOARD_SETTINGS_STAGE: "/dashboard/settings/stage",
};

// Helper functions for dynamic routes
export const getJobEditRoute = (jobId) => `/dashboard/jobs/${jobId}/edit`;
export const getJobApplicantsRoute = (jobId) => `/dashboard/jobs/${jobId}/applicants`;
export const getApplicantDetailRoute = (applicantId) => `/dashboard/applicants/${applicantId}`;
