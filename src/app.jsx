import "./app.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import { AuthProvider } from "@/contexts/auth-context";
import { ProtectedRoute } from "@/middleware/protected-route";
import { PublicRoute } from "@/middleware/public-route";
import { ROLE_GROUPS, USER_ROLES } from "@/constants/roles";
import { ROUTES } from "@/constants/routes";
import LoginPage from "@/pages/auth/login";
import SetPassword from "@/pages/set-password";
import Jobs from "@/pages/index";
import Dashboard from "@/pages/dashboard/index";
import JobOpeningList from "@/pages/dashboard/job-opening-list";
import JobCreate from "@/pages/dashboard/job-create";
import JobEdit from "@/pages/dashboard/job-edit";
import JobApplicants from "@/pages/dashboard/job-applicants";
import ApplicantDetail from "@/pages/dashboard/applicant-detail";
import Organization from "@/pages/dashboard/organization";
import Settings from "@/pages/dashboard/settings";
import StageConfig from "@/pages/dashboard/stage-config";
import UnauthorizedPage from "@/pages/unauthorized";
import NotFound from "@/pages/not-found";
import { UserRound } from "lucide-react";
import { Navigate } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
             <Route path="/index.html" element={<Navigate to="/" replace />} />
            <Route
              path={ROUTES.LOGIN}
              element={
                <PublicRoute>
                  <LoginPage />
                </PublicRoute>
              }
            />
            <Route
              path={ROUTES.SET_PASSWORD}
              element={
                <PublicRoute>
                  <SetPassword />
                </PublicRoute>
              }
            />

            <Route
              path={ROUTES.HOME}
              element={
                <PublicRoute>
                  <Jobs />
                </PublicRoute>
              }
            />
            
            <Route path={ROUTES.UNAUTHORIZED} element={<UnauthorizedPage />} />

            {/* Dashboard Routes - Administrator & Recruiter */}
            <Route
              path={ROUTES.DASHBOARD}
              element={
                <ProtectedRoute allowedRoles={[USER_ROLES.ADMINISTRATOR, USER_ROLES.RECRUITER, USER_ROLES.TECHNICAL_EVALUATOR]}>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path={ROUTES.DASHBOARD_JOBS}
              element={
                <ProtectedRoute allowedRoles={ROLE_GROUPS.DASHBOARD_ACCESS}>
                  <JobOpeningList />
                </ProtectedRoute>
              }
            />
            <Route
              path={ROUTES.DASHBOARD_JOBS_NEW}
              element={
                <ProtectedRoute allowedRoles={ROLE_GROUPS.DASHBOARD_ACCESS}>
                  <JobCreate />
                </ProtectedRoute>
              }
            />
            <Route
              path={ROUTES.DASHBOARD_JOBS_EDIT}
              element={
                <ProtectedRoute allowedRoles={ROLE_GROUPS.DASHBOARD_ACCESS}>
                  <JobEdit />
                </ProtectedRoute>
              }
            />
            <Route
              path={ROUTES.DASHBOARD_JOBS_APPLICANTS}
              element={
                <ProtectedRoute allowedRoles={ROLE_GROUPS.DASHBOARD_ACCESS}>
                  <JobApplicants />
                </ProtectedRoute>
              }
            />
            <Route
              path={ROUTES.DASHBOARD_APPLICANT_DETAIL}
              element={
                <ProtectedRoute allowedRoles={[USER_ROLES.ADMINISTRATOR, USER_ROLES.RECRUITER, USER_ROLES.TECHNICAL_EVALUATOR]}>
                  <ApplicantDetail />
                </ProtectedRoute>
              }
            />

            {/* Administrator only */}
            <Route
              path={ROUTES.DASHBOARD_ORGANIZATION}
              element={
                <ProtectedRoute allowedRoles={ROLE_GROUPS.ADMIN_ONLY}>
                  <Organization />
                </ProtectedRoute>
              }
            />
            <Route
              path={ROUTES.DASHBOARD_SETTINGS}
              element={
                <ProtectedRoute allowedRoles={ROLE_GROUPS.ADMIN_ONLY}>
                  <Settings />
                </ProtectedRoute>
              }
            />
            <Route
              path={ROUTES.DASHBOARD_SETTINGS_STAGE}
              element={
                <ProtectedRoute allowedRoles={ROLE_GROUPS.ADMIN_ONLY}>
                  <StageConfig />
                </ProtectedRoute>
              }
            />

            {/* 404 - Catch all unmatched routes */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
      <Toaster />
    </>
  );
}

export default App;
