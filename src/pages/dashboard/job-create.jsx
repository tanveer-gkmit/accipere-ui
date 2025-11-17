import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { JobForm } from "@/components/dashboard/job-form";
import { axiosInstance } from "@/api";
import { useState } from "react";

export default function JobCreate() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (formData) => {
    try {
      setLoading(true);
      setError(null);

      // Prepare job data according to API requirements
      const jobData = {
        title: formData.title,
        description: formData.description,
        employment_type: formData.employment_type,
        location: formData.location,
        department: formData.department,
        experience_level: formData.experience_level,
        requirements: formData.requirements,
        status: formData.status,
      };

      // Add optional fields only if they have values
      if (formData.salary_min) {
        jobData.salary_min = parseInt(formData.salary_min);
      }
      if (formData.salary_max) {
        jobData.salary_max = parseInt(formData.salary_max);
      }
      if (formData.benefits) {
        jobData.benefits = formData.benefits;
      }

      // Create the job
      await axiosInstance.post("/api/jobs/", jobData);
      
      // Navigate to jobs list on success
      navigate("/dashboard/jobs");
    } catch (err) {
      console.error("Error creating job:", err);
      setError(err.response?.data?.detail || err.message || "Failed to create job");
    } finally {
      setLoading(false);
    }
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

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}

        <JobForm onSubmit={handleSubmit} onCancel={handleCancel} loading={loading} />
      </div>
    </DashboardLayout>
  );
}
