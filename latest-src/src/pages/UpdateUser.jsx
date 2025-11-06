import React,{useState} from "react";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Alert,
  CircularProgress,
} from "@mui/material";
import {useNavigate,useParams} from "react-router-dom";
import axios from "axios";

const UpdateUser = () => {
  const navigate = useNavigate();
  const {id} = useParams();
  const [firstName,setFirstName]= useState("")
  const [lastName,setLastName]= useState("")
  const [email,setEmail]= useState("")
  const [phoneNumber,setPhoneNumber]= useState("")
  const [address,setAddress]= useState("")
  const [loading,setLoading]= useState(false)
  const [error,setError]= useState(false)


  const payload ={firstName,lastName,email,address,phoneNumber}
  const handleUpdate = async(e) =>{
    e.preventDefault()
    setLoading(true)
    try {
      const res = await 
      axios.put(`https://students-learning-api.onrender.com/api/auth/update/${id}`,payload);
      console.log(res.data);
      setLoading(false)
      navigate('/users')
     //setTimeout(()=> navigate(-1),1500) 
    } catch (error) {
      console.error(error)
      setError(error)
      setLoading(false)
       }
  }


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

        <Alert severity="info" sx={{ mb: 2 }}>
          Message goes here
        </Alert>

        <form onSubmit={handleUpdate}>
          <TextField
            label="First Name"
            name="firstName"
            value={firstName}
            onChange={(e) =>setFirstName(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Last Name"
            name="lastName"
            value={lastName}
            onChange={(e)=> setLastName(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField label="Email" 
          name="email"
          value={email}
          onChange={(e) =>setEmail(e.target.value)} 
          fullWidth
           margin="normal" />

           <TextField
            label="address"
            name="address"
            fullWidth
            value={address}
            onChange={(e) =>setAddress(e.target.value)} 
            margin="normal"
          />
          <TextField
            label="phoneNumber"
            name="phoneNumber"
            value={phoneNumber}
            onChange={(e) =>setPhoneNumber(e.target.value)} 
            fullWidth
            margin="normal"
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
            disabled = {loading}
          >
            {loading?<CircularProgress/>:" Update"}
           
          </Button>

          <Button variant="outlined"
           fullWidth sx={{ mt: 1 }}
           onClick={()=>navigate(-1)}>
            Cancel
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default UpdateUser;