import React, { useState, useEffect } from "react";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Alert,
  CircularProgress,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const UpdateUser = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const payload = { firstName, lastName, email, address, phoneNumber };
  useEffect(() => {
    const fetchUser = async () => {
      if (!id) {
        setError("No user ID provided");
        return;
      }
      try {
        const res = await axios.get(`https://students-learning-api.onrender.com/api/auth/${id}`);
        const userData = res.data;
        setFirstName(userData.firstName || "");
        setLastName(userData.lastName || "");
        setEmail(userData.email || "");
        setPhoneNumber(userData.phoneNumber || "");
        setAddress(userData.address || "");
        setError(null);
      } catch (err) {
        console.error(err);
        setError(err.response?.data?.message || err.message || "Failed to load user data");
      }
    };
    fetchUser();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      const res = await axios.put(
        `https://students-learning-api.onrender.com/api/auth/update/${id}`,
        payload
      );
      console.log(res.data);
      setSuccess("User updated successfully!");
      setLoading(false);
      setTimeout(() => navigate('/users'), 1500);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || err.message || "Failed to update user");
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f5f5f5",
        p: 2,
      }}
    >
      <Paper
        elevation={4}
        sx={{
          p: 4,
          width: "100%",
          maxWidth: 400,
          borderRadius: 3,
          textAlign: "center",
        }}
      >
        <Typography variant="h5" gutterBottom fontWeight="bold">
          Update User
        </Typography>

        {}
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        {success && (
          <Alert severity="success" sx={{ mb: 2 }}>
            {success}
          </Alert>
        )}

        <form onSubmit={handleUpdate}>
          <TextField
            label="First Name"
            name="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Last Name"
            name="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Email"
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Address"
            name="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Phone Number"
            name="phoneNumber"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            fullWidth
            margin="normal"
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : "Update"}
          </Button>
          <Button
            variant="outlined"
            fullWidth
            sx={{ mt: 1 }}
            onClick={() => navigate(-1)}
            disabled={loading}
          >
            Cancel
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default UpdateUser;