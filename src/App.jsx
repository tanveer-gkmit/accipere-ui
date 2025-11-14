import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import LoginPage from "@/pages/auth/Login"
import Jobs from "@/pages/Index"

import JobOpeningList from "@/pages/recruiter/JobOpeningList"
import JobCreate from "@/pages/recruiter/JobCreate"
import JobEdit from "@/pages/recruiter/JobEdit"
import JobApplicants from "@/pages/recruiter/JobApplicants"
import ApplicantDetail from "@/pages/recruiter/ApplicantDetail"
import Organization from "@/pages/recruiter/Organization"
import Settings from "@/pages/recruiter/Settings"
import StageConfig from "@/pages/recruiter/StageConfig"
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
