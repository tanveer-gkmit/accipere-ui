import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit2, Trash2, MoveUp, MoveDown } from "lucide-react";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { EditStageForm } from "./edit-stage-form";

export function StageItem({ 
  stage, 
  isEditing, 
  onEdit, 
  onDelete, 
  onSave, 
  onCancel, 
  onMoveUp, 
  onMoveDown, 
  isFirstStage, 
  isLastStage, 
  disabled 
}) {
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
                disabled={isLastStage || disabled}
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
