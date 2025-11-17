import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { JobForm } from "@/components/recruiter/JobForm";
import { mockJobData } from "@/data/MockData";

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
