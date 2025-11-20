import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Mail, Phone, MapPin, Calendar, FileText, Download } from "lucide-react";
import { formatDate } from "@/utility/date-utils";

export function ApplicantHeader({ 
  applicant, 
  onViewResume, 
  onDownloadResume 
}) {
  const {
    first_name,
    last_name,
    email,
    phone_no,
    city,
    zip_code,
    current_job_title,
    created_at,
  } = applicant;

  return (
    <Card className="p-6">
      <div className="flex items-start gap-6">
        <Avatar className="h-24 w-24">
          <AvatarFallback className="text-2xl">
            {first_name?.[0] || '?'}{last_name?.[0] || '?'}
          </AvatarFallback>
        </Avatar>

        <div className="flex-1 space-y-4">
          <div>
            <h2 className="text-2xl font-bold text-foreground">
              {first_name || ''} {last_name || ''}
            </h2>
            <p className="text-muted-foreground">{current_job_title || 'N/A'}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-3 text-sm">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Mail className="h-4 w-4" />
              <span>{email}</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Phone className="h-4 w-4" />
              <span>{phone_no}</span>
            </div>
            {(city || zip_code) && (
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>{[city, zip_code].filter(Boolean).join(", ")}</span>
              </div>
            )}
            <div className="flex items-center gap-2 text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span>Applied {formatDate(created_at)}</span>
            </div>
          </div>

          <div className="flex gap-2 pt-2">
            <Button variant="outline" onClick={onViewResume}>
              <FileText className="h-4 w-4 mr-2" />
              View Resume
            </Button>
            <Button variant="outline" onClick={onDownloadResume}>
              <Download className="h-4 w-4 mr-2" />
              Download Resume
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}
