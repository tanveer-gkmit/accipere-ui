import { useState } from "react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Plus, Trash2, Edit2, Save, MoveUp, MoveDown } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const defaultStages = [
  { id: "1", name: "HR Screening", description: "Initial resume screening and basic qualification check", order: 1 },
  { id: "2", name: "Technical Screening", description: "Technical skills assessment and domain knowledge evaluation", order: 2 },
  { id: "3", name: "Interview 1", description: "First round interview with team lead", order: 3 },
  { id: "4", name: "Interview 2", description: "Second round interview with manager", order: 4 },
  { id: "5", name: "HR Interview", description: "Final HR discussion on compensation and benefits", order: 5 },
  { id: "6", name: "Offer Sent", description: "Official offer letter sent to candidate", order: 6 },
  { id: "7", name: "Joined", description: "Candidate has joined the organization", order: 7 },
];

export default function StageConfig() {
  const [stages, setStages] = useState(defaultStages);
  const [editingId, setEditingId] = useState(null);
  const { toast } = useToast();

  const handleAddStage = () => {
    const newStage = {
      id: String(Date.now()),
      name: "New Stage",
      description: "Stage description",
      order: stages.length + 1,
    };
    setStages([...stages, newStage]);
    setEditingId(newStage.id);
    toast({
      title: "Stage Added",
      description: "New stage added to stage configuration. Click to edit.",
    });
  };

  const handleDeleteStage = (id) => {
    const updatedStages = stages
      .filter((s) => s.id !== id)
      .map((s, index) => ({ ...s, order: index + 1 }));
    setStages(updatedStages);
    toast({
      title: "Stage Deleted",
      description: "Stage removed from stage configuration.",
    });
  };

  const handleSaveStage = (id, name, description) => {
    setStages(
      stages.map((s) => (s.id === id ? { ...s, name, description } : s))
    );
    setEditingId(null);
    toast({
      title: "Stage Updated",
      description: "Stage changes saved successfully.",
    });
  };

  const moveStage = (index, direction) => {
    const newIndex = direction === "up" ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= stages.length) return;

    const newStages = [...stages];
    [newStages[index], newStages[newIndex]] = [newStages[newIndex], newStages[index]];
    const reorderedStages = newStages.map((s, i) => ({ ...s, order: i + 1 }));
    setStages(reorderedStages);
  };

  return (
    <DashboardLayout userRole="recruiter">
      <div className="max-w-5xl space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Stage Configuration</h1>
            <p className="text-muted-foreground mt-1">Customize your hiring pipeline stages</p>
          </div>
          <Button onClick={handleAddStage}>
            <Plus className="h-4 w-4 mr-2" />
            Add Stage
          </Button>
        </div>

        <Card className="p-6 bg-primary/5 border-primary/20">
          <h3 className="font-semibold text-foreground mb-2">About Stage Configuration</h3>
          <p className="text-sm text-muted-foreground">
            Define the stages that candidates go through in your hiring process. You can add, edit, reorder,
            or remove stages to match your organization's recruitment stage configuration.
          </p>
        </Card>

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
              isFirst={index === 0}
              isLast={index === stages.length - 1}
            />
          ))}
        </div>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-foreground mb-1">Save Changes</h3>
              <p className="text-sm text-muted-foreground">
                Apply stage changes to all future job openings
              </p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline">Reset to Default</Button>
              <Button>
                <Save className="h-4 w-4 mr-2" />
                Save Stage Configuration
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}

function StageItem({ stage, index, isEditing, onEdit, onDelete, onSave, onCancel, onMoveUp, onMoveDown, isFirst, isLast }) {
  return (
    <Card className="p-5">
      {isEditing ? (
        <EditStageForm stage={stage} onSave={onSave} onCancel={onCancel} />
      ) : (
        <div className="flex items-start gap-4">
          <div className="flex items-center gap-3 flex-1">
            <div className="flex flex-col gap-1">
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6"
                onClick={onMoveUp}
                disabled={isFirst}
              >
                <MoveUp className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6"
                onClick={onMoveDown}
                disabled={isLast}
              >
                <MoveDown className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex items-center justify-center h-10 w-10 rounded-full bg-primary/10">
              <span className="font-semibold text-primary">{stage.order}</span>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-semibold text-foreground">{stage.name}</h3>
                <Badge variant="secondary" className="text-xs">
                  Stage {stage.order}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">{stage.description}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="ghost" size="icon" onClick={onEdit}>
              <Edit2 className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={onDelete}>
              <Trash2 className="h-4 w-4 text-destructive" />
            </Button>
          </div>
        </div>
      )}
    </Card>
  );
}

function EditStageForm({ stage, onSave, onCancel }) {
  const [name, setName] = useState(stage.name);
  const [description, setDescription] = useState(stage.description);

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor={`name-${stage.id}`}>Stage Name</Label>
        <Input
          id={`name-${stage.id}`}
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter stage name"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor={`desc-${stage.id}`}>Description</Label>
        <Input
          id={`desc-${stage.id}`}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter stage description"
        />
      </div>
      <div className="flex gap-2 justify-end">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button onClick={() => onSave(stage.id, name, description)}>
          <Save className="h-4 w-4 mr-2" />
          Save
        </Button>
      </div>
    </div>
  );
}
