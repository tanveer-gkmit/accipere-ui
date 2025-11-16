import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export default function FormField({
  id,
  label,
  type = "text",
  required = false,
  value,
  onChange,
  placeholder,
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>
        {label} {required && "*"}
      </Label>
      <Input
        id={id}
        type={type}
        required={required}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
  );
}
