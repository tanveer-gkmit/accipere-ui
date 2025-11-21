import { useState, useEffect, useCallback } from "react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Mail, FileText, Phone } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { formatDate } from "@/utility/date-utils";
import ResumeViewerModal from "@/components/jobs/resume-viewer-modal";
import { stageColors } from "@/data/mock-data";
import axiosInstance from "@/api/axios";
import { useResume } from "@/hooks/use-resume";
import { useToast } from "@/hooks/use-toast";
import { ROUTES, getApplicantDetailRoute } from "@/constants/routes";

export default function JobApplicants() {
  const { jobId } = useParams();
  const { toast } = useToast();
  const [isResumeViewerOpen, setIsResumeViewerOpen] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [jobTitle, setJobTitle] = useState("");
  const { resumeUrl, loading: resumeLoading, fetchResume, cleanup } = useResume();

  useEffect(() => {
    const fetchApplicants = async () => {
      if (!jobId) {
        setError("Job ID is missing");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        
        const response = await axiosInstance.get(`/api/jobs/${jobId}/applicants/`);
        const applicantsData = response.data;
        
        setApplicants(applicantsData);
        
        if (applicantsData.length > 0) {
          setJobTitle(applicantsData[0].job_title);
        }
      } catch (err) {
        console.error("Error fetching applicants:", err);
        const errorMessage = 
          err.response?.data?.detail || 
          err.message || 
          "Failed to fetch applicants";
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchApplicants();
  }, [jobId]);

  const handleViewResume = useCallback(async (candidate) => {
    setSelectedCandidate(candidate);
    
    try {
      await fetchResume(candidate.id);
      setIsResumeViewerOpen(true);
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to load resume. Please try again.",
        variant: "destructive",
      });
    }
  }, [fetchResume, toast]);

  const handleCloseResume = useCallback(() => {
    setIsResumeViewerOpen(false);
    cleanup();
  }, [cleanup]);

  const getStageColor = useCallback((stage) => {
    return stageColors[stage] || "bg-gray-100 text-gray-700";
  }, []);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link to={ROUTES.DASHBOARD_JOBS}>
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-foreground">
              {loading ? "Loading..." : jobTitle || "Job Applicants"}
            </h1>
            <p className="text-muted-foreground mt-1">
              {loading ? "Loading applicants..." : `${applicants.length} applicants in pipeline`}
            </p>
          </div>
        </div>

        {/* Error State */}
        {error && (
          <Card className="p-6 border-destructive">
            <p className="text-destructive text-center">{error}</p>
          </Card>
        )}

        {/* Loading State */}
        {loading && !error && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Loading applicants...</p>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && applicants.length === 0 && (
          <Card className="p-12">
            <div className="text-center">
              <p className="text-muted-foreground text-lg">No applicants yet</p>
              <p className="text-muted-foreground text-sm mt-2">
                Applications will appear here once candidates apply for this position.
              </p>
            </div>
          </Card>
        )}

        {/* Candidates List */}
        {!loading && !error && applicants.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground">Applicants</h2>
            {applicants.map((applicant) => {
              const { id, full_name, email, phone_no, current_status_name, created_at } = applicant;
              return (
                <Card key={id} className="p-6 hover:shadow-lg transition-all duration-200">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <div className="space-y-1">
                          <h3 className="text-lg font-semibold text-foreground">{full_name}</h3>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Mail className="h-4 w-4 shrink-0" />
                            <span>{email}</span>
                          </div>
                          {phone_no && (
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Phone className="h-4 w-4 shrink-0" />
                              <span>{phone_no}</span>
                            </div>
                          )}
                        </div>
                        <Badge className={getStageColor(current_status_name)}>
                          {current_status_name}
                        </Badge>
                      </div>

                      <div className="flex items-center gap-6 text-sm text-muted-foreground">
                        <span>Applied: {formatDate(created_at)}</span>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => handleViewResume(applicant)}
                        disabled={resumeLoading}
                      >
                        <FileText className="h-4 w-4 mr-2" />
                        {resumeLoading ? "Loading..." : "Resume"}
                      </Button>
                      <Button variant="default" size="sm" asChild>
                        <Link to={getApplicantDetailRoute(id)}>
                          View Profile
                        </Link>
                      </Button>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        )}

        <ResumeViewerModal
          isOpen={isResumeViewerOpen}
          onClose={handleCloseResume}
          resumeUrl={resumeUrl || ""}
          candidateName={selectedCandidate?.full_name || ""}
        />
      </div>
    </DashboardLayout>
  );
}
