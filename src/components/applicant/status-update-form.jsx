import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Loader2, ArrowRight, User, FileText } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function StatusUpdateForm({ applicant, stages, users, isUpdating, onUpdate }) {
  const currentStatus = applicant?.current_status_details;
  const currentUser = applicant?.status_history?.[0];
  const statusHistory = applicant?.status_history || [];
  
  const [statusId, setStatusId] = useState(currentStatus?.id || "");
  const [userId, setUserId] = useState(currentUser?.assigned_user_id || "unassigned");
  const [notes, setNotes] = useState("");

  // Filter stages to only show forward-moving statuses
  const currentStage = stages.find(s => s.value === currentStatus?.id);
  console.log('stages:', stages);
  console.log(currentStage)
  const currentOrder = currentStage?.order ?? currentStatus?.order;
  
  
  const availableStages = stages.filter(stage => {
    if (currentOrder === undefined || currentOrder === null) {
      return true; // If no current order, show all
    }
    
    const isAvailable = stage.order >= currentOrder;
    console.log(`Stage ${stage.label} (order ${stage.order}) >= ${currentOrder}:`, isAvailable);
    return isAvailable;
  });

  // Auto-fill note and assigned user when status changes
  useEffect(() => {
    if (!statusId) return;
    
    // Find the status in history
    const historyEntry = statusHistory.find(
      (entry) => entry.status_id === statusId
    );
    
    if (historyEntry) {
      // If found in history, populate from history
      setNotes(historyEntry.notes || "");
      setUserId(historyEntry.assigned_user_id || "unassigned");
    } else {
      // If not in history (new status), clear the fields
      setNotes("");
      setUserId("unassigned");
    }
  }, [statusId, statusHistory]);

  const currentUserId = currentUser?.assigned_user_id || "unassigned";
  
  const hasChanges = 
    (statusId && statusId !== currentStatus?.id) ||
    userId !== currentUserId ||
    notes.trim();

  const handleSubmit = () => {
    if (!hasChanges) return;
    
    const finalUserId = userId === "unassigned" ? "" : userId;
    
    onUpdate(
      statusId !== currentStatus?.id ? statusId : null,
      userId !== currentUserId ? finalUserId : undefined,
      notes
    );
  };

  return (
   <Card className="w-full shadow-sm">
      <CardHeader className="space-y-1">
        <CardTitle className="text-xl font-semibold">Update Application Status</CardTitle>
        <CardDescription>
          Change the status and assignment for this application
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Status Section */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label htmlFor="status" className="text-sm font-medium">
              Application Status
            </Label>
          </div>
          
          <Select value={statusId} onValueChange={setStatusId}>
            <SelectTrigger id="status" className="!h-14 w-full">
              <SelectValue placeholder="Select new status" />
            </SelectTrigger>
            <SelectContent className="min-w-[400px]">
              {availableStages.map((stage) => (
                <SelectItem key={stage.value} value={stage.value}>
                  <div className="flex items-center gap-2">
                    <ArrowRight className="h-3.5 w-3.5 text-muted-foreground" />
                    {stage.label}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          {availableStages.length < stages.length && (
            <p className="text-xs text-muted-foreground flex items-center gap-1.5">
              <span className="inline-block w-1 h-1 rounded-full bg-muted-foreground/50" />
              Only forward-moving statuses are available
            </p>
          )}
        </div>

        <Separator />

        {/* Assignment Section */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label htmlFor="assignee" className="text-sm font-medium">
              Assigned To
            </Label>
          </div>
          
          <Select value={userId} onValueChange={setUserId}>
            <SelectTrigger id="assignee" className="!h-14 w-full">
              <SelectValue placeholder="Select assignee" />
            </SelectTrigger>
            <SelectContent className="min-w-[400px]">
              <SelectItem value="unassigned">
                <span className="text-muted-foreground">Unassign</span>
              </SelectItem>
              {users?.map((user) => (
                <SelectItem key={user.id} value={user.id}>
                  <div className="flex flex-col items-start">
                    <span className="font-medium">{user.name} - {user.role_name}</span>
                    <span className="text-xs text-muted-foreground">{user.email}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Separator />
        
        {/* Notes Section */}
        <div className="space-y-3">
          <Label htmlFor="notes" className="text-sm font-medium flex items-center gap-2">
            <FileText className="h-3.5 w-3.5" />
            Notes
            <span className="text-xs font-normal text-muted-foreground">(Optional)</span>
          </Label>
          <Textarea
            id="notes"
            placeholder="Add feedback, comments, or additional context..."
            className="min-h-[120px] resize-none"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </div>

        {/* Action Button */}
        <Button 
          onClick={handleSubmit}
          disabled={isUpdating || !hasChanges}
          className="w-full h-11 font-medium"
          size="lg"
        >
          {isUpdating ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Updating Application...
            </>
          ) : (
            <>
              Update Status
              <ArrowRight className="h-4 w-4 ml-2" />
            </>
          )}
        </Button>

        {!hasChanges && (
          <p className="text-xs text-center text-muted-foreground">
            Make changes to enable the update button
          </p>
        )}
      </CardContent>
    </Card>
  );
}
