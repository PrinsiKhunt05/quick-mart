import React, { useEffect, useState } from "react";
import { Box, Typography, TextField, Button, Stack } from "@mui/material";
import { assets } from "../assets/assets";
import { useAppContext } from "../Context/AppContext";
import toast from "react-hot-toast";

const InputField = ({ type, placeholder, name, handleChange, address }) => (
  <TextField
    fullWidth
    size="small"
    type={type}
    placeholder={placeholder}
    name={name}
    onChange={handleChange}
    value={address[name]}
    required
    sx={{
      "& .MuiOutlinedInput-root": {
        color: "text.secondary",
      },
    }}
  />
);

const AddAddress = () => {
  const { axios, navigate, user, SetShowUserLogin } = useAppContext();

  const [address, setAddress] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddress((prevAddress) => ({
      ...prevAddress,
      [name]: value,
    }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post("/api/address/add", {
        address,
        userId: user._id,
      });

      if (data.success) {
        toast.success(data.message || "Address saved successfully");
        navigate("/cart");
      } else {
        toast.error(data.message || "Something went wrong");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    if (!user) {
      if (typeof SetShowUserLogin === "function") SetShowUserLogin(true);
      navigate("/cart");
    }
  }, [user]);

  return (
    <Box sx={{ mt: 8, pb: 8 }}>
      <Typography variant="h5" sx={{ fontSize: { xs: "1.5rem", md: "1.875rem" }, color: "text.secondary" }}>
        Add Shipping{" "}
        <Typography component="span" color="primary.main" fontWeight={600}>
          Address
        </Typography>
      </Typography>
      <Stack direction={{ xs: "column-reverse", md: "row" }} justifyContent="space-between" spacing={4} sx={{ mt: 5 }}>
        <Box sx={{ flex: 1, maxWidth: 448 }}>
          <Box component="form" onSubmit={onSubmitHandler} sx={{ mt: 3 }}>
            <Stack spacing={1.5}>
              <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                <InputField handleChange={handleChange} address={address} name="firstName" type="text" placeholder="First Name" />
                <InputField handleChange={handleChange} address={address} name="lastName" type="text" placeholder="Last Name" />
              </Stack>
              <InputField handleChange={handleChange} address={address} name="email" type="email" placeholder="Email address" />
              <InputField handleChange={handleChange} address={address} name="street" type="text" placeholder="Street" />
              <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                <InputField handleChange={handleChange} address={address} name="city" type="text" placeholder="City" />
                <InputField handleChange={handleChange} address={address} name="country" type="text" placeholder="Country" />
              </Stack>
              <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                <InputField handleChange={handleChange} address={address} name="zipcode" type="number" placeholder="Zip Code" />
                <InputField handleChange={handleChange} address={address} name="state" type="text" placeholder="State" />
              </Stack>
              <InputField handleChange={handleChange} address={address} name="phone" type="text" placeholder="Phone" />
              <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 3, py: 1.5, letterSpacing: 1 }}>
                Save address
              </Button>
            </Stack>
          </Box>
        </Box>
        <Box component="img" sx={{ mr: { md: 8 }, mb: { xs: 4, md: 0 }, alignSelf: { md: "flex-start" } }} src={assets.add_address_iamge} alt="add address" />
      </Stack>
    </Box>
  );
};

export default AddAddress;
