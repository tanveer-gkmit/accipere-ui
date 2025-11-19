import { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Loader2 } from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";
import ResumeViewerModal from "@/components/jobs/resume-viewer-modal";
import { useToast } from "@/hooks/use-toast";
import { useResume } from "@/hooks/use-resume";
import { useApplicantData } from "@/hooks/use-applicant-data";
import { useApplicantStatus } from "@/hooks/use-applicant-status";
import { ApplicantHeader } from "@/components/applicant/applicant-header";
import { StatusUpdateForm } from "@/components/applicant/status-update-form";
import { ProfessionalInfoCard } from "@/components/applicant/professional-info-card";
import { ActivityTimeline } from "@/components/applicant/activity-timeline";
import { AddressCard } from "@/components/applicant/address-card";

export default function ApplicantDetail() {
  const { applicantId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { resumeUrl, fetchResume, downloadResume, cleanup } = useResume();
  const { applicantData, loading, error, stages, allUsers, setApplicantData } = useApplicantData(applicantId);
  const { updateStatus, isUpdating } = useApplicantStatus(applicantId);
  
  const [isResumeViewerOpen, setIsResumeViewerOpen] = useState(false);

  useEffect(() => {
    if (isResumeViewerOpen && applicantId && !resumeUrl) {
      fetchResume(applicantId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isResumeViewerOpen, applicantId, resumeUrl]);

  useEffect(() => cleanup, [cleanup]);

  const handleStatusUpdate = async (statusId, userId, notes) => {
    try {
      const updated = await updateStatus(statusId, userId, notes);
      setApplicantData(updated);
    } catch (err) {
      // Error handled in hook
    }
  };

  const handleDownloadResume = async () => {
    if (!applicantId || !applicantData) return;
    
    try {
      const filename = applicantData.resume_filename || 
        `${applicantData.first_name}_${applicantData.last_name}_Resume.pdf`;
      await downloadResume(applicantId, filename);
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to download resume",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[400px]">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </DashboardLayout>
    );
  }

  if (error || !applicantData) {
    return (
      <DashboardLayout>
        <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
          <p className="text-lg text-muted-foreground">
            {error || "Applicant not found"}
          </p>
          <Button asChild>
            <Link to="/dashboard">Back to Dashboard</Link>
          </Button>
        </div>
      </DashboardLayout>
    );
  }

  const { first_name, last_name, job_details, street, city, zip_code, status_history } = applicantData;

  return (
    <DashboardLayout>
      <div className="space-y-6 max-w-6xl">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-foreground">Applicant Details</h1>
            <p className="text-muted-foreground mt-1">{job_details?.title || "Job Position"}</p>
          </div>
        </div>

        <ApplicantHeader
          applicant={applicantData}
          onViewResume={() => setIsResumeViewerOpen(true)}
          onDownloadResume={handleDownloadResume}
        />

        <StatusUpdateForm
          applicant={applicantData}
          stages={stages}
          users={allUsers}
          isUpdating={isUpdating}
          onUpdate={handleStatusUpdate}
        />

        <div className="grid lg:grid-cols-2 gap-6">
          <ProfessionalInfoCard applicant={applicantData} />
          <ActivityTimeline statusHistory={status_history} />
        </div>

        <AddressCard street={street} city={city} zipCode={zip_code} />

        <ResumeViewerModal
          isOpen={isResumeViewerOpen}
          onClose={() => setIsResumeViewerOpen(false)}
          resumeUrl={resumeUrl}
          candidateName={`${first_name} ${last_name}`}
        />
      </div>
    </DashboardLayout>
  );
}
