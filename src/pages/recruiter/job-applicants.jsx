import { useState } from "react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Mail, FileText } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import ResumeViewerModal from "@/components/jobs/resume-viewer-modal";
import { mockCandidates, stageColors } from "@/data/mock-data";

export default function JobApplicants() {
  const { jobId } = useParams();
  const [isResumeViewerOpen, setIsResumeViewerOpen] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState(null);

  const handleViewResume = (candidate) => {
    setSelectedCandidate(candidate);
    setIsResumeViewerOpen(true);
  };

  const getStageColor = (stage) => {
    return stageColors[stage] || "bg-gray-100 text-gray-700";
  };

  return (
    <DashboardLayout userRole="recruiter">
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link to="/recruiter/jobs">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-foreground">Senior Frontend Developer</h1>
            <p className="text-muted-foreground mt-1">{mockCandidates.length} applicants in pipeline</p>
          </div>
        </div>

        {/* Candidates List */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-foreground">Applicants</h2>
          {mockCandidates.map((candidate) => (
            <Card key={candidate.id} className="p-6 hover:shadow-lg transition-all duration-200">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-lg font-semibold text-foreground">{candidate.name}</h3>
                      <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                        <Mail className="h-4 w-4" />
                        <span>{candidate.email}</span>
                      </div>
                    </div>
                    <Badge className={getStageColor(candidate.stage)}>
                      {candidate.stage}
                    </Badge>
                  </div>

                  <div className="flex items-center gap-6 text-sm text-muted-foreground">
                    <span>Applied: {new Date(candidate.appliedDate).toLocaleDateString()}</span>
                    <span>•</span>
                    <span>Updated: {new Date(candidate.lastUpdated).toLocaleDateString()}</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => handleViewResume(candidate)}>
                    <FileText className="h-4 w-4 mr-2" />
                    Resume
                  </Button>
                  <Button variant="default" size="sm" asChild>
                    <Link to={`/recruiter/applicants/${candidate.id}`}>
                      View Profile
                    </Link>
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <ResumeViewerModal
          isOpen={isResumeViewerOpen}
          onClose={() => setIsResumeViewerOpen(false)}
          resumeUrl="/resume.pdf"
          candidateName={selectedCandidate?.name || ""}
        />
      </div>
    </DashboardLayout>
  );
}
