import { Button } from "../components/ui/button";
import { Square } from "lucide-react";

interface InterviewControlsProps {
  isActive: boolean;
  isPaused: boolean;
  onTogglePause: () => void;
  onEndInterview: () => void;
}

export function InterviewControls({
  isActive,
  onEndInterview,
}: InterviewControlsProps) {
  if (!isActive) {
    return (
      <div className="flex items-center space-x-2">
        <Button variant="outline" disabled>
          Interview Complete
        </Button>
      </div>
    );
  }

  return (
    <div className="flex items-center space-x-2">
      <Button
        variant="destructive"
        size="sm"
        onClick={onEndInterview}
        className="flex items-center space-x-1"
      >
        <Square className="h-4 w-4" />
        <span>End</span>
      </Button>
    </div>
  );
}
