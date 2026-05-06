import React from "react";
import { Box, Typography, Paper, Stack, Grid, Chip } from "@mui/material";
import { MdCheckCircle } from "react-icons/md";
import { useAppContext } from "../../Context/AppContext";

/** Single default avatar for all sellers (no per-key “Admin One / Two / Three” photos). */
const DEFAULT_ADMIN_PHOTO =
  "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=400&fit=crop&crop=face";
const FALLBACK_AVATAR =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjNjc3NDhCIi8+CjxjaXJjbGUgY3g9IjEwMCIgY3k9IjgwIiByPSIzMCIgZmlsbD0iI0ZGRiIvPgo8cGF0aCBkPSJNNDAgMTgwQzQwIDE0MCA4MCAxMjAgMTAwIDEyMEMxMjAgMTIwIDE2MCAxNDAgMTYwIDE4MEg0MFoiIGZpbGw9IiNGRkYiLz4KPC9zdmc+";

const AdminProfile = () => {
  const { sellerProfile } = useAppContext();

  if (!sellerProfile) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography variant="h6">Admin</Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          Loading profile...
        </Typography>
      </Box>
    );
  }

  const handleImageError = (e) => {
    e.target.src = FALLBACK_AVATAR;
  };

  return (
    <Box sx={{ p: 3, width: "100%" }}>
      <Paper elevation={0} sx={{ borderRadius: 3, border: 1, borderColor: "grey.200", overflow: "hidden" }}>
        <Stack direction={{ xs: "column", md: "row" }} spacing={4} sx={{ p: { xs: 3, md: 4 }, alignItems: { xs: "center", md: "flex-start" } }}>
          <Box sx={{ position: "relative", width: { xs: 160, md: 208 }, height: { xs: 160, md: 208 }, flexShrink: 0 }}>
            <Box
              component="img"
              src={DEFAULT_ADMIN_PHOTO}
              alt={sellerProfile.name}
              onError={handleImageError}
              sx={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: 2, border: 1, borderColor: "grey.100", boxShadow: 3 }}
            />
            <Box
              sx={{
                position: "absolute",
                bottom: -8,
                right: -8,
                width: 36,
                height: 36,
                bgcolor: "success.main",
                borderRadius: "50%",
                border: "4px solid #fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <MdCheckCircle size={22} color="#fff" />
            </Box>
          </Box>

          <Box sx={{ flex: 1, width: "100%" }}>
            <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
              <Box>
                <Typography variant="h4" fontWeight={800}>
                  {sellerProfile.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                  {sellerProfile.role?.toUpperCase()}
                </Typography>
              </Box>
              <Chip label="Active" variant="outlined" color="success" size="small" sx={{ fontWeight: 600 }} />
            </Stack>

            <Grid container spacing={2} sx={{ mt: 2 }}>
              {[
                { label: "Email", val: sellerProfile.email },
                { label: "Permissions", val: "Full access to products and orders" },
                { label: "Last login", val: "Just now" },
              ].map((f) => (
                <Grid item xs={12} md={6} key={f.label}>
                  <Paper variant="outlined" sx={{ p: 2, borderRadius: 2 }}>
                    <Typography variant="caption" color="text.secondary" sx={{ textTransform: "uppercase", letterSpacing: 0.6 }}>
                      {f.label}
                    </Typography>
                    <Typography sx={{ mt: 0.5, fontWeight: 600 }}>{f.val}</Typography>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Stack>
      </Paper>
    </Box>
  );
};

export default AdminProfile;
