import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Briefcase } from "lucide-react";
import { formatSalaryRange } from "@/utility/salary-utils";

export default function JobCard({ job, onViewDetails }) {
  return (
    <Card className="p-6 hover:shadow-lg transition-all duration-200">
      <div className="space-y-4">
        <div>
          <h3
            className="text-xl font-semibold text-foreground hover:text-primary transition-colors cursor-pointer"
            onClick={() => onViewDetails(job.id)}
          >
            {job.title}
          </h3>
          <p className="text-muted-foreground mt-1">{job.department}</p>
        </div>

        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <MapPin className="h-4 w-4" />
            <span>{job.location}</span>
          </div>
          <div className="flex items-center gap-1">
            <Briefcase className="h-4 w-4" />
            <span>{job.employment_type}</span>
          </div>
          {(job.salary_min || job.salary_max) && (
            <div className="flex items-center gap-1">
              <span>{formatSalaryRange(job.salary_min, job.salary_max)}</span>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between pt-2">
          <span className="text-sm text-muted-foreground">
            Posted {job.posted_date}
          </span>
          <Button onClick={() => onViewDetails(job.id)}>View Details</Button>
        </div>
      </div>
    </Card>
  );
}