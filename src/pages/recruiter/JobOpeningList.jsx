import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Users, Eye } from "lucide-react";
import { Link } from "react-router-dom";

const jobOpenings = [
  {
    id: "1",
    title: "Senior Frontend Developer",
    department: "Engineering",
    location: "Remote",
    type: "Full-time",
    posted: "2024-01-15",
    status: "active",
    applicants: 24,
    inPipeline: 18,
  },
  {
    id: "2",
    title: "Product Manager",
    department: "Product",
    location: "New York, NY",
    type: "Full-time",
    posted: "2024-01-20",
    status: "active",
    applicants: 32,
    inPipeline: 15,
  },
  {
    id: "3",
    title: "UX Designer",
    department: "Design",
    location: "San Francisco, CA",
    type: "Full-time",
    posted: "2024-01-18",
    status: "active",
    applicants: 28,
    inPipeline: 12,
  },
  {
    id: "4",
    title: "Full Stack Developer",
    department: "Engineering",
    location: "Remote",
    type: "Contract",
    posted: "2024-01-10",
    status: "active",
    applicants: 45,
    inPipeline: 22,
  },
  {
    id: "5",
    title: "DevOps Engineer",
    department: "Engineering",
    location: "Austin, TX",
    type: "Full-time",
    posted: "2024-01-08",
    status: "paused",
    applicants: 19,
    inPipeline: 8,
  },
];

export default function JobOpeningList() {
  return (
    <DashboardLayout userRole="recruiter">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Job Openings</h1>
            <p className="text-muted-foreground mt-1">Manage all your job postings</p>
          </div>
          <Button asChild>
            <Link to="/recruiter/jobs/new">
              <Plus className="h-4 w-4 mr-2" />
              Post New Job
            </Link>
          </Button>
        </div>

        {/* Job List */}
        <div className="space-y-4">
          {jobOpenings.map((job) => (
            <Card key={job.id} className="p-6 hover:shadow-lg transition-all duration-200">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-xl font-semibold text-foreground">{job.title}</h3>
                      <div className="flex flex-wrap gap-2 mt-2">
                        <Badge variant="outline">{job.department}</Badge>
                        <Badge variant="outline">{job.location}</Badge>
                        <Badge variant="outline">{job.type}</Badge>
                        <Badge className={job.status === "active" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}>
                          {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-6 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      <span>{job.applicants} applicants</span>
                    </div>
                    <span>•</span>
                    <span>{job.inPipeline} in pipeline</span>
                    <span>•</span>
                    <span>Posted {new Date(job.posted).toLocaleDateString()}</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button variant="default" asChild>
                    <Link to={`/recruiter/jobs/${job.id}/applicants`}>
                      <Eye className="h-4 w-4 mr-2" />
                      View Applicants
                    </Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link to={`/recruiter/jobs/${job.id}/edit`}>
                      Edit
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
