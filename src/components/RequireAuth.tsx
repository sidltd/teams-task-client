import { Navigate, Outlet } from "react-router";
import { useAuth } from "../providers/AuthContext"

const RequireAuth = () => {
  const {user, loading} = useAuth();
  if (loading) return null;

  return (user && user.role == "admin") ? <Outlet /> : <Navigate to={"/signin"} />
}

export default RequireAuth;
