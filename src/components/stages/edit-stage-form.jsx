import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Save, Loader2 } from "lucide-react";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";

export function EditStageForm({ stage, onSave, onCancel, disabled }) {
  const [name, setName] = useState(stage.name);
  const [description, setDescription] = useState(stage.description);
  const [touched, setTouched] = useState({ name: false, description: false });

  const errors = {
    name: !name.trim() ? "Stage name is required" : "",
    description: !description.trim() ? "Description is required" : "",
  };

  const isValid = !errors.name && !errors.description;

  const handleSaveClick = () => {
    onSave(stage.id, name.trim(), description.trim());
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor={`name-${stage.id}`}>
          Stage Name <span className="text-destructive">*</span>
        </Label>
        <Input
          id={`name-${stage.id}`}
          value={name}
          onChange={(e) => setName(e.target.value)}
          onBlur={() => setTouched({ ...touched, name: true })}
          placeholder="Enter stage name"
          disabled={disabled}
          required
          aria-required="true"
          aria-invalid={touched.name && !!errors.name}
          className={touched.name && errors.name ? "border-destructive" : ""}
        />
        {touched.name && errors.name && (
          <p className="text-sm text-destructive">{errors.name}</p>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor={`desc-${stage.id}`}>
          Description <span className="text-destructive">*</span>
        </Label>
        <Input
          id={`desc-${stage.id}`}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          onBlur={() => setTouched({ ...touched, description: true })}
          placeholder="Enter stage description"
          disabled={disabled}
          required
          aria-required="true"
          aria-invalid={touched.description && !!errors.description}
          className={touched.description && errors.description ? "border-destructive" : ""}
        />
        {touched.description && errors.description && (
          <p className="text-sm text-destructive">{errors.description}</p>
        )}
      </div>
      <div className="flex gap-2 justify-end">
        <Button variant="outline" onClick={onCancel} disabled={disabled}>
          Cancel
        </Button>
        <ConfirmDialog
          trigger={
            <Button disabled={disabled || !isValid}>
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
