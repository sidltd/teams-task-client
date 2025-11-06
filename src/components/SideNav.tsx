import { Settings, Task } from "@mui/icons-material";
import { Avatar, AvatarGroup, Drawer, List, ListItemButton, ListItemIcon, ListItemText, Toolbar } from "@mui/material"
import { Link, useLocation } from "react-router";

const SideNav = () => {
    const location = useLocation();
    
    return (
        <Drawer
            variant="permanent"
            sx={{
                width: 240,
                flexShrink: 0,
                [`& .MuiDrawer-paper`]: { width: 240, boxSizing: "border-box" },
        }}>
            <Toolbar />
            <List>
                <ListItemButton>
                    <ListItemIcon><Avatar /></ListItemIcon>
                    <ListItemText primary="Dashboard" />
                </ListItemButton>
                <ListItemButton component={Link} to="/dashboard/tasks" selected={location.pathname === "/dashboard/tasks"}>
                    <ListItemIcon><Task /></ListItemIcon>
                    <ListItemText primary="Tasks" />
                </ListItemButton>
                <ListItemButton>
                    <ListItemIcon><AvatarGroup /></ListItemIcon>
                    <ListItemText primary="Users" />
                </ListItemButton>
                <ListItemButton>
                    <ListItemIcon><Settings /></ListItemIcon>
                    <ListItemText primary="Settings" />
                </ListItemButton>
            </List>
        </Drawer>
    )
};

export default SideNav;
