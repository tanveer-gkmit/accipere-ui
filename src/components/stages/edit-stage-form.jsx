import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Save, Loader2 } from "lucide-react";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";

export function EditStageForm({ stage, onSave, onCancel, disabled }) {
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
