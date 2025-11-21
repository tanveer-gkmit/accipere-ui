import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
export function ProfessionalInfoCard({ applicant }) {
  const {
    total_experience,
    relevant_experience,
    current_ctc,
    expected_ctc,
    notice_period,
    linkedin,
    github,
  } = applicant;

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold text-foreground mb-4">
        Professional Information
      </h3>
      
      <div className="space-y-3">
        <div>
          <p className="text-sm text-muted-foreground">Total Experience</p>
          <p className="text-foreground font-medium">
            {total_experience ? `${total_experience} years` : "N/A"}
          </p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Relevant Experience</p>
          <p className="text-foreground font-medium">
            {relevant_experience ? `${relevant_experience} years` : "N/A"}
          </p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Current CTC</p>
          <p className="text-foreground font-medium">
            {current_ctc ? `₹${(current_ctc / 100000).toFixed(2)} LPA` : "N/A"}
          </p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Expected CTC</p>
          <p className="text-foreground font-medium">
            {expected_ctc ? `₹${(expected_ctc / 100000).toFixed(2)} LPA` : "N/A"}
          </p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Notice Period</p>
          <p className="text-foreground font-medium">
            {notice_period ? `${notice_period} days` : "N/A"}
          </p>
        </div>
      </div>

      {(linkedin || github) && (
        <>
          <h3 className="text-lg font-semibold text-foreground mt-6 mb-3">Links</h3>
          <div className="space-y-2">
            {linkedin && (
              <Link
                to={{ pathname: linkedin }} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-sm text-primary hover:underline block"
              >
                LinkedIn Profile →
              </Link>
            )}
            {github && (
              <Link
                to={{ pathname: github }} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-sm text-primary hover:underline block"
              >
                GitHub Profile →
              </Link>
            )}
          </div>
        </>
      )}
    </Card>
  );
}
