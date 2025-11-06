import { Toolbar, Box } from "@mui/material";
import SideNav from "../components/SideNav";
import { Outlet } from "react-router";
import TopBar from "../components/TopBar";

export default function MainLayout() {
  return (
    <Box sx={{ display: "flex" }}>
      <TopBar />
      <SideNav />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
}
