import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export function StatusConfirmDialog({
  open,
  onOpenChange,
  onConfirm,
  applicantName,
  currentStatus,
  newStatus,
  currentUser,
  newUser,
  note,
  stages,
  users,
}) {
  const statusChanged = newStatus && newStatus !== currentStatus;
  const userChanged = newUser !== currentUser;
  
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Confirm Status Update</AlertDialogTitle>
          <AlertDialogDescription>
            <div className="space-y-2">
              {statusChanged && (
                <p>
                  Moving {applicantName} from{" "}
                  <span className="font-semibold">
                    {stages.find((s) => s.value === currentStatus)?.label || "current stage"}
                  </span>{" "}
                  to{" "}
                  <span className="font-semibold">
                    {stages.find((s) => s.value === newStatus)?.label}
                  </span>
                </p>
              )}
              {userChanged && (
                <p>
                  {newUser === "unassign" ? (
                    <>Unassigning from current user</>
                  ) : (
                    <>
                      Assigning to{" "}
                      <span className="font-semibold">
                        {users.find((u) => u.id === newUser)?.name}
                      </span>
                    </>
                  )}
                </p>
              )}
              {note.trim() && (
                <div className="mt-2 p-2 bg-muted rounded text-sm">
                  <strong>Note:</strong> {note}
                </div>
              )}
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm}>Confirm</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
