import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Layers, Settings2 } from "lucide-react";

export default function Settings() {
  return (
    <DashboardLayout>
      <div className="max-w-4xl space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Settings</h1>
          <p className="text-muted-foreground mt-1">Manage your account and preferences</p>
        </div>

        <div className="space-y-4">
          <Card className="p-6">
            <div className="flex items-start gap-4">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <Layers className="h-6 w-6 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-foreground mb-2">Hiring Pipeline Configuration</h3>
                <p className="text-muted-foreground mb-4">
                  Customize your recruitment stage configuration, add or remove steps, and configure the hiring pipeline to match your organization's process.
                </p>
                <Button asChild>
                  <Link to="/dashboard/settings/stage">
                    Configure Stage
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Link>
                </Button>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-start gap-4">
              <div className="h-12 w-12 rounded-lg bg-blue-500/10 flex items-center justify-center shrink-0">
                <Settings2 className="h-6 w-6 text-blue-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-foreground mb-2">Current Stage Configuration</h3>
                <p className="text-sm text-muted-foreground mb-4">Your active hiring pipeline stages:</p>
                <div className="space-y-2">
                  {[
                    "HR Screening",
                    "Technical Screening",
                    "Interview 1",
                    "Interview 2",
                    "HR Interview",
                    "Offer Sent",
                    "Joined",
                  ].map((stage, index) => (
                    <div key={stage} className="flex items-center gap-3 p-3 rounded-lg bg-muted/30">
                      <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="text-sm font-semibold text-primary">{index + 1}</span>
                      </div>
                      <span className="text-foreground font-medium">{stage}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
