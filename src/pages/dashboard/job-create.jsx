import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { JobForm } from "@/components/dashboard/job-form";

export default function JobCreate() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle job creation
    console.log("Creating new job...");
    navigate("/dashboard/jobs");
  };

  const handleCancel = () => {
    navigate("/dashboard/jobs");
  };

  return (
    <DashboardLayout userRole="recruiter">
      <div className="max-w-4xl space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link to="/dashboard/jobs">
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
