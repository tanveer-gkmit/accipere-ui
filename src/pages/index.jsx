import { useState, useEffect } from "react";
import JobCard from "@/components/jobs/job-card";
import JobDetailModal from "@/components/jobs/job-detail-modal";
import ApplyFormModal from "@/components/jobs/apply-form-modal";
import { axiosInstance } from "@/api";

export default function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedJob, setSelectedJob] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);

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

  const handleViewDetails = (jobId) => {
    const job = jobs.find((j) => j.id === jobId);
    if (job) {
      setSelectedJob(job);
      setIsDetailModalOpen(true);
    }
  };

  const handleApply = () => {
    setIsDetailModalOpen(false);
    setIsApplyModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/5 via-background to-accent/5 py-16 px-4">
        <div className="container mx-auto text-center space-y-6">
          <img 
            src="/accipere-primary-black.png" 
            alt="Accipere" 
            className="h-24 mx-auto"
          />
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mt-6">
            Open Positions
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore current opportunities and join our team
          </p>
        </div>
      </section>

      {/* Job Listings Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-foreground">
                Open Positions
              </h2>
              <p className="text-muted-foreground mt-2">
                {loading ? "Loading..." : `${jobs.length} jobs available`}
              </p>
            </div>
          </div>

          {loading && (
            <p className="text-center text-muted-foreground py-8">Loading jobs...</p>
          )}

          {error && (
            <p className="text-center text-red-500 py-8">Error: {error}</p>
          )}

          {!loading && !error && jobs.length === 0 && (
            <p className="text-center text-muted-foreground py-8">No jobs available at the moment</p>
          )}

          {!loading && !error && jobs.length > 0 && (
            <div className="grid md:grid-cols-2 gap-6">
              {jobs.map((job) => (
                <JobCard
                  key={job.id}
                  job={job}
                  onViewDetails={handleViewDetails}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Modals */}
      <JobDetailModal
        job={selectedJob}
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        onApply={handleApply}
      />
      <ApplyFormModal
        jobId={selectedJob?.id || ""}
        jobTitle={selectedJob?.title || ""}
        isOpen={isApplyModalOpen}
        onClose={() => setIsApplyModalOpen(false)}
      />
    </div>
  );
}
