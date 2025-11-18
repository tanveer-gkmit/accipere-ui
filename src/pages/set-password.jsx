import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { validatePassword } from "@/utility/validation";
import axiosInstance from "@/api/axios";

// Users Service - Set Password
const usersService = {
  async setPassword(token, password, password_confirm) {
    try {
      const response = await axiosInstance.post("/api/users/set-password/", {
        token,
        password,
        password_confirm,
      });
      return { data: response.data, error: null };
    } catch (error) {
      return {
        data: null,
        error: error.response?.data || "Failed to set password",
      };
    }
  },
};

export default function SetPassword() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get("token");

  const [formData, setFormData] = useState({
    password: "",
    password_confirm: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!token) {
      setError("Invalid or missing setup link. Please check your email for the correct link.");
    }
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    // Validate password strength
    if (!validatePassword(formData.password)) {
      setError("Password must be at least 8 characters and include 1 uppercase letter, 1 number, and 1 symbol");
      return;
    }

    // Validate passwords match
    if (formData.password !== formData.password_confirm) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    const { error: apiError } = await usersService.setPassword(
      token,
      formData.password,
      formData.password_confirm
    );
    setLoading(false);

    if (apiError) {
      const errorMessage = 
        apiError?.error || 
        apiError?.password?.[0] || 
        apiError?.password_confirm?.[0] || 
        (typeof apiError === "string" ? apiError : "Failed to set password. Please try again.");
      setError(errorMessage);
    } else {
      setSuccess(true);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="w-full max-w-md p-6">
          <div className="space-y-4 text-center">
            <h1 className="text-2xl font-bold">Password Set Successfully</h1>
            <p className="text-muted-foreground">
              Your password has been set successfully.
            </p>
            <Button onClick={() => navigate("/login")} className="w-full">
              Go to Login
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-6">
        <div className="space-y-6">
          <div className="space-y-2">
            <h1 className="text-2xl font-bold">Set Your Password</h1>
            <p className="text-muted-foreground">
              Create a password to activate your account
            </p>
          </div>

          {error && (
            <div className="p-3 bg-destructive/10 border border-destructive rounded-md">
              <p className="text-sm text-destructive">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                required
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                placeholder="Enter your password"
                disabled={loading || !token}
                minLength={8}
              />
              <p className="text-xs text-muted-foreground">
                Must be at least 8 characters and include 1 uppercase letter, 1 number, and 1 symbol
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password_confirm">Confirm Password</Label>
              <Input
                id="password_confirm"
                type="password"
                required
                value={formData.password_confirm}
                onChange={(e) =>
                  setFormData({ ...formData, password_confirm: e.target.value })
                }
                placeholder="Confirm your password"
                disabled={loading || !token}
                minLength={8}
              />
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={loading || !token}
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Setting Password...
                </>
              ) : (
                "Set Password"
              )}
            </Button>
          </form>

          <div className="text-center">
            <Button
              variant="link"
              onClick={() => navigate("/login")}
            >
              Back to Login
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
