import { Link, useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { 
  Briefcase, 
  Building2, 
  Settings,
  LogOut,
  ClipboardList
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { useAuth } from "@/contexts/auth-context";
import { USER_ROLES } from "@/constants/roles";
import { ROUTES } from "@/constants/routes";
import { authService } from "@/api/auth";
import { toast } from "sonner";

const navigation = [
  { 
    name: "Jobs", 
    href: ROUTES.DASHBOARD_JOBS, 
    icon: Briefcase,
    allowedRoles: [USER_ROLES.ADMINISTRATOR, USER_ROLES.RECRUITER]
  },
  { 
    name: "My Queue", 
    href: ROUTES.DASHBOARD, 
    icon: ClipboardList,
    allowedRoles: [USER_ROLES.ADMINISTRATOR, USER_ROLES.RECRUITER, USER_ROLES.TECHNICAL_EVALUATOR]
  },
  { 
    name: "Organization", 
    href: ROUTES.DASHBOARD_ORGANIZATION, 
    icon: Building2,
    allowedRoles: [USER_ROLES.ADMINISTRATOR]
  },
  { 
    name: "Settings", 
    href: ROUTES.DASHBOARD_SETTINGS, 
    icon: Settings,
    allowedRoles: [USER_ROLES.ADMINISTRATOR]
  },
];

export function DashboardLayout({ children }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  // Filter navigation items based on user role
  const filteredNavigation = navigation.filter(item => 
    !item.allowedRoles || item.allowedRoles.includes(user?.role)
  );

  const handleLogout = async () => {
    try {
      await authService.logout();
      logout(); // Clear user state in context
      toast.success("Logged out successfully");
      navigate(ROUTES.LOGIN);
    } catch (error) {
      toast.error("Failed to logout. Please try again.");
      console.error("Logout error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <aside className="fixed inset-y-0 left-0 z-50 w-64 bg-card border-r border-border">
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex h-16 items-center border-b border-border px-6">
            <img 
              src="/accipere-primary-black.png" 
              alt="Accipere" 
              className="h-7 w-auto"
            />
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1 px-3 py-4">
            {filteredNavigation.map((item) => {
              const isActive = item.href === ROUTES.DASHBOARD 
                ? location.pathname === ROUTES.DASHBOARD
                : location.pathname === item.href || location.pathname.startsWith(item.href + "/");
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* User section */}
          <div className="border-t border-border p-4">
            <ConfirmDialog
              trigger={
                <Button 
                  variant="ghost" 
                  className="w-full justify-start text-muted-foreground hover:text-foreground"
                >
                  <LogOut className="h-5 w-5 mr-3" />
                  Logout
                </Button>
              }
              title="Confirm Logout"
              description="Are you sure you want to logout? You will need to login again to access the dashboard."
              onConfirm={handleLogout}
              confirmText="Logout"
              cancelText="Cancel"
            />
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="pl-64">
        <main className="p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
