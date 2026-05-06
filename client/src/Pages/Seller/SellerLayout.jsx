import React from "react";
import { Box, Typography, Button, Stack } from "@mui/material";
import { Link, Outlet, NavLink } from "react-router-dom";
import { useAppContext } from "../../Context/AppContext";
import { assets } from "../../assets/assets";
import toast from "react-hot-toast";

const SellerLayout = () => {
  const { axios, navigate, setIsSeller, sellerProfile, setSellerProfile } = useAppContext();

  const sidebarLinks = [
    { name: "Admin Profile ", path: "/seller/dashboard", icon: assets.profile_icon },
    { name: "Add product", path: "/seller/dashboard/add-product", icon: assets.add_icon },
    {
      name: "Product List",
      path: "/seller/dashboard/product-list",
      icon: assets.product_list_icon,
    },
    { name: "Orders", path: "/seller/dashboard/orders", icon: assets.order_icon },
  ];

  const logout = async () => {
    try {
      const { data } = await axios.get("/api/seller/logout");
      if (data.success) {
        toast.success(data.message);
        setIsSeller(false);
        setSellerProfile(null);
        navigate("/");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ px: { xs: 2, md: 4 }, py: 2, borderBottom: 1, borderColor: "grey.300", bgcolor: "background.paper" }}>
        <Link to="/" style={{ textDecoration: "none" }}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 800,
              background: "linear-gradient(90deg, #2563eb 0%, #7c3aed 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Quickmart
          </Typography>
        </Link>
        <Stack direction="row" alignItems="center" spacing={3} sx={{ color: "text.secondary" }}>
          <Typography variant="body2">Hi! {sellerProfile?.name || "Admin"}</Typography>
          <Button variant="outlined" size="small" onClick={logout} sx={{ borderRadius: 999, textTransform: "none" }}>
            Logout
          </Button>
        </Stack>
      </Stack>

      <Stack direction="row" sx={{ minHeight: "calc(100vh - 57px)" }}>
        <Box
          sx={{
            width: { xs: 64, md: 256 },
            borderRight: 1,
            borderColor: "grey.300",
            pt: 2,
            flexShrink: 0,
          }}
        >
          {sidebarLinks.map((item) => (
            <NavLink key={item.name} to={item.path} end={item.path === "/seller/dashboard"} style={{ textDecoration: "none" }}>
              {({ isActive }) => (
                <Stack
                  direction="row"
                  alignItems="center"
                  spacing={2}
                  sx={{
                    py: 1.5,
                    px: 2,
                    borderRight: { md: isActive ? "6px solid" : "6px solid transparent" },
                    borderColor: { md: isActive ? "primary.main" : "transparent" },
                    bgcolor: isActive ? "rgba(37,99,235,0.08)" : "transparent",
                    color: isActive ? "primary.main" : "text.primary",
                    "&:hover": { bgcolor: "rgba(0,0,0,0.04)" },
                  }}
                >
                  <Box component="img" src={item.icon} alt="" sx={{ width: 28, height: 28 }} />
                  <Typography sx={{ display: { xs: "none", md: "block" } }} variant="body2">
                    {item.name}
                  </Typography>
                </Stack>
              )}
            </NavLink>
          ))}
        </Box>
        <Box sx={{ flex: 1, overflow: "auto" }}>
          <Outlet />
        </Box>
      </Stack>
    </>
  );
};

export default SellerLayout;
