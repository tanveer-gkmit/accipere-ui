import './app.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import LoginPage from "@/pages/auth/login"
import Jobs from "@/pages/index"
import JobOpeningList from "@/pages/recruiter/job-opening-list"
import JobCreate from "@/pages/recruiter/job-create"
import JobEdit from "@/pages/recruiter/job-edit"
import JobApplicants from "@/pages/recruiter/job-applicants"
import ApplicantDetail from "@/pages/recruiter/applicant-detail"
import Organization from "@/pages/recruiter/organization"
import Settings from "@/pages/recruiter/settings"
import StageConfig from "@/pages/recruiter/stage-config"
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path='/' element={<Jobs/>} />
          {/* Recruiter Routes */}
          <Route path="/recruiter/jobs" element={<JobOpeningList />} />
          <Route path="/recruiter/jobs/new" element={<JobCreate />} />
          <Route path="/recruiter/jobs/:jobId/edit" element={<JobEdit />} />
          <Route path="/recruiter/jobs/:jobId/applicants" element={<JobApplicants />} />
          <Route path="/recruiter/applicants/:applicantId" element={<ApplicantDetail />} />
          <Route path="/recruiter/organization" element={<Organization />} />
          <Route path="/recruiter/settings" element={<Settings />} />
          <Route path="/recruiter/settings/stage" element={<StageConfig />} />
        </Routes>
      </BrowserRouter>
      <Toaster />
    </>
  )
}

export default App
