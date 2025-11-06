import { RouterProvider } from "react-router"
import router from "../router/index.tsx"
import { SnackbarProvider } from "./SnackbarProvider.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthContextProvider } from "./AuthContext.tsx";

const AppProviders = () => {
    const queryClient = new QueryClient();

    return (
        <QueryClientProvider client={queryClient}>
            <SnackbarProvider>
                <AuthContextProvider>
                    <RouterProvider router={router} />
                </AuthContextProvider>
            </SnackbarProvider>
        </QueryClientProvider>
    )
}

export default AppProviders;
