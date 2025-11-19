import { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, KeyRound, Trash2, Loader2, Pencil } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { ROLE_BADGE_VARIANTS } from "@/constants/roles";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import axiosInstance from "@/api/axios";

// Users Service
const usersService = {
  async getUsers() {
    try {
      const response = await axiosInstance.get("/api/users/");
      return { data: response.data.results || [], error: null };
    } catch (error) {
      return {
        data: null,
        error: error.response?.data?.detail || "Failed to fetch users",
      };
    }
  },
  async createUser(userData) {
    try {
      const response = await axiosInstance.post("/api/users/", userData);
      return { data: response.data, error: null };
    } catch (error) {
      return {
        data: null,
        error: error.response?.data || "Failed to create user",
      };
    }
  },
  async updateUser(userId, userData) {
    try {
      const response = await axiosInstance.patch(`/api/users/${userId}/`, userData);
      return { data: response.data, error: null };
    } catch (error) {
      return {
        data: null,
        error: error.response?.data || "Failed to update user",
      };
    }
  },
  async deleteUser(userId) {
    try {
      const response = await axiosInstance.delete(`/api/users/${userId}/`);
      return { data: response.data, error: null };
    } catch (error) {
      return {
        data: null,
        error: error.response?.data?.detail || "Failed to delete user",
      };
    }
  },
  async resetPassword(userId) {
    try {
      const response = await axiosInstance.post(`/api/users/${userId}/reset-password/`);
      return { data: response.data, error: null };
    } catch (error) {
      return {
        data: null,
        error: error.response?.data?.detail || "Failed to reset password",
      };
    }
  },
};

// Roles Service
const rolesService = {
  async getRoles() {
    try {
      const response = await axiosInstance.get("/api/roles/");
      return { data: response.data.results || [], error: null };
    } catch (error) {
      return {
        data: null,
        error: error.response?.data?.detail || "Failed to fetch roles",
      };
    }
  },
};

const initialFormData = {
  email: "",
  first_name: "",
  last_name: "",
  role: "",
};

export default function Organization() {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(null);
  const { toast } = useToast();

  // Fetch users and roles on mount
  useEffect(() => {
    fetchUsers();
    fetchRoles();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    const { data, error } = await usersService.getUsers();
    if (error) {
      toast({
        title: "Error",
        description: typeof error === "string" ? error : "Failed to fetch users",
        variant: "destructive",
      });
      setUsers([]);
    } else {
      // Ensure data is an array
      setUsers(Array.isArray(data) ? data : []);
    }
    setLoading(false);
  };

  const fetchRoles = async () => {
    const { data, error } = await rolesService.getRoles();
    if (!error && data) {
      setRoles(Array.isArray(data) ? data : []);
    } else {
      setRoles([]);
    }
  };

  const handleUserSubmit = async (userData, isEdit = false) => {
    const loadingKey = isEdit ? "edit" : "add";
    setActionLoading(loadingKey);
    
    const { data, error } = isEdit 
      ? await usersService.updateUser(editingUser.id, userData)
      : await usersService.createUser(userData);
    
    setActionLoading(null);

    if (error) {
      const defaultMessage = isEdit ? "Failed to update user" : "Failed to create user";
      let errorMessage = defaultMessage;
      
      if (typeof error === "object" && error.email) {
        errorMessage = error.email[0];
      } else if (typeof error === "string") {
        errorMessage = error;
      }
      
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
      return;
    }

    // Update users list
    if (isEdit) {
      setUsers(users.map(user => user.id === editingUser.id ? { ...user, ...data } : user));
      setIsEditDialogOpen(false);
      setEditingUser(null);
    } else {
      setUsers(Array.isArray(users) ? [...users, data] : [data]);
      setIsAddDialogOpen(false);
    }

    // Show success toast
    const successTitle = isEdit ? "User Updated" : "User Added";
    const successDescription = isEdit 
      ? `${data.first_name} ${data.last_name} has been updated successfully.`
      : `${data.first_name} ${data.last_name} has been added. A password setup email has been sent.`;
    
    toast({
      title: successTitle,
      description: successDescription,
    });
  };

  const handleAddUser = (userData) => handleUserSubmit(userData, false);
  const handleEditUser = (userData) => handleUserSubmit(userData, true);

  const openEditDialog = (user) => {
    setEditingUser(user);
    setIsEditDialogOpen(true);
  };

  const handleResetPassword = async (userId, userEmail) => {
    setActionLoading(`reset-${userId}`);
    const { error } = await usersService.resetPassword(userId);
    setActionLoading(null);

    if (error) {
      toast({
        title: "Error",
        description: typeof error === "string" ? error : "Failed to reset password",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Password Reset",
        description: `Password reset email has been sent to ${userEmail}`,
      });
    }
  };

  const handleDeleteUser = async (userId) => {
    setActionLoading(`delete-${userId}`);
    const { error } = await usersService.deleteUser(userId);
    setActionLoading(null);

    if (error) {
      toast({
        title: "Error",
        description: typeof error === "string" ? error : "Failed to delete user",
        variant: "destructive",
      });
    } else {
      setUsers(Array.isArray(users) ? users.filter((u) => u.id !== userId) : []);
      toast({
        title: "User Removed",
        description: "User has been removed from the organization.",
      });
    }
  };

  const getRoleBadgeVariant = (roleName) => {
    return ROLE_BADGE_VARIANTS[roleName] || "secondary";
  };

  return (
    <DashboardLayout>
      <div className="max-w-6xl space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Organization</h1>
            <p className="text-muted-foreground mt-1">
              Manage users and their roles
            </p>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add User
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New User</DialogTitle>
              </DialogHeader>
              <UserForm 
                onSubmit={handleAddUser} 
                roles={roles}
                loading={actionLoading === "add"}
                isEdit={false}
              />
            </DialogContent>
          </Dialog>
        </div>

        <Card className="p-6 bg-primary/5 border-primary/20">
          <h3 className="font-semibold text-foreground mb-2">
            User Management
          </h3>
          <p className="text-sm text-muted-foreground">
            Add team members, assign roles, and manage access to your
            recruitment platform. Admins can reset passwords and remove users.
          </p>
        </Card>

        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Password</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8">
                    <Loader2 className="h-6 w-6 animate-spin mx-auto" />
                  </TableCell>
                </TableRow>
              ) : users.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                    No users found. Add your first user to get started.
                  </TableCell>
                </TableRow>
              ) : (
                users.map((user) => {
                  const { id, first_name, last_name, email, role_name, is_active, is_password_set } = user;
                  return (
                    <TableRow key={id}>
                      <TableCell className="font-medium">
                        {first_name} {last_name}
                      </TableCell>
                      <TableCell>{email}</TableCell>
                      <TableCell>
                        <Badge variant={getRoleBadgeVariant(role_name)}>
                          {role_name}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={is_active ? "default" : "secondary"}>
                          {is_active ? "Active" : "Inactive"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={is_password_set ? "default" : "destructive"}>
                          {is_password_set ? "Set" : "Pending"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => openEditDialog(user)}
                            disabled={actionLoading !== null}
                          >
                            <Pencil className="h-4 w-4 mr-1" />
                            Edit
                          </Button>
                          <ConfirmDialog
                            trigger={
                              <Button
                                variant="ghost"
                                size="sm"
                                disabled={actionLoading !== null}
                              >
                                {actionLoading === `reset-${id}` ? (
                                  <Loader2 className="h-4 w-4 animate-spin" />
                                ) : (
                                  <>
                                    <KeyRound className="h-4 w-4 mr-1" />
                                    Reset Password
                                  </>
                                )}
                              </Button>
                            }
                            title="Reset Password"
                            description={`Are you sure you want to reset the password for ${first_name} ${last_name}? This will invalidate their current password and send them a password reset email.`}
                            onConfirm={() => handleResetPassword(id, email)}
                            confirmText="Reset Password"
                            variant="default"
                          />
                          <ConfirmDialog
                            trigger={
                              <Button
                                variant="ghost"
                                size="sm"
                                disabled={actionLoading !== null}
                              >
                                {actionLoading === `delete-${id}` ? (
                                  <Loader2 className="h-4 w-4 animate-spin text-destructive" />
                                ) : (
                                  <Trash2 className="h-4 w-4 text-destructive" />
                                )}
                              </Button>
                            }
                            title="Delete User"
                            description={`Are you sure you want to delete ${first_name} ${last_name}? This action cannot be undone.`}
                            onConfirm={() => handleDeleteUser(id)}
                            confirmText="Delete"
                            variant="destructive"
                          />
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </Card>

        {/* Edit User Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit User</DialogTitle>
            </DialogHeader>
            {editingUser && (
              <UserForm 
                onSubmit={handleEditUser} 
                roles={roles}
                loading={actionLoading === "edit"}
                initialData={editingUser}
                isEdit={true}
              />
            )}
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
}

function UserForm({ onSubmit, roles, loading, initialData = null, isEdit = false }) {
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
