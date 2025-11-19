import { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Layers, Settings2, Loader2 } from "lucide-react";
import axiosInstance from "@/api/axios";
import { ROUTES } from "@/constants/routes";

export default function Settings() {
  const [stages, setStages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStages = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axiosInstance.get("/api/application-statuses/");
        // API returns paginated response with results array
        setStages(response.data.results || []);
      } catch (err) {
        console.error("Error fetching stages:", err);
        setError(err.response?.data?.message || "Failed to load stages");
      } finally {
        setLoading(false);
      }
    };

    fetchStages();
  }, []);

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
                  <Link to={ROUTES.DASHBOARD_SETTINGS_STAGE}>
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
                
                {loading ? (
                  <div className="flex items-center justify-center py-8">
                    <Loader2 className="h-6 w-6 animate-spin text-primary" />
                    <span className="ml-2 text-muted-foreground">Loading stages...</span>
                  </div>
                ) : error ? (
                  <div className="p-4 rounded-lg bg-destructive/10 text-destructive">
                    {error}
                  </div>
                ) : stages.length === 0 ? (
                  <div className="p-4 rounded-lg bg-muted/30 text-muted-foreground">
                    No stages configured yet. Click "Configure Stage" to add stages.
                  </div>
                ) : (
                  <div className="space-y-2">
                    {stages.map((stage) => (
                      <div key={stage.id} className="flex items-center gap-3 p-3 rounded-lg bg-muted/30">
                        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                          <span className="text-sm font-semibold text-primary">{stage.order_sequence + 1}</span>
                        </div>
                        <div className="flex-1">
                          <span className="text-foreground font-medium">{stage.name}</span>
                          {stage.description && (
                            <p className="text-sm text-muted-foreground mt-1">{stage.description}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
