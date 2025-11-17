import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Eye, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { axiosInstance } from "@/api";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { RoleGuard } from "@/middleware/role-guard";
import { ROLE_GROUPS } from "@/constants/roles";

export default function JobOpeningList() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deletingJobId, setDeletingJobId] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get("/api/jobs/");
        setJobs(response.data.results);
        setError(null);
      } catch (err) {
        setError(err.message || "Failed to fetch jobs");
        console.error("Error fetching jobs:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const handleDelete = async (jobId) => {
    try {
      setDeletingJobId(jobId);
      await axiosInstance.delete(`/api/jobs/${jobId}/`);
      
      // Remove the deleted job from the list
      setJobs(jobs.filter(job => job.id !== jobId));
    } catch (err) {
      console.error("Error deleting job:", err);
      setError(err.response?.data?.detail || err.message || "Failed to delete job");
    } finally {
      setDeletingJobId(null);
    }
  };
  return (
    <DashboardLayout userRole="recruiter">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Job Openings</h1>
            <p className="text-muted-foreground mt-1">Manage all your job postings</p>
          </div>
          <Button asChild>
            <Link to="/dashboard/jobs/new">
              <Plus className="h-4 w-4 mr-2" />
              Post New Job
            </Link>
          </Button>
        </div>

        {/* Job List */}
        <div className="space-y-4">
          {loading && <p className="text-center text-muted-foreground">Loading jobs...</p>}
          {error && <p className="text-center text-red-500">Error: {error}</p>}
          {!loading && !error && jobs.length === 0 && (
            <p className="text-center text-muted-foreground">No jobs found</p>
          )}
          {!loading && !error && jobs.map((job) => (
            <Card key={job.id} className="p-6 hover:shadow-lg transition-all duration-200">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-xl font-semibold text-foreground">{job.title}</h3>
                      <div className="flex flex-wrap gap-2 mt-2">
                        <Badge variant="outline">{job.department}</Badge>
                        <Badge variant="outline">{job.location}</Badge>
                        <Badge variant="outline">{job.employment_type}</Badge>
                        <Badge variant="outline">{job.experience_level}</Badge>
                        <Badge className={job.status === "Open" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}>
                          {job.status}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-6 text-sm text-muted-foreground">
                    <span>Posted {new Date(job.created_at).toLocaleDateString()}</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button variant="default" asChild>
                    <Link to={`/dashboard/jobs/${job.id}/applicants`}>
                      <Eye className="h-4 w-4 mr-2" />
                      View Applicants
                    </Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link to={`/dashboard/jobs/${job.id}/edit`}>
                      Edit
                    </Link>
                  </Button>
                  <RoleGuard allowedRoles={ROLE_GROUPS.ADMIN_ONLY}>
                    <ConfirmDialog
                      trigger={
                        <Button 
                          variant="destructive" 
                          disabled={deletingJobId === job.id}
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          {deletingJobId === job.id ? "Deleting..." : "Delete"}
                        </Button>
                      }
                      title="Are you sure?"
                      description={`This will delete the job "${job.title}". This action cannot be undone.`}
                      onConfirm={() => handleDelete(job.id)}
                      confirmText="Delete"
                      variant="destructive"
                    />
                  </RoleGuard>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
