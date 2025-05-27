import { Navigate, useLocation } from "react-router-dom";
import { useUser } from "../../hooks/useUser";

interface RequireAuthProps {
  children: JSX.Element;
}

export default function RequireAuth({ children }: RequireAuthProps) {
  const { user, isLoading, isValidating } = useUser();
  const location = useLocation();

  if (isLoading || isValidating) {
    return;
  }
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}
