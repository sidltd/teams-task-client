import { Navigate, Outlet } from "react-router";
import { useAuth } from "../providers/AuthContext"

const RequireNoAuth = () => {
  const {user, loading} = useAuth();
  
  if (loading) return null;
  return (user && user.role == "admin") ? <Navigate to={"/dashboard/tasks"} /> : <Outlet />
}

export default RequireNoAuth;
