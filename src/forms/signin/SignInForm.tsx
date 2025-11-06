import { Box, Button, IconButton, InputAdornment, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { Visibility, VisibilityOff } from "@mui/icons-material";
import SignInSchema from "./schema";
import type { CredsType } from "../../providers/AuthContext";

type Props = {
    onSubmit: (values: CredsType) => void;
}

const SignInForm = ({onSubmit}: Props) => {
    const [showPassword, setShowPassword] = useState(false);
    const handleTogglePassword = () => setShowPassword((show) => !show);

    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm({
        resolver: zodResolver(SignInSchema),
        defaultValues: {
            email: '',
            password: ''
        } });

    return (
        <Box
            sx={{
                height: "100vh",
                width: "100vw",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#f5f5f5",
            }}
        >
            <Box
                sx={{
                    p: 4,
                    borderRadius: 2,
                    boxShadow: 3,
                    width: "100%",
                    maxWidth: 300,
                    bgcolor: "white",
                }}
            >
                <form onSubmit={handleSubmit(onSubmit)}>
                <Box>
                    <TextField
                        label="Email"
                        fullWidth
                        {...register("email")}
                    />
                    {errors.email && (
                    <Typography color="error" variant="subtitle2">
                        {errors.email.message}
                    </Typography>
                    )}
                </Box>

                <Box sx={{ mt: 3 }}>
                    <TextField
                        label="Password"
                        variant="outlined"
                        fullWidth
                        type={showPassword ? "text" : "password"}
                        {...register("password")}
                        InputProps={{
                            endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                onClick={handleTogglePassword}
                                edge="end"
                                aria-label="toggle password visibility"
                                >
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                            ),
                        }}
                    />
                    {errors.password && (
                    <Typography color="error" variant="subtitle2">
                        {errors.password.message}
                    </Typography>
                    )}
                </Box>

                <Box sx={{ mt: 3 }}>
                    <Button fullWidth type="submit" variant="contained">Login</Button>
                </Box>
                </form>
            </Box>
            </Box>
    )
}

export default SignInForm;
