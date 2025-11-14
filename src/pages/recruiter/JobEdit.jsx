import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { JobForm } from "@/components/recruiter/JobForm";

// Mock data - in real app, this would come from API
const mockJobData = {
  "1": {
    title: "Senior Frontend Developer",
    department: "engineering",
    location: "Remote",
    type: "full-time",
    experience: "senior",
    salaryMin: "80000",
    salaryMax: "120000",
    description: "We are looking for an experienced Frontend Developer to join our team...",
    requirements: "5+ years of experience with React, TypeScript, and modern web technologies...",
    benefits: "Competitive salary, health insurance, remote work, flexible hours..."
  },
  "2": {
    title: "Product Manager",
    department: "product",
    location: "New York, NY",
    type: "full-time",
    experience: "mid",
    salaryMin: "90000",
    salaryMax: "130000",
    description: "Join our product team to drive innovation and deliver exceptional user experiences...",
    requirements: "3+ years of product management experience, strong analytical skills...",
    benefits: "Health insurance, 401k matching, professional development budget..."
  }
};

export default function JobEdit() {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const jobData = mockJobData[jobId] || {};

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle job update
    console.log("Updating job...");
    navigate("/recruiter/jobs");
  };

  const handleCancel = () => {
    navigate("/recruiter/jobs");
  };

  return (
    <DashboardLayout userRole="recruiter">
      <div className="max-w-4xl space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link to="/recruiter/jobs">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Edit Job</h1>
            <p className="text-muted-foreground mt-1">Update job posting details</p>
          </div>
        </div>

        <JobForm 
          initialData={jobData}
          isEditMode={true}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />
      </div>
    </DashboardLayout>
  );
}
