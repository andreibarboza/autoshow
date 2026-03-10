import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import type { AuthState } from '../store/authStore';

const ProtectedRoute = ({ children }: { children?: React.ReactNode }) => {
  const token = useAuthStore((state: AuthState) => state.token);

  if (!token) {
    return <Navigate to="/admin/login" replace />;
  }

  return children ? <>{children}</> : <Outlet />;
};

export default ProtectedRoute;
