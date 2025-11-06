import { Alert, Snackbar, type AlertColor } from "@mui/material";
import { createContext, useContext, useState } from "react";

const AUTO_HIDE_DURATION = 3000;

type SnackbarContextType = {
    showSnackbar: (message: string, severity: AlertColor) => void
}

const SnackbarContext = createContext<SnackbarContextType>({
    showSnackbar: () => {}
});

export const useSnackbar = () => useContext(SnackbarContext)

export const SnackbarProvider = ({children}: any) => {
    const [message, setMessage] = useState("");
    const [open, setOpen] = useState(false);
    const [severity, setSeverity] = useState<AlertColor>('info');

    const showSnackbar = (message: string, severity: AlertColor) => {
        setMessage(message);
        setSeverity(severity);
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    return (
        <SnackbarContext.Provider value={{showSnackbar}}>
            <Snackbar
                open={open}
                message={message}
                autoHideDuration={AUTO_HIDE_DURATION}
                onClose={handleClose}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}>
                    <Alert
                        onClose={handleClose}
                        variant="filled"
                        severity={severity}>
                        {message}
                    </Alert>
            </Snackbar>
            {children}
        </SnackbarContext.Provider>
    )
};
