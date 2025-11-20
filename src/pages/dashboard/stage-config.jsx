import { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Plus, Trash2, Edit2, Save, MoveUp, MoveDown, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import axiosInstance from "@/api/axios";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";

export default function StageConfig() {
  const [stages, setStages] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchStages();
  }, []);

  const fetchStages = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get("/api/application-statuses/");
      setStages(response.data.results || []);
    } catch (err) {
      console.error("Error fetching stages:", err);
      toast({
        title: "Error",
        description: "Failed to load stages",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAddStage = async () => {
    try {
      setSaving(true);
      const response = await axiosInstance.post("/api/application-statuses/", {
        name: "New Stage",
        description: "Stage description",
      });
      setStages([...stages, response.data]);
      setEditingId(response.data.id);
      toast({
        title: "Stage Added",
        description: "New stage added to stage configuration. Click to edit.",
      });
    } catch (err) {
      console.error("Error adding stage:", err);
      toast({
        title: "Error",
        description: err.response?.data?.name?.[0] || "Failed to add stage",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteStage = async (id) => {
    try {
      setSaving(true);
      await axiosInstance.delete(`/api/application-statuses/${id}/`);
      setStages(stages.filter((stage) => stage.id !== id));
      toast({
        title: "Stage Deleted",
        description: "Stage removed from stage configuration.",
      });
    } catch (err) {
      console.error("Error deleting stage:", err);
      toast({
        title: "Error",
        description: err.response?.data?.error || "Failed to delete stage",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleSaveStage = async (id, name, description) => {
    try {
      setSaving(true);
      const response = await axiosInstance.patch(`/api/application-statuses/${id}/`, {
        name,
        description,
      });
      setStages(stages.map((stage) => (stage.id === id ? response.data : stage)));
      setEditingId(null);
      toast({
        title: "Stage Updated",
        description: "Stage changes saved successfully.",
      });
    } catch (err) {
      console.error("Error updating stage:", err);
      toast({
        title: "Error",
        description: err.response?.data?.name?.[0] || "Failed to update stage",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const moveStage = async (index, direction) => {
    const newIndex = direction === "up" ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= stages.length) return;

    const newStages = [...stages];
    [newStages[index], newStages[newIndex]] = [newStages[newIndex], newStages[index]];
    
    // Update order_sequence for all stages
    const reorderedStages = newStages.map((stage, i) => ({
      ...stage,
      order_sequence: i,
    }));

    // Optimistically update UI
    setStages(reorderedStages);

    try {
      setSaving(true);
      const items = reorderedStages.map((stage) => ({
        id: stage.id,
        order_sequence: stage.order_sequence,
      }));
      
      await axiosInstance.post("/api/application-statuses/reorder/", { items });
      
      toast({
        title: "Order Updated",
        description: "Stage order updated successfully.",
      });
    } catch (err) {
      console.error("Error reordering stages:", err);
      // Revert on error
      fetchStages();
      toast({
        title: "Error",
        description: err.response?.data?.error || "Failed to reorder stages",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
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
            onConfirm={handleAddStage}
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
              onConfirm={handleAddStage}
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
                onSave={handleSaveStage}
                onCancel={() => setEditingId(null)}
                onMoveUp={() => moveStage(index, "up")}
                onMoveDown={() => moveStage(index, "down")}
                isFirstStage={index === 0}
                isLast={index === stages.length - 1}
                disabled={saving}
              />
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

function StageItem({ stage, isEditing, onEdit, onDelete, onSave, onCancel, onMoveUp, onMoveDown, isFirstStage, isLast, disabled }) {
  return (
    <Card className="p-5">
      {isEditing ? (
        <EditStageForm stage={stage} onSave={onSave} onCancel={onCancel} disabled={disabled} />
      ) : (
        <div className="flex items-start gap-4">
          <div className="flex items-center gap-3 flex-1">
            <div className="flex flex-col gap-1">
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6"
                onClick={onMoveUp}
                disabled={isFirstStage || disabled}
              >
                <MoveUp className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6"
                onClick={onMoveDown}
                disabled={isLast || disabled}
              >
                <MoveDown className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex items-center justify-center h-10 w-10 rounded-full bg-primary/10">
              <span className="font-semibold text-primary">{stage.order_sequence + 1}</span>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-semibold text-foreground">{stage.name}</h3>
              </div>
              <p className="text-sm text-muted-foreground">{stage.description}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="ghost" size="icon" onClick={onEdit} disabled={disabled}>
              <Edit2 className="h-4 w-4" />
            </Button>
            <ConfirmDialog
              trigger={
                <Button variant="ghost" size="icon" disabled={disabled}>
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              }
              title="Delete Stage"
              description={`Are you sure you want to delete "${stage.name}"? This action cannot be undone and may affect existing applications.`}
              onConfirm={onDelete}
              confirmText="Delete"
              cancelText="Cancel"
              variant="destructive"
            />
          </div>
        </div>
      )}
    </Card>
  );
}

function EditStageForm({ stage, onSave, onCancel, disabled }) {
  const [name, setName] = useState(stage.name);
  const [description, setDescription] = useState(stage.description);

  const handleSaveClick = () => {
    onSave(stage.id, name, description);
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor={`name-${stage.id}`}>Stage Name</Label>
        <Input
          id={`name-${stage.id}`}
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter stage name"
          disabled={disabled}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor={`desc-${stage.id}`}>Description</Label>
        <Input
          id={`desc-${stage.id}`}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter stage description"
          disabled={disabled}
        />
      </div>
      <div className="flex gap-2 justify-end">
        <Button variant="outline" onClick={onCancel} disabled={disabled}>
          Cancel
        </Button>
        <ConfirmDialog
          trigger={
            <Button disabled={disabled || !name.trim()}>
              {disabled ? (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <Save className="h-4 w-4 mr-2" />
              )}
              Save
            </Button>
          }
          title="Save Changes"
          description={`Are you sure you want to save changes to "${stage.name}"? This will update the stage configuration.`}
          onConfirm={handleSaveClick}
          confirmText="Save Changes"
          cancelText="Cancel"
        />
      </div>
    </div>
  );
}
