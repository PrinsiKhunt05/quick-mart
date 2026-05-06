import React, { useEffect, useState } from "react";
import { Box, Paper, Typography, TextField, Button, Stack } from "@mui/material";
import { useAppContext } from "../../Context/AppContext";
import toast from "react-hot-toast";

const SellerLogin = () => {
  const { isSeller, setIsSeller, setSellerProfile, navigate, axios } = useAppContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axios.post("/api/seller/login", { email, password });
      if (data.success) {
        setIsSeller(true);
        if (data.profile) {
          setSellerProfile(data.profile);
        }
        navigate("/seller");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    if (isSeller) {
      navigate("/seller/dashboard");
    }
  }, [isSeller, navigate]);

  return (
    <Box component="form" onSubmit={onSubmitHandler} sx={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", typography: "body2", color: "text.secondary", p: 2 }}>
      <Paper elevation={8} sx={{ p: 4, py: 6, minWidth: { xs: "100%", sm: 352 }, maxWidth: 400, border: 1, borderColor: "grey.200" }}>
        <Stack spacing={2.5}>
          <Typography variant="h5" textAlign="center" fontWeight={500}>
            <Typography component="span" color="primary">
              Seller
            </Typography>{" "}
            Login
          </Typography>
          <TextField label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="enter your email" required fullWidth size="small" />
          <TextField label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="enter your password" required fullWidth size="small" />
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ py: 1.25, textTransform: "none" }}>
            Login
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
};

export default SellerLogin;
