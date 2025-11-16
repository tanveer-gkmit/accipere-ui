import { useState } from "react";
import JobCard from "@/components/jobs/job-card";
import JobDetailModal from "@/components/jobs/job-detail-modal";
import ApplyFormModal from "@/components/jobs/apply-form-modal";
import { mockJobs } from "@/data/mock-data";

export default function Jobs() {
  const [selectedJob, setSelectedJob] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);

  const handleViewDetails = (jobId) => {
    const job = mockJobs.find(({ id }) => id === jobId);
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
                {mockJobs.length} jobs available
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {mockJobs.map((job) => {
              const { id } = job;
              return (
                <JobCard
                  key={id}
                  job={job}
                  onViewDetails={handleViewDetails}
                />
              );
            })}
          </div>
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
        jobTitle={selectedJob?.title || ""}
        isOpen={isApplyModalOpen}
        onClose={() => setIsApplyModalOpen(false)}
      />
    </div>
  );
}
