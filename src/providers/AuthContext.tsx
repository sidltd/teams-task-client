import { useMutation, useQuery } from "@tanstack/react-query";
import { createContext, useContext, useEffect, useState } from "react";
import { fetchCurrentUser, logoutCurrentUser, signInUser } from "../api/sessions/api";
import { useSnackbar } from "./SnackbarProvider";
import router from "../router";

interface User {
  id: string;
  email: string;
  role: string
};

export type CredsType = {
  email: string,
  password: string,
}

interface AuthContextValue {
  user?: User | null;
  loading: boolean;
  login: (credentials: CredsType) => void,
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue>({
  user: null,
  loading: true,
  login: () => {},
  logout: () => {},
});

export const AuthContextProvider = ({children}: any) => {
  const [user, setUser] = useState<User | null>(null);
  
  const {showSnackbar} = useSnackbar();

  const {data, isLoading} = useQuery({
    queryKey: ["user"],
    queryFn: fetchCurrentUser,
    retry: false
  })

   useEffect(() => {
    setUser(data ?? null);
  }, [data]);

  const login = useMutation({
    mutationFn: signInUser,
    onSuccess: (res) => {
      setUser(res)
      showSnackbar("Signed in Successfully", "success")
      router.navigate("/tasks")
    },
    onError: (err) => {
        showSnackbar(err.message, "error")
    }
  })

  const logout = useMutation({
    mutationFn: logoutCurrentUser,
    onSuccess: () => {
      showSnackbar("You have been logged out", "success")
      setUser(null)
      router.navigate("/signin")
    }
  })

  return (
    <AuthContext.Provider value={{ user, loading: isLoading, login: login.mutate, logout: logout.mutate }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext);
