import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Loader2 } from "lucide-react";

const initialFormData = {
  email: "",
  first_name: "",
  last_name: "",
  role: "",
};

export function UserForm({ onSubmit, roles, loading, initialData = null, isEdit = false }) {
  const [formData, setFormData] = useState(() => {
    if (isEdit && initialData) {
      return {
        email: initialData.email || "",
        first_name: initialData.first_name || "",
        last_name: initialData.last_name || "",
        role: initialData.role || "",
        is_active: initialData.is_active ?? true,
      };
    }
    return initialFormData;
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    if (!isEdit) {
      setFormData(initialFormData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName">First Name *</Label>
          <Input
            id="firstName"
            required
            value={formData.first_name}
            onChange={(e) =>
              setFormData({ ...formData, first_name: e.target.value })
            }
            placeholder="John"
            disabled={loading}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName">Last Name *</Label>
          <Input
            id="lastName"
            required
            value={formData.last_name}
            onChange={(e) =>
              setFormData({ ...formData, last_name: e.target.value })
            }
            placeholder="Doe"
            disabled={loading}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email *</Label>
        <Input
          id="email"
          type="email"
          required
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          placeholder="john.doe@company.com"
          disabled={loading}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="role">Role *</Label>
        <Select
          value={formData.role}
          onValueChange={(value) =>
            setFormData({ ...formData, role: value })
          }
          disabled={loading}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select a role" />
          </SelectTrigger>
          <SelectContent>
            {roles.map((role) => (
              <SelectItem key={role.id} value={role.id}>
                {role.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {isEdit && (
        <div className="flex items-center justify-between space-x-2">
          <div className="space-y-0.5">
            <Label htmlFor="is_active">Active Status</Label>
            <p className="text-sm text-muted-foreground">
              Enable or disable user access
            </p>
          </div>
          <Switch
            id="is_active"
            checked={formData.is_active}
            onCheckedChange={(checked) =>
              setFormData({ ...formData, is_active: checked })
            }
            disabled={loading}
          />
        </div>
      )}

      <div className="flex gap-3 pt-4">
        <Button type="submit" className="flex-1" disabled={loading}>
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              {isEdit ? "Updating User..." : "Adding User..."}
            </>
          ) : (
            isEdit ? "Update User" : "Add User"
          )}
        </Button>
      </div>
    </form>
  );
}
