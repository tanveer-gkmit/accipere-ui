# Role-Based Access Control

Simple auth system with 3 user roles:
- **Administrator** - Full access
- **Recruiter** - Manage jobs & settings
- **Technical Evaluator** - View & evaluate applicants

## Usage

### Protect a route
```jsx
<Route path="/admin" element={
  <ProtectedRoute allowedRoles={['Administrator']}>
    <AdminPage />
  </ProtectedRoute>
} />
```

### Hide UI elements
```jsx
import { useAuth } from '@/contexts/auth-context';
import { RoleGuard } from '@/middleware/role-guard';

function MyComponent() {
  const { user, isAdmin } = useAuth();
  
  return (
    <div>
      <h1>Welcome {user?.first_name}</h1>
      
      {/* Method 1: RoleGuard */}
      <RoleGuard allowedRoles={['Administrator']}>
        <button>Admin Only</button>
      </RoleGuard>
      
      {/* Method 2: Direct check */}
      {isAdmin && <button>Admin Only</button>}
    </div>
  );
}
```

### Check permissions
```jsx
import { usePermissions } from '@/hooks/use-permissions';

function MyComponent() {
  const { canManageJobs } = usePermissions();
  
  return canManageJobs && <button>Create Job</button>;
}
```

## Files
- `auth-context.jsx` - Gets user from `/auth/me`
- `protected-route.jsx` - Blocks unauthenticated users
- `public-route.jsx` - Redirects logged-in users away from login
- `role-guard.jsx` - Hides UI based on role
- `use-permissions.js` - Permission checks
