import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { MapPin, Briefcase, IndianRupee, Users, Building } from "lucide-react";

export default function JobDetailModal({ job, isOpen, onClose, onApply }) {
  if (!job) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="space-y-3 pb-4">
          <DialogTitle className="text-3xl">{job.title}</DialogTitle>
          <p className="text-muted-foreground text-base mt-2">
            Posted {job.posted_date}
            {job.closing_date && ` • Closes ${job.closing_date}`}
          </p>
        </DialogHeader>

        <div className="space-y-8">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex items-start gap-4 p-4 rounded-lg bg-muted/30">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <MapPin className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Location</p>
                <p className="font-semibold text-foreground text-base">{job.location}</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-lg bg-muted/30">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <Briefcase className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Employment Type</p>
                <p className="font-semibold text-foreground text-base">{job.employment_type}</p>
              </div>
            </div>

            {(job.salary_min || job.salary_max) && (
              <div className="flex items-start gap-4 p-4 rounded-lg bg-muted/30">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <IndianRupee className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Salary Range</p>
                  <p className="font-semibold text-foreground text-base">
                    {job.salary_min && job.salary_max 
                      ? `₹${job.salary_min} - ₹${job.salary_max}`
                      : job.salary_min 
                        ? `₹${job.salary_min}+`
                        : `Up to ₹${job.salary_max}`
                    }
                  </p>
                </div>
              </div>
            )}

            <div className="flex items-start gap-4 p-4 rounded-lg bg-muted/30">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Experience Level</p>
                <p className="font-semibold text-foreground text-base">{job.experience_level}</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-lg bg-muted/30">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <Building className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Department</p>
                <p className="font-semibold text-foreground text-base">{job.department}</p>
              </div>
            </div>
          </div>

          <div className="border-t pt-6">
            <h3 className="text-xl font-semibold text-foreground mb-4">
              Job Description
            </h3>
            <p className="text-foreground leading-relaxed whitespace-pre-line">{job.description}</p>
          </div>

          <div className="border-t pt-6">
            <h3 className="text-xl font-semibold text-foreground mb-4">
              Requirements
            </h3>
            <div className="text-foreground leading-relaxed whitespace-pre-line">{job.requirements}</div>
          </div>

          {job.benefits && (
            <div className="border-t pt-6">
              <h3 className="text-xl font-semibold text-foreground mb-4">
                Benefits & Perks
              </h3>
              <div className="text-foreground leading-relaxed whitespace-pre-line">{job.benefits}</div>
            </div>
          )}

          <div className="flex gap-3 pt-6 border-t">
            <Button className="flex-1" onClick={onApply}>
              Apply Now
            </Button>
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
