import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { Box, Typography, Button, Stack } from "@mui/material";
import { MdArrowForward, MdChevronRight } from "react-icons/md";

const MainBanner = () => {
  const trust = [
    { label: "Quality Guaranteed", icon: "M10 18a8 8 0 100-16 8 8 0 000 16z" },
    { label: "Fast Delivery", icon: "M3 3h14l-1 9H4L3 3zm5 12a2 2 0 104 0H8z" },
    { label: "Best Prices", icon: "M5 6h10v2H5V6zm0 4h10v2H5v-2zm0 4h6v2H5v-2z" },
  ];

  return (
    <Box
      component="section"
      className="gradient-bg"
      sx={{
        position: "relative",
        borderRadius: 4,
        overflow: "hidden",
        mt: 3,
        boxShadow: 6,
      }}
      aria-label="Main promotional banner"
    >
      <Box
        sx={{
          position: "relative",
          height: { xs: 500, md: 600 },
        }}
      >
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to bottom right, rgba(30,58,138,0.35), rgba(88,28,135,0.45), rgba(67,56,202,0.35))",
          }}
        />
        <Box sx={{ position: "absolute", top: 48, left: 48, width: 96, height: 96, bgcolor: "rgba(255,255,255,0.1)", borderRadius: "50%", filter: "blur(40px)" }} />
        <Box sx={{ position: "absolute", bottom: 64, right: 64, width: 128, height: 128, bgcolor: "rgba(255,255,255,0.1)", borderRadius: "50%", filter: "blur(48px)" }} />
      </Box>

      <Box
        sx={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          px: { xs: 3, md: 6, lg: 10 },
          textAlign: "center",
        }}
      >
        <Box sx={{ maxWidth: "56rem", mx: "auto" }}>
          <Stack direction="row" alignItems="center" justifyContent="center" spacing={1} sx={{ display: "inline-flex", px: 2.5, py: 1, bgcolor: "rgba(255,255,255,0.2)", backdropFilter: "blur(12px)", borderRadius: 999, border: "1px solid rgba(255,255,255,0.35)", mb: 4, boxShadow: 3 }}>
            <Box sx={{ width: 10, height: 10, bgcolor: "#4ade80", borderRadius: "50%", animation: "pulse 2s infinite", "@keyframes pulse": { "0%,100%": { opacity: 1 }, "50%": { opacity: 0.6 } } }} />
            <Typography variant="body2" color="#fff" fontWeight={500}>
              Fresh groceries delivered in 30 minutes
            </Typography>
          </Stack>

          <Typography variant="h2" component="h1" sx={{ color: "#fff", fontWeight: 800, mb: 3, lineHeight: 1.1, fontSize: { xs: "2.25rem", md: "3.75rem", lg: "4.5rem" } }}>
            Freshness You
            <Box
              component="span"
              display="block"
              sx={{
                background: "linear-gradient(90deg, #fcd34d, #fdba74)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Can Trust
            </Box>
          </Typography>

          <Typography sx={{ fontSize: { xs: "1rem", md: "1.25rem" }, color: "rgba(255,255,255,0.92)", mb: 5, maxWidth: 640, mx: "auto", lineHeight: 1.7 }}>
            Discover premium quality groceries at unbeatable prices. Fast delivery, fresh products, and exceptional service.
          </Typography>

          <Stack direction={{ xs: "column", sm: "row" }} spacing={2} justifyContent="center" alignItems="center">
            <Button component={RouterLink} to="/products" variant="contained" color="inherit" size="large" endIcon={<MdArrowForward />} aria-label="Shop now" sx={{ px: 4, py: 2, borderRadius: 2, fontWeight: 700, fontSize: "1.125rem", minWidth: 200, bgcolor: "#fff", color: "#111827", "&:hover": { bgcolor: "#f3f4f6", transform: "translateY(-4px)" }, transition: "all 0.3s", boxShadow: 4 }}>
              Shop Now
            </Button>
            <Button
              component={RouterLink}
              to="/products"
              variant="outlined"
              size="large"
              endIcon={<MdChevronRight />}
              aria-label="Explore deals"
              sx={{
                px: 4,
                py: 2,
                borderRadius: 2,
                fontWeight: 700,
                fontSize: "1.125rem",
                minWidth: 200,
                color: "#fff",
                borderColor: "rgba(255,255,255,0.45)",
                bgcolor: "rgba(255,255,255,0.08)",
                backdropFilter: "blur(12px)",
                "&:hover": { borderColor: "rgba(255,255,255,0.7)", bgcolor: "rgba(255,255,255,0.15)", transform: "translateY(-4px)" },
                transition: "all 0.3s",
              }}
            >
              Explore Deals
            </Button>
          </Stack>

          <Stack direction={{ xs: "column", sm: "row" }} spacing={3} sx={{ mt: 7, maxWidth: 720, mx: "auto" }}>
            {trust.map((item, idx) => (
              <Box
                key={idx}
                sx={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  bgcolor: "rgba(255,255,255,0.12)",
                  backdropFilter: "blur(16px)",
                  borderRadius: 2,
                  p: 2,
                  border: "1px solid rgba(255,255,255,0.25)",
                  transition: "box-shadow 0.2s",
                  "&:hover": { boxShadow: 4 },
                }}
              >
                <Box component="svg" viewBox="0 0 20 20" fill="currentColor" sx={{ width: 32, height: 32, mb: 1, color: "#fcd34d" }}>
                  <path d={item.icon} />
                </Box>
                <Typography variant="body2" fontWeight={500} color="rgba(255,255,255,0.95)">
                  {item.label}
                </Typography>
              </Box>
            ))}
          </Stack>
        </Box>
      </Box>
    </Box>
  );
};

export default MainBanner;
