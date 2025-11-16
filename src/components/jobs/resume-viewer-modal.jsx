import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function ResumeViewerModal({ isOpen, onClose, resumeUrl, candidateName }) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl h-[95vh] flex flex-col p-0 gap-0">
        <DialogHeader className="px-6 py-4 border-b shrink-0">
          <DialogTitle className="text-xl">
            {candidateName ? `${candidateName}'s Resume` : 'Resume Preview'}
          </DialogTitle>
        </DialogHeader>
        
        <div className="flex-1 min-h-0 bg-gray-100">
          <iframe
            src={`${resumeUrl}#toolbar=0&navpanes=0&scrollbar=1`}
            className="w-full h-full border-0"
            title="Resume Preview"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
