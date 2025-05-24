import { File, X } from "lucide-react";
import { Button } from "./ui/button";

const UploadCard = ({
  fileName,
  handleRemove,
}: {
  fileName: string;
  handleRemove: () => void;
}) => {
  return (
    <div className="border-2 border-emerald-200 bg-emerald-50 rounded-lg p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <File className="h-8 w-8 text-emerald-600" />
          <div>
            <p className="font-medium text-emerald-900">{fileName}</p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleRemove}
          className="text-emerald-600 hover:text-emerald-700 hover:bg-emerald-100"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default UploadCard;
