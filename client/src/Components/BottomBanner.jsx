import React from "react";
import { Box, Typography, Stack } from "@mui/material";
import { assets, features } from "../assets/assets";

const BottomBanner = () => {
  return (
    <Box sx={{ position: "relative", mt: 12 }}>
      <Box component="img" src={assets.bottom_banner_image} alt="banner" sx={{ width: "100%", display: { xs: "none", md: "block" } }} />
      <Box component="img" src={assets.bottom_banner_image_sm} alt="banner" sx={{ width: "100%", display: { xs: "block", md: "none" } }} />

      <Box
        sx={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: { xs: "center", md: "flex-end" },
          justifyContent: { md: "center" },
          pt: { xs: 8, md: 5 },
          pr: { md: 5 },
        }}
      >
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 600, color: "primary.main", fontSize: { xs: "1.5rem", md: "1.75rem" } }}>
            Why We Are the Best?
          </Typography>
          {features.map((item, index) => (
            <Stack key={index} direction="row" alignItems="center" spacing={2} sx={{ mt: 2 }}>
              <Box component="img" src={item.icon} alt={item.title} sx={{ width: { xs: 36, md: 44 } }} />
              <Box>
                <Typography variant="h6" fontWeight={600} sx={{ fontSize: { xs: "1rem", md: "1.25rem" } }}>
                  {item.title}
                </Typography>
                <Typography variant="caption" color="text.secondary" sx={{ fontSize: { xs: "0.75rem", md: "0.875rem" } }}>
                  {item.description}
                </Typography>
              </Box>
            </Stack>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default BottomBanner;
