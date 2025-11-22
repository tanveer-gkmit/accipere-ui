import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { JobForm } from "@/components/dashboard/job-form";
import { axiosInstance } from "@/api";
import { useEffect, useState } from "react";
import { ROUTES } from "@/constants/routes";

export default function JobEdit() {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const [jobData, setJobData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});

  useEffect(() => {
    const fetchJob = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get(`/api/jobs/${jobId}/`);
        setJobData(response.data);
        setError(null);
      } catch (err) {
        setError(err.message || "Failed to fetch job details");
        console.error("Error fetching job:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [jobId]);

  const handleSubmit = async (formData) => {
    try {
      setSubmitting(true);
      setError(null);
      setFieldErrors({});

      // Prepare job data with required fields
      const jobUpdateData = {
        title: formData.title,
        description: formData.description,
        employment_type: formData.employment_type,
        location: formData.location,
        department: formData.department,
        experience_level: formData.experience_level,
        requirements: formData.requirements,
        status: formData.status,
        ...(formData.salary_min && { salary_min: parseInt(formData.salary_min) }),
        ...(formData.salary_max && { salary_max: parseInt(formData.salary_max) }),
        ...(formData.benefits && { benefits: formData.benefits }),
      };

      // Update the job
      await axiosInstance.patch(`/api/jobs/${jobId}/`, jobUpdateData);
      
      // Navigate to jobs list on success
      navigate(ROUTES.DASHBOARD_JOBS);
    } catch (err) {
      console.error("Error updating job:", err);
      
      // Check if error response has field-specific errors
      if (err.response?.data && typeof err.response.data === 'object') {
        const errorData = err.response.data;
        
        // If there are field-specific errors, set them
        if (!errorData.detail && Object.keys(errorData).length > 0) {
          setFieldErrors(errorData);
        } else {
          // Otherwise show general error
          setError(errorData.detail || err.message || "Failed to update job");
        }
      } else {
        setError(err.message || "Failed to update job");
      }
    } finally {
      setSubmitting(false);
    }
  };

  const handleCancel = () => {
    navigate(ROUTES.DASHBOARD_JOBS);
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="max-w-4xl space-y-6">
          <p className="text-center text-muted-foreground">Loading job details...</p>
        </div>
      </DashboardLayout>
    );
  }

  if (error && !jobData) {
    return (
      <DashboardLayout>
        <div className="max-w-4xl space-y-6">
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
          <Button onClick={() => navigate(ROUTES.DASHBOARD_JOBS)}>Back to Jobs</Button>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="max-w-4xl space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link to={ROUTES.DASHBOARD_JOBS}>
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Edit Job</h1>
            <p className="text-muted-foreground mt-1">Update job posting details</p>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}

        {jobData && (
          <JobForm 
            initialData={jobData}
            isEditMode={true}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            loading={submitting}
            serverErrors={fieldErrors}
          />
        )}
      </div>
    </DashboardLayout>
  );
}
