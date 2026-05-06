import React from "react";
import { Box, Typography, TextField, Button, Stack } from "@mui/material";

const NewLetter = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", mt: 10, pb: 7 }}>
      <Typography variant="h4" fontWeight={600} sx={{ fontSize: { xs: "1.5rem", md: "2.125rem" } }}>
        Never Miss a Deal!
      </Typography>
      <Typography color="text.secondary" sx={{ mt: 1, mb: 4, fontSize: { xs: "1rem", md: "1.125rem" } }}>
        Subscribe to get the latest offers, new arrivals, and exclusive discounts
      </Typography>
      <Stack
        direction="row"
        component="form"
        sx={{ width: "100%", maxWidth: 640, height: { xs: 48, md: 52 }, border: 1, borderColor: "grey.400", borderRadius: 1, overflow: "hidden" }}
        onSubmit={(e) => e.preventDefault()}
      >
        <TextField
          placeholder="Enter your email id"
          required
          fullWidth
          variant="standard"
          InputProps={{ disableUnderline: true }}
          sx={{
            "& .MuiInputBase-root": { px: 1.5, height: "100%", bgcolor: "background.paper" },
            "& .MuiInputBase-input": { color: "text.secondary" },
          }}
        />
        <Button type="submit" variant="contained" color="primary" sx={{ borderRadius: 0, px: { xs: 4, md: 6 }, minWidth: 120, textTransform: "none", fontWeight: 600 }}>
          Subscribe
        </Button>
      </Stack>
    </Box>
  );
};

export default NewLetter;
