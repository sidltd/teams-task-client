import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { useAuth } from "../providers/AuthContext";

const TopBar = () => {
  const {logout} = useAuth();

  return (
    <AppBar
      position="fixed"
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6">
          Teams Task Management
        </Typography>

        <Box>
          <Button color="inherit" onClick={logout}>
            Logout
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
