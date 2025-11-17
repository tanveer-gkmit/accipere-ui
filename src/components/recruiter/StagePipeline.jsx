import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { stages } from "@/data/MockData";

export default function StagePipeline({ currentStage, orientation = "horizontal", size = "md" }) {
  const currentIndex = stages.findIndex(({ id }) => id === currentStage);

  const getStageStatus = (index) => ({
    isCompleted: index < currentIndex,
    isCurrent: index === currentIndex,
    isPending: index > currentIndex,
  });

  const dotSize = size === "sm" ? "h-8 w-8" : size === "md" ? "h-10 w-10" : "h-12 w-12";
  const lineThickness = size === "sm" ? "h-0.5" : size === "md" ? "h-1" : "h-1.5";
  const textSize = size === "sm" ? "text-xs" : size === "md" ? "text-sm" : "text-base";

  if (orientation === "vertical") {
    return (
      <div className="space-y-4">
        {stages.map((stage, index) => {
          const { id, label } = stage;
          const { isCompleted, isCurrent, isPending } = getStageStatus(index);

          return (
            <div key={id} className="flex items-start gap-4">
              <div className="flex flex-col items-center">
                <div
                  className={cn(
                    dotSize,
                    "rounded-full flex items-center justify-center border-2 transition-all",
                    isCompleted && "bg-primary border-primary",
                    isCurrent && "bg-primary border-primary ring-4 ring-primary/20",
                    isPending && "bg-muted border-border"
                  )}
                >
                  {isCompleted && <Check className="h-4 w-4 text-primary-foreground" />}
                  {isCurrent && <div className="h-3 w-3 rounded-full bg-primary-foreground" />}
                </div>
                {index < stages.length - 1 && (
                  <div className={cn("w-0.5 h-12 mt-2", isCompleted ? "bg-primary" : "bg-border")} />
                )}
              </div>
              <div className="flex-1 pt-1">
                <p className={cn(textSize, "font-medium", isCurrent ? "text-primary" : "text-foreground")}>
                  {label}
                </p>
                {isCurrent && <p className="text-xs text-muted-foreground mt-1">Current Stage</p>}
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div className="flex items-center justify-between w-full">
      {stages.map((stage, index) => {
        const { id, label } = stage;
        const { isCompleted, isCurrent, isPending } = getStageStatus(index);

        return (
          <div key={id} className="flex items-center flex-1">
            <div className="flex flex-col items-center w-full">
              <div
                className={cn(
                  dotSize,
                  "rounded-full flex items-center justify-center border-2 transition-all",
                  isCompleted && "bg-primary border-primary",
                  isCurrent && "bg-primary border-primary ring-4 ring-primary/20",
                  isPending && "bg-muted border-border"
                )}
              >
                {isCompleted && <Check className="h-4 w-4 text-primary-foreground" />}
                {isCurrent && <div className="h-3 w-3 rounded-full bg-primary-foreground" />}
              </div>
              <p
                className={cn(
                  textSize,
                  "font-medium text-center mt-2 max-w-[100px]",
                  isCurrent ? "text-primary" : "text-foreground"
                )}
              >
                {label}
              </p>
            </div>
            {index < stages.length - 1 && (
              <div className={cn("flex-1", lineThickness, isCompleted ? "bg-primary" : "bg-border", "-mx-2")} />
            )}
          </div>
        );
      })}
    </div>
  );
}
