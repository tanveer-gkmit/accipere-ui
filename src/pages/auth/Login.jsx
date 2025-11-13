import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authService } from "@/api/auth";
import { validateEmail, validatePassword } from "@/utility/validation";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    if (!validateEmail(email)) {
      setErrors({ email: "Please enter a valid email address" });
      return;
    }

    if (!validatePassword(password)) {
      setErrors({ password: "Password must be at least 8 characters and include 1 uppercase letter, 1 number, and 1 symbol" });
      return;
    }

    setIsLoading(true);

    try {
      await authService.login(email, password);
      navigate("/");
    } catch (err) {
      const errorData = err.response?.data || {};
      setErrors({
        email: errorData.email?.[0],
        password: errorData.password?.[0],
        general: errorData.non_field_errors?.[0] || errorData.detail || "Invalid email or password"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center from-background to-muted/20 px-4">
      <Card className="w-full max-w-md p-8 space-y-6">
        <div className="text-center space-y-2">
          <div className="inline-flex h-28 w-28 items-center justify-center rounded-xl">
            <img src="/accipere-logomark-black.png" alt="Accipere Logo" className="h-24 w-24 object-contain" />
          </div>
          <h1 className="text-3xl font-bold text-foreground">Welcome Back</h1>
          <p className="text-muted-foreground">Sign in to your Accipere account</p>
        </div>
        <form className="space-y-4" onSubmit={handleSubmit} noValidate>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="john@example.com"
              className="h-11"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && (
              <p className="text-sm text-destructive">{errors.email}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              className="h-11"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && (
              <p className="text-sm text-destructive">{errors.password}</p>
            )}
          </div>
          {errors.general && (
            <p className="text-sm text-destructive text-center">{errors.general}</p>
          )}
          <Button className="w-full h-11" size="lg" type="submit" disabled={isLoading}>
            {isLoading ? "Signing In..." : "Sign In"}
          </Button>
        </form>
        <p className="text-center text-sm text-muted-foreground">
          Admin and company access only
        </p>
      </Card>
    </div>
  );
}