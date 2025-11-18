import './app.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import { AuthProvider } from "@/contexts/auth-context";
import { ProtectedRoute } from "@/middleware/protected-route";
import { PublicRoute } from "@/middleware/public-route";
import { ROLE_GROUPS } from "@/constants/roles";
import LoginPage from "@/pages/auth/login"
import SetPassword from "@/pages/set-password"
import Jobs from "@/pages/index"
import JobOpeningList from "@/pages/dashboard/job-opening-list"
import JobCreate from "@/pages/dashboard/job-create"
import JobEdit from "@/pages/dashboard/job-edit"
import JobApplicants from "@/pages/dashboard/job-applicants"
import ApplicantDetail from "@/pages/dashboard/applicant-detail"
import Organization from "@/pages/dashboard/organization"
import Settings from "@/pages/dashboard/settings"
import StageConfig from "@/pages/dashboard/stage-config"
import UnauthorizedPage from "@/pages/unauthorized"

function App() {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route 
              path="/login" 
              element={
                <PublicRoute>
                  <LoginPage />
                </PublicRoute>
              } 
            />
            <Route path="/set-password" element={
              <PublicRoute>
                <SetPassword />

                
              </PublicRoute>
            } />

            <Route path="/unauthorized" element={<UnauthorizedPage />} />
            
            {/* Public route - accessible by anyone */}
            <Route path='/' element={<Jobs/>} />
            
            {/* Dashboard Routes - Administrator & Recruiter */}
            <Route 
              path="/dashboard/jobs" 
              element={
                <ProtectedRoute allowedRoles={ROLE_GROUPS.DASHBOARD_ACCESS}>
                  <JobOpeningList />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/dashboard/jobs/new" 
              element={
                <ProtectedRoute allowedRoles={ROLE_GROUPS.DASHBOARD_ACCESS}>
                  <JobCreate />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/dashboard/jobs/:jobId/edit" 
              element={
                <ProtectedRoute allowedRoles={ROLE_GROUPS.DASHBOARD_ACCESS}>
                  <JobEdit />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/dashboard/jobs/:jobId/applicants" 
              element={
                <ProtectedRoute allowedRoles={ROLE_GROUPS.DASHBOARD_ACCESS}>
                  <JobApplicants />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/dashboard/applicants/:applicantId" 
              element={
                <ProtectedRoute allowedRoles={ROLE_GROUPS.DASHBOARD_ACCESS}>
                  <ApplicantDetail />
                </ProtectedRoute>
              } 
            />
            
            {/* Administrator only */}
            <Route 
              path="/dashboard/organization" 
              element={
                <ProtectedRoute allowedRoles={ROLE_GROUPS.ADMIN_ONLY}>
                  <Organization />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/dashboard/settings" 
              element={
                <ProtectedRoute allowedRoles={ROLE_GROUPS.ADMIN_ONLY}>
                  <Settings />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/dashboard/settings/stage" 
              element={
                <ProtectedRoute allowedRoles={ROLE_GROUPS.ADMIN_ONLY}>
                  <StageConfig />
                </ProtectedRoute>
              } 
            />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
      <Toaster />
    </>
  )
}

export default App
