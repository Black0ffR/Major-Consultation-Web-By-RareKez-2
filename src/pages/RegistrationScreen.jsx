import React, { useState, useEffect, useCallback } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import {
    Box,
    TextField,
    Button,
    Typography,
    Paper,
    Alert,
    CircularProgress,
} from "@mui/material";
import { PersonAddOutlined } from "@mui/icons-material";
import { useAuth } from '../context/AuthContext';
import { motion } from "framer-motion";

const RegistrationScreen = () => {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        phoneNumber: "",
        address: ""
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const { register } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    useEffect(() => {
        if (location.state?.email) {
            setFormData(prev => ({ ...prev, email: location.state.email }));
        }
    }, [location.state]);
    const isFormValid = formData.firstName && formData.lastName && formData.email && formData.password;
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };
    const handleRegistration = useCallback(async (event) => {
        event.preventDefault();
        if (!isFormValid) {
            setError("Please fill out all required fields (First Name, Last Name, Email, Password).");
            return;
        }
        setLoading(true);
        setError(null);
        try {
            const result = await register(formData);
            if (result.success) {
                setSuccess(true);
                setTimeout(() => {
                    navigate('/login', { 
                        state: { 
                            message: 'Account created successfully! Please log in with your new credentials.',
                            type: 'success'
                        }
                    });
                }, 2000);
            } else {
                setError(result.error || "Registration failed. Please try again.");
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, [formData, isFormValid, register, navigate]);
    if (success) {
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
                    position: "relative",
                    p: 2,
                    '&::before': {
                        content: '""',
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: "rgba(0, 0, 0, 0.3)",
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
                            width: { xs: "90%", sm: 450 },
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
                        <Typography variant="h4" sx={{ mb: 3, color: '#059669' }}>
                            ✓ Account Created Successfully!
                        </Typography>
                        <Typography variant="body1" sx={{ mb: 3, color: '#6B7280' }}>
                            Your account has been created successfully. Redirecting to login page...
                        </Typography>
                        <CircularProgress sx={{ color: '#6B7280' }} />
                    </Paper>
                </motion.div>
            </Box>
        );
    }
    return (
        <Box
            sx={{
                minHeight: "100vh",
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: 'transparent',
                p: 2,
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
                        width: { xs: "90%", sm: 450 },
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
                        <PersonAddOutlined sx={{ fontSize: 40, color: "#fff" }} />
                    </Box>
                    {}
                    <Typography
                        variant="h5"
                        fontWeight="bold"
                        sx={{ mb: 3, color: '#6B7280' }}
                    >
                        Create Your Account
                    </Typography>
                    {}
                    {error && (
                        <Alert severity="error" sx={{ mb: 2, borderRadius: "12px" }}>
                            {error}
                        </Alert>
                    )}
                    <Box component="form" onSubmit={handleRegistration}>
                        <TextField
                            fullWidth
                            label="First Name"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            sx={{ mb: 2, "& .MuiOutlinedInput-root": { borderRadius: "12px" } }}
                            required
                            disabled={loading}
                        />
                        <TextField
                            fullWidth
                            label="Last Name"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            sx={{ mb: 2, "& .MuiOutlinedInput-root": { borderRadius: "12px" } }}
                            required
                            disabled={loading}
                        />
                        <TextField
                            fullWidth
                            label="Email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            sx={{ mb: 2, "& .MuiOutlinedInput-root": { borderRadius: "12px" } }}
                            required
                            disabled={loading}
                        />
                        <TextField
                            fullWidth
                            label="Password"
                            name="password"
                            type="password"
                            value={formData.password}
                            onChange={handleChange}
                            sx={{ mb: 2, "& .MuiOutlinedInput-root": { borderRadius: "12px" } }}
                            required
                            disabled={loading}
                        />
                        {}
                        <TextField
                            fullWidth
                            label="Phone Number (Optional)"
                            name="phoneNumber"
                            value={formData.phoneNumber}
                            onChange={handleChange}
                            sx={{ mb: 2, "& .MuiOutlinedInput-root": { borderRadius: "12px" } }}
                            disabled={loading}
                        />
                        <TextField
                            fullWidth
                            label="Address (Optional)"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            sx={{ mb: 3, "& .MuiOutlinedInput-root": { borderRadius: "12px" } }}
                            disabled={loading}
                        />
                        <Button
                            fullWidth
                            type="submit"
                            variant="contained"
                            size="large"
                            disabled={loading || !isFormValid}
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
                                "Create Account"
                            )}
                        </Button>
                    </Box>
                    {}
                    <Typography variant="body2" sx={{ mt: 3, color: "text.secondary", textAlign: "center" }}>
                        Already have an account?{" "}
                        <a
                            href="/login"
                            style={{
                                color: "rgba(8, 20, 120, 1)",
                                fontWeight: 600,
                                textDecoration: "none",
                            }}
                        >
                            Login
                        </a>
                    </Typography>
                </Paper>
            </motion.div>
        </Box>
    );
};
export default RegistrationScreen;
