import { createBrowserRouter, Navigate } from "react-router";
import SignIn from "../pages/signin";
import Tasks from "../pages/tasks";
import MainLayout from "../layouts/MainLayout";
import RequireAuth from "../components/RequireAuth";
import RequireNoAuth from "../components/RequireNoAuth";
import ErrorPage from "../components/ErrorPage";

const router = createBrowserRouter([
    {
        path: "/",
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                element: <Navigate to="/dashboard/tasks" replace />
            },
            {
                element: <RequireNoAuth />,
                children: [
                    {
                        path: "signin",
                        element: <SignIn />,
                        index: true
                    }
                ]
            },
            {
            path: "dashboard",
                element: <RequireAuth />,
                children: [
                    {
                        element: <MainLayout />,
                        children: [
                            {
                                path: 'tasks',
                                element: <Tasks />,
                            }
                        ]
                    }
                ]
            }
        ]
    },
]);

export default router;
