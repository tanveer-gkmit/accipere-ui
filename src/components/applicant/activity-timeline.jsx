import { Card } from "@/components/ui/card";
import { formatDateTime } from "@/utility/date-utils";

export function ActivityTimeline({ statusHistory }) {
  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold text-foreground mb-4">
        Activity Timeline
      </h3>
      <div className="space-y-4">
        {statusHistory && statusHistory.length > 0 ? (
          statusHistory.map((event, index) => (
            <div key={event.id} className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="h-3 w-3 rounded-full bg-primary" />
                {index < statusHistory.length - 1 && (
                  <div className="w-0.5 h-full min-h-[40px] bg-border mt-2" />
                )}
              </div>
              <div className="flex-1 pb-4">
                <p className="font-medium text-foreground">{event.status_name}</p>
                {event.notes && (
                  <p className="text-sm text-muted-foreground mt-1">{event.notes}</p>
                )}
                {event.assigned_user_name && (
                  <p className="text-xs text-muted-foreground mt-1">
                    Assigned to: {event.assigned_user_name}
                  </p>
                )}
                <p className="text-xs text-muted-foreground mt-1">
                  {formatDateTime(event.created_at)}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-sm text-muted-foreground">
            No activity history available
          </p>
        )}
      </div>
    </Card>
  );
}
