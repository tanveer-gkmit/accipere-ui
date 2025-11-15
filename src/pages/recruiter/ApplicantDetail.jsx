import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Mail, Phone, MapPin, Calendar, FileText, ArrowLeft, Download } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import StagePipeline from "@/components/recruiter/StagePipeline";
import ResumeViewerModal from "@/components/jobs/ResumeViewerModal";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";
import { mockApplicant, mockTimeline, stages } from "@/data/MockData";

export default function ApplicantDetail() {
  const { applicantId } = useParams();
  const [currentStage, setCurrentStage] = useState(mockApplicant.stage);
  const [note, setNote] = useState("");
  const [pendingStage, setPendingStage] = useState(null);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [isResumeViewerOpen, setIsResumeViewerOpen] = useState(false);
  const { toast } = useToast();

  const handleStageChangeRequest = (newStage) => {
    if (newStage !== currentStage) {
      setPendingStage(newStage);
      setShowConfirmDialog(true);
    }
  };

  const handleConfirmStageChange = () => {
    if (pendingStage) {
      setCurrentStage(pendingStage);
      const stageName = stages.find((s) => s.value === pendingStage)?.label;
      toast({
        title: "Stage Updated",
        description: `${mockApplicant.first_name} ${mockApplicant.last_name} moved to ${stageName}${note ? ' with notes' : ''}`,
      });
      // Here you would save the note along with the stage change to the backend
      // The note will be stored in APPLICATION_ASSIGNED_USER_STATUSES.notes
      setNote(""); // Clear the note after saving
      setPendingStage(null);
    }
    setShowConfirmDialog(false);
  };

  const handleCancelStageChange = () => {
    setPendingStage(null);
    setShowConfirmDialog(false);
  };



  return (
    <DashboardLayout userRole="recruiter">
      <div className="space-y-6 max-w-6xl">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link to="/recruiter/jobs/1/applicants">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-foreground">Applicant Details</h1>
            <p className="text-muted-foreground mt-1">{mockApplicant.jobTitle}</p>
          </div>
        </div>

        <Card className="p-6">
          <div className="flex items-start gap-6">
            <Avatar className="h-24 w-24">
              <AvatarFallback className="text-2xl">
                {mockApplicant.first_name[0]}{mockApplicant.last_name[0]}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1 space-y-4">
              <div>
                <h2 className="text-2xl font-bold text-foreground">
                  {mockApplicant.first_name} {mockApplicant.last_name}
                </h2>
                <p className="text-muted-foreground">{mockApplicant.current_job_title}</p>
              </div>

              <div className="grid md:grid-cols-2 gap-3 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Mail className="h-4 w-4" />
                  <span>{mockApplicant.email}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Phone className="h-4 w-4" />
                  <span>{mockApplicant.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>{mockApplicant.city}, {mockApplicant.state} {mockApplicant.zip_code}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>Applied {new Date(mockApplicant.applied_date).toLocaleDateString()}</span>
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <Button variant="outline" onClick={() => setIsResumeViewerOpen(true)}>
                  <FileText className="h-4 w-4 mr-2" />
                  View Resume
                </Button>
                <Button variant="outline" asChild>
                  <a href="/resume.pdf" download={`${mockApplicant.first_name}_${mockApplicant.last_name}_Resume.pdf`}>
                    <Download className="h-4 w-4 mr-2" />
                    Download Resume
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold text-foreground mb-6">Hiring Stage Progress</h3>
          <StagePipeline currentStage={currentStage} orientation="horizontal" size="md" />
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Stage</h3>
          <div className="space-y-4">
            <div>
              <Label htmlFor="stage-select">Current Stage</Label>
              <Select value={currentStage} onValueChange={handleStageChangeRequest}>
                <SelectTrigger className="w-full mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {stages.map((stage) => (
                    <SelectItem key={stage.value} value={stage.value}>
                      {stage.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="stage-note">Add Note</Label>
              <Textarea
                id="stage-note"
                placeholder="Add feedback or notes for the current stage..."
                className="min-h-[100px]"
                value={note}
                onChange={(e) => setNote(e.target.value)}
              />
              <Button 
                onClick={() => {
                  if (note.trim()) {
                    toast({
                      title: "Note Saved",
                      description: "Your feedback has been saved successfully.",
                    });
                    setNote("");
                  }
                }}
                disabled={!note.trim()}
              >
                Save Note
              </Button>
            </div>
          </div>
        </Card>

        <AlertDialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Confirm Stage Change</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to move {mockApplicant.name} from{" "}
                <span className="font-semibold">
                  {stages.find((s) => s.value === currentStage)?.label}
                </span>{" "}
                to{" "}
                <span className="font-semibold">
                  {stages.find((s) => s.value === pendingStage)?.label}
                </span>
                ? This action will update the candidate's status in the hiring pipeline.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={handleCancelStageChange}>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleConfirmStageChange}>Confirm</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        <div className="grid lg:grid-cols-2 gap-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Professional Information</h3>
            
            <div className="space-y-3">
              <div>
                <p className="text-sm text-muted-foreground">Total Experience</p>
                <p className="text-foreground font-medium">{mockApplicant.total_experience || "N/A"}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Relevant Experience</p>
                <p className="text-foreground font-medium">{mockApplicant.relevant_experience || "N/A"}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Current CTC</p>
                <p className="text-foreground font-medium">{mockApplicant.current_ctc || "N/A"}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Expected CTC</p>
                <p className="text-foreground font-medium">{mockApplicant.expected_ctc || "N/A"}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Notice Period</p>
                <p className="text-foreground font-medium">{mockApplicant.notice_period || "N/A"}</p>
              </div>
            </div>

            <h3 className="text-lg font-semibold text-foreground mt-6 mb-3">Skills</h3>
            <div className="flex flex-wrap gap-2">
              {mockApplicant.skill_set ? mockApplicant.skill_set.split(",").map((skill) => (
                <Badge key={skill.trim()} variant="secondary">
                  {skill.trim()}
                </Badge>
              )) : <p className="text-sm text-muted-foreground">No skills listed</p>}
            </div>

            {(mockApplicant.linkedin || mockApplicant.github) && (
              <>
                <h3 className="text-lg font-semibold text-foreground mt-6 mb-3">Links</h3>
                <div className="space-y-2">
                  {mockApplicant.linkedin && (
                    <a href={mockApplicant.linkedin} target="_blank" rel="noopener noreferrer" 
                       className="text-sm text-primary hover:underline block">
                      LinkedIn Profile →
                    </a>
                  )}
                  {mockApplicant.github && (
                    <a href={mockApplicant.github} target="_blank" rel="noopener noreferrer"
                       className="text-sm text-primary hover:underline block">
                      GitHub Profile →
                    </a>
                  )}
                </div>
              </>
            )}
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Activity Timeline</h3>
            <div className="space-y-4">
              {mockTimeline.map((event, index) => (
                <div key={event.id} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="h-3 w-3 rounded-full bg-primary" />
                    {index < mockTimeline.length - 1 && (
                      <div className="w-0.5 h-full min-h-[40px] bg-border mt-2" />
                    )}
                  </div>
                  <div className="flex-1 pb-4">
                    <p className="font-medium text-foreground">{event.status_name}</p>
                    {event.notes && (
                      <p className="text-sm text-muted-foreground mt-1">{event.notes}</p>
                    )}
                    {event.assigned_user_name && (
                      <p className="text-xs text-muted-foreground mt-1">
                        Assigned to: {event.assigned_user_name}
                      </p>
                    )}
                    <p className="text-xs text-muted-foreground mt-1">
                      {new Date(event.status_date).toLocaleDateString()} at {new Date(event.status_date).toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <Card className="p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Address</h3>
          <div className="space-y-2">
            {mockApplicant.street && <p className="text-foreground">{mockApplicant.street}</p>}
            <p className="text-foreground">
              {mockApplicant.city}, {mockApplicant.state} {mockApplicant.zip_code}
            </p>
          </div>
        </Card>

        <ResumeViewerModal
          isOpen={isResumeViewerOpen}
          onClose={() => setIsResumeViewerOpen(false)}
          resumeUrl="/resume.pdf"
          candidateName={`${mockApplicant.first_name} ${mockApplicant.last_name}`}
        />
      </div>
    </DashboardLayout>
  );
}
