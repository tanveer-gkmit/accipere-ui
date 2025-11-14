import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Upload } from "lucide-react";

export default function FileUploadField({
  id,
  label,
  required = false,
  accept,
  onChange,
  selectedFile,
  description,
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>
        {label} {required && "*"}
      </Label>
      <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
        <Upload className="h-10 w-10 text-muted-foreground mx-auto mb-2" />
        <p className="text-sm font-medium mb-1">{label}</p>
        {description && (
          <p className="text-xs text-muted-foreground mb-3">{description}</p>
        )}
        <Input
          id={id}
          type="file"
          accept={accept}
          required={required}
          onChange={onChange}
          className="cursor-pointer max-w-xs mx-auto"
        />
        {selectedFile && (
          <p className="text-sm text-muted-foreground mt-2">
            Selected: {selectedFile.name}
          </p>
        )}
      </div>
    </div>
  );
}
