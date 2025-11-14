import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function TextAreaField({
  id,
  label,
  required = false,
  value,
  onChange,
  placeholder,
  className = "min-h-[80px]",
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>
        {label} {required && "*"}
      </Label>
      <Textarea
        id={id}
        required={required}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={className}
      />
    </div>
  );
}
