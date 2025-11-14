import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { JobForm } from "@/components/recruiter/JobForm";

export default function JobCreate() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle job creation
    console.log("Creating new job...");
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
            <h1 className="text-3xl font-bold text-foreground">Create New Job</h1>
            <p className="text-muted-foreground mt-1">Fill in the details to post a new job opening</p>
          </div>
        </div>

        <JobForm onSubmit={handleSubmit} onCancel={handleCancel} />
      </div>
    </DashboardLayout>
  );
}
