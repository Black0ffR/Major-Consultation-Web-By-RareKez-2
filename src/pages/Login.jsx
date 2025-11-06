import React, { useState, useEffect } from "react";
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import {
    Box,
    TextField,
    Button,
    Typography,
    Paper,
    InputAdornment,
    IconButton,
    Alert,
    CircularProgress,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
} from "@mui/material";
import { Visibility, VisibilityOff, LockOutlined } from "@mui/icons-material";
import { useAuth } from '../context/AuthContext';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [showSignupDialog, setShowSignupDialog] = useState(false);
    const { login, isAuthenticated } = useAuth();
    const navigate = useNavigate();
    useEffect(() => {
        if (isAuthenticated) {
            navigate('/', { replace: true });
        }
    }, [isAuthenticated, navigate]);
    const handleLogin = async (event) => {
        event.preventDefault();
        setLoading(true);
        setError(null);
        try {
            const result = await login(email, password);
            if (result.success) {
                setShowSignupDialog(false);
                navigate('/', { replace: true });
            } else {
                if (result.error && (result.error.includes('not found') || result.error.includes('does not exist'))) {
                    setShowSignupDialog(true);
                    setError("Account not found. Would you like to create a new account?");
                } else {
                    setError(result.error || "Login failed. Please check your credentials.");
                }
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };
    const handleCreateAccount = () => {
        navigate('/signup', { state: { email } });
        setShowSignupDialog(false);
    };
    const handleCloseDialog = () => {
        setShowSignupDialog(false);
        setError(null);
    };
    return (
        <Box
            sx={{
                minHeight: "100vh",
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundImage: 'url(https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80)',
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundAttachment: "fixed",
                marginLeft: "auto",
                marginRight: "auto",
                p: 2,
                position: "relative",
                '&::before': {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: "rgba(0, 0, 0, 0.3)",
                    backdropFilter: "blur(2px)",
                    zIndex: 1,
                },
            }}
        >
            <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%",
                    position: "relative",
                    zIndex: 2,
                }}
            >
                <Paper
                    elevation={10}
                    sx={{
                        p: { xs: 4, sm: 5 },
                        width: { xs: "90%", sm: 400 },
                        borderRadius: "20px",
                        textAlign: "center",
                        background: "rgba(255, 255, 255, 0.95)",
                        backdropFilter: "blur(10px)",
                        boxShadow: "0 10px 30px rgba(0, 0, 0, 0.3)",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                    }}
                >
                    {}
                    <Box
                        sx={{
                            width: 80,
                            height: 80,
                            borderRadius: "50%",
                            background: '#6B7280',
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            mx: "auto",
                            mb: 2,
                            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.5)",
                        }}
                    >
                        <LockOutlined sx={{ fontSize: 40, color: "#fff" }} />
                    </Box>
                    {}
                    <Typography
                        variant="h5"
                        fontWeight="bold"
                        sx={{ mb: 3, color: '#6B7280' }}
                    >
                        Welcome Back
                    </Typography>
                    {}
                    {error && !showSignupDialog && (
                        <Alert severity="error" sx={{ mb: 2, borderRadius: "12px" }}>
                            {error}
                        </Alert>
                    )}
                    <Box component="form" onSubmit={handleLogin} sx={{ width: '100%' }}>
                        {}
                        <TextField
                            fullWidth
                            label="Email"
                            type="email"
                            variant="outlined"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            disabled={loading}
                            sx={{
                                mb: 2,
                                "& .MuiOutlinedInput-root": { borderRadius: "12px" },
                            }}
                        />
                        {}
                        <TextField
                            fullWidth
                            label="Password"
                            type={showPassword ? "text" : "password"}
                            variant="outlined"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            disabled={loading}
                            sx={{
                                mb: 3,
                                "& .MuiOutlinedInput-root": { borderRadius: "12px" },
                            }}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={() => setShowPassword(!showPassword)}
                                            onMouseDown={(e) => e.preventDefault()}
                                            disabled={loading}
                                            aria-label="toggle password visibility"
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                        {}
                        <Button
                            fullWidth
                            variant="contained"
                            size="large"
                            type="submit"
                            disabled={loading || !email || !password}
                            sx={{
                                py: 1.4,
                                fontWeight: "bold",
                                borderRadius: "12px",
                                textTransform: "none",
                                fontSize: "1rem",
                                background: "#6B7280",
                                boxShadow: "0 4px 20px rgba(0, 0, 0, 0.5)",
                                "&:hover": {
                                    background: "#5A6169",
                                },
                            }}
                        >
                            {loading ? (
                                <CircularProgress size={24} sx={{ color: '#fff' }} />
                            ) : (
                                "Login"
                            )}
                        </Button>
                    </Box>
                    {}
                    <Typography
                        variant="body2"
                        sx={{ mt: 3, color: "text.secondary", textAlign: "center" }}
                    >
                        Don't have an account?{" "}
                        <RouterLink
                            to="/signup"
                            style={{
                                color: "rgba(8, 20, 120, 1)",
                                fontWeight: 600,
                                textDecoration: "none",
                            }}
                        >
                            Sign up
                        </RouterLink>
                    </Typography>
                </Paper>
            </motion.div>
            {}
            <Dialog
                open={showSignupDialog}
                onClose={handleCloseDialog}
                aria-labelledby="signup-dialog-title"
                sx={{ zIndex: 1400 }}
            >
                <DialogTitle id="signup-dialog-title" sx={{ textAlign: 'center', color: '#6B7280' }}>
                    Account Not Found
                </DialogTitle>
                <DialogContent>
                    <Typography>
                        We couldn't find an account with that email address. Would you like to create a new account?
                    </Typography>
                </DialogContent>
                <DialogActions sx={{ justifyContent: 'center', flexDirection: 'column', gap: 1 }}>
                    <Button
                        variant="contained"
                        onClick={handleCreateAccount}
                        sx={{
                            background: "#6B7280",
                            "&:hover": { background: "#5A6169" },
                            minWidth: 150,
                        }}
                    >
                        Create Account
                    </Button>
                    <Button onClick={handleCloseDialog} sx={{ color: '#6B7280' }}>
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};
export default Login;
