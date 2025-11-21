import { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Loader2 } from "lucide-react";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { useStages } from "@/hooks/use-stages";
import { StageItem } from "@/components/stages/stage-item";

export default function StageConfig() {
  const [editingId, setEditingId] = useState(null);
  const {
    stages,
    loading,
    saving,
    fetchStages,
    handleAddStage,
    handleDeleteStage,
    handleSaveStage,
    moveStage,
  } = useStages();

  useEffect(() => {
    fetchStages();
  }, []);

  const onAddStage = async () => {
    const newStage = await handleAddStage();
    if (newStage) {
      setEditingId(newStage.id);
    }
  };

  const onSaveStage = async (id, name, description) => {
    const success = await handleSaveStage(id, name, description);
    if (success) {
      setEditingId(null);
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <span className="ml-3 text-muted-foreground">Loading stages...</span>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="max-w-5xl space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Stage Configuration</h1>
            <p className="text-muted-foreground mt-1">Customize your hiring pipeline stages</p>
          </div>
          <ConfirmDialog
            trigger={
              <Button disabled={saving}>
                {saving ? (
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <Plus className="h-4 w-4 mr-2" />
                )}
                Add Stage
              </Button>
            }
            title="Add New Stage"
            description="Are you sure you want to add a new stage? You can edit the stage name and description after creation."
            onConfirm={onAddStage}
            confirmText="Add Stage"
            cancelText="Cancel"
          />
        </div>

        <Card className="p-6 bg-primary/5 border-primary/20">
          <h3 className="font-semibold text-foreground mb-2">About Stage Configuration</h3>
          <p className="text-sm text-muted-foreground">
            Define the stages that candidates go through in your hiring process. You can add, edit, reorder,
            or remove stages to match your organization's recruitment stage configuration.
          </p>
        </Card>

        {stages.length === 0 ? (
          <Card className="p-8 text-center">
            <p className="text-muted-foreground mb-4">No stages configured yet.</p>
            <ConfirmDialog
              trigger={
                <Button disabled={saving}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Your First Stage
                </Button>
              }
              title="Add New Stage"
              description="Are you sure you want to add a new stage? You can edit the stage name and description after creation."
              onConfirm={onAddStage}
              confirmText="Add Stage"
              cancelText="Cancel"
            />
          </Card>
        ) : (
          <div className="space-y-3">
            {stages.map((stage, index) => (
              <StageItem
                key={stage.id}
                stage={stage}
                index={index}
                isEditing={editingId === stage.id}
                onEdit={() => setEditingId(stage.id)}
                onDelete={() => handleDeleteStage(stage.id)}
                onSave={onSaveStage}
                onCancel={() => setEditingId(null)}
                onMoveUp={() => moveStage(index, "up")}
                onMoveDown={() => moveStage(index, "down")}
                isFirstStage={index === 0}
                isLastStage={index === stages.length - 1}
                disabled={saving}
              />
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
