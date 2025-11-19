import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye, Mail, Phone, Briefcase } from "lucide-react";
import { Link } from "react-router-dom";
import { formatDate } from "@/utility/date-utils";
import { useEffect, useState } from "react";
import { axiosInstance } from "@/api";
import { useAuth } from "@/contexts/auth-context";

export default function Dashboard() {
  const { user } = useAuth();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAssignedApplications = async () => {
      if (!user?.id) return;

      try {
        setLoading(true);
        const response = await axiosInstance.get(`/api/users/${user.id}/applications/`);
        setApplications(response.data);
        setError(null);
      } catch (err) {
        setError(err.response?.data?.detail || err.message || "Failed to load assigned applications");
        console.error("Error fetching assigned applications:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAssignedApplications();
  }, [user]);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">My Applications</h1>
            <p className="text-muted-foreground mt-1">Applications currently assigned to you</p>
          </div>
        </div>

        {/* Application List */}
        <div className="space-y-4">
          {loading && <p className="text-center text-muted-foreground">Loading applications...</p>}
          {error && <p className="text-center text-red-500">Error: {error}</p>}
          {!loading && !error && applications.length === 0 && (
            <p className="text-center text-muted-foreground">No applications assigned to you</p>
          )}
          {!loading && !error && applications.map((application) => (
            <Card key={application.id} className="p-6 hover:shadow-lg transition-all duration-200">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-xl font-semibold text-foreground">{application.applicant_name}</h3>
                      <div className="flex flex-wrap gap-2 mt-2">
                        <Badge variant="outline" className="flex items-center gap-1">
                          <Briefcase className="h-3 w-3" />
                          {application.job_title}
                        </Badge>
                        <Badge className="bg-blue-100 text-blue-700">
                          {application.current_status_name}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-6 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Mail className="h-4 w-4" />
                      {application.email}
                    </span>
                    <span className="flex items-center gap-1">
                      <Phone className="h-4 w-4" />
                      {application.phone_no}
                    </span>
                    <span>Applied {formatDate(application.created_at)}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="default" asChild>
                    <Link to={`/dashboard/applicants/${application.id}`}>
                      <Eye className="h-4 w-4 mr-2" />
                      View Details
                    </Link>
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
