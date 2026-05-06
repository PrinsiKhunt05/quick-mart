import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  TextField,
  InputAdornment,
  IconButton,
  Button,
  Badge,
  Menu,
  MenuItem,
  Collapse,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { MdMenu } from "react-icons/md";
import { assets } from "../assets/assets";
import { useAppContext } from "../Context/AppContext";
import toast from "react-hot-toast";

const linkSx = (isActive) => ({
  fontWeight: 500,
  textDecoration: "none",
  color: isActive ? "primary.main" : "text.primary",
  "&:hover": { color: "primary.main" },
  transition: "color 0.2s",
});

const Navbar = () => {
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const {
    user,
    setUser,
    SetShowUserLogin,
    navigate,
    searchQuery,
    SetSearchQuery,
    getCartCount,
    axios,
  } = useAppContext();

  const logout = async () => {
    try {
      const { data } = await axios.get("/api/user/logout");
      if (data.success) {
        toast.success(data.message);
        setUser(null);
        navigate("/");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
    setAnchorEl(null);
  };

  useEffect(() => {
    if (searchQuery.length > 0) {
      navigate("/products");
    }
  }, [searchQuery]);

  const gradientBtnSx = {
    background: "linear-gradient(90deg, #2563eb 0%, #7c3aed 100%)",
    color: "#fff",
    fontWeight: 600,
    textTransform: "none",
    borderRadius: 2,
    px: 3,
    py: 1,
    "&:hover": {
      background: "linear-gradient(90deg, #1d4ed8 0%, #6d28d9 100%)",
      boxShadow: 3,
      transform: "translateY(-1px)",
    },
    transition: "all 0.2s",
  };

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        bgcolor: "rgba(255,255,255,0.9)",
        backdropFilter: "blur(12px)",
        borderBottom: 1,
        borderColor: "grey.100",
        color: "text.primary",
      }}
    >
      <Toolbar sx={{ maxWidth: 1280, width: "100%", mx: "auto", px: { xs: 2, sm: 3 } }}>
        <Box
          component={NavLink}
          to="/"
          onClick={() => setOpen(false)}
          sx={{ display: "flex", alignItems: "center", gap: 1, textDecoration: "none", mr: "auto" }}
        >
          <Box
            sx={{
              width: 32,
              height: 32,
              borderRadius: 1,
              background: "linear-gradient(90deg, #2563eb 0%, #7c3aed 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography sx={{ color: "#fff", fontWeight: 800, fontSize: "0.875rem" }}>Q</Typography>
          </Box>
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
        </Box>

        {isMdUp && (
          <Box sx={{ display: "flex", alignItems: "center", gap: 4, flexGrow: 1, justifyContent: "center" }}>
            <NavLink to="/" style={{ textDecoration: "none" }}>
              {({ isActive }) => (
                <Typography component="span" sx={linkSx(isActive)}>
                  Home
                </Typography>
              )}
            </NavLink>
            <NavLink to="/products" style={{ textDecoration: "none" }}>
              {({ isActive }) => (
                <Typography component="span" sx={linkSx(isActive)}>
                  Products
                </Typography>
              )}
            </NavLink>
            <NavLink to="/about" style={{ textDecoration: "none" }}>
              {({ isActive }) => (
                <Typography component="span" sx={linkSx(isActive)}>
                  About
                </Typography>
              )}
            </NavLink>
            <NavLink to="/contact" style={{ textDecoration: "none" }}>
              {({ isActive }) => (
                <Typography component="span" sx={linkSx(isActive)}>
                  Contact
                </Typography>
              )}
            </NavLink>
            {/* <NavLink to="/seller" style={{ textDecoration: "none" }}>
              {({ isActive }) => (
                <Typography component="span" sx={linkSx(isActive)}>
                  Seller
                </Typography>
              )}
            </NavLink> */}

            <TextField
              size="small"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => SetSearchQuery(e.target.value)}
              sx={{ width: 288 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Box component="img" src={assets.search_icon} alt="" sx={{ width: 16, height: 16, opacity: 0.5 }} />
                  </InputAdornment>
                ),
              }}
            />

            <IconButton onClick={() => navigate("/cart")} sx={{ borderRadius: 2 }}>
              <Badge badgeContent={getCartCount() > 0 ? getCartCount() : 0} color="primary" invisible={getCartCount() === 0}>
                <Box component="img" src={assets.nav_cart_icon} alt="cart" sx={{ width: 24, height: 24 }} />
              </Badge>
            </IconButton>

            {!user ? (
              <Button onClick={() => SetShowUserLogin(true)} sx={gradientBtnSx}>
                Sign In
              </Button>
            ) : (
              <>
                <Button
                  onClick={(e) => setAnchorEl(e.currentTarget)}
                  sx={{ textTransform: "none", color: "text.primary", borderRadius: 2 }}
                  startIcon={
                    <Box component="img" src={assets.profile_icon} alt="" sx={{ width: 32, height: 32, borderRadius: "50%" }} />
                  }
                >
                  {user.name}
                </Button>
                <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)}>
                  <MenuItem
                    onClick={() => {
                      navigate("/my-orders");
                      setAnchorEl(null);
                    }}
                  >
                    My Orders
                  </MenuItem>
                  <MenuItem onClick={logout}>Sign Out</MenuItem>
                </Menu>
              </>
            )}
          </Box>
        )}

        {!isMdUp && (
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <IconButton onClick={() => navigate("/cart")}>
              <Badge badgeContent={getCartCount() > 0 ? getCartCount() : 0} color="error" invisible={getCartCount() === 0}>
                <Box component="img" src={assets.nav_cart_icon} alt="cart" sx={{ width: 24, height: 24 }} />
              </Badge>
            </IconButton>
            <IconButton onClick={() => setOpen(!open)}>
              <MdMenu />
            </IconButton>
          </Box>
        )}
      </Toolbar>

      <Collapse in={open && !isMdUp}>
        <Box sx={{ borderTop: 1, borderColor: "grey.100", py: 2, px: 2 }}>
          {[
            ["/", "Home"],
            ["/products", "Products"],
            ["/about", "About"],
            ["/contact", "Contact"],
            ["/seller", "Seller"],
          ].map(([to, label]) => (
            <NavLink key={to} to={to} onClick={() => setOpen(false)} style={{ textDecoration: "none" }}>
              {({ isActive }) => (
                <Box sx={{ px: 2, py: 1, borderRadius: 2, bgcolor: isActive ? "action.selected" : "transparent" }}>
                  <Typography sx={{ ...linkSx(isActive), display: "block" }}>{label}</Typography>
                </Box>
              )}
            </NavLink>
          ))}
          {user && (
            <NavLink to="/my-orders" onClick={() => setOpen(false)} style={{ textDecoration: "none" }}>
              {({ isActive }) => (
                <Box sx={{ px: 2, py: 1, borderRadius: 2 }}>
                  <Typography sx={{ ...linkSx(isActive), display: "block" }}>My Orders</Typography>
                </Box>
              )}
            </NavLink>
          )}
          <Box sx={{ px: 2, pt: 1 }}>
            {!user ? (
              <Button
                fullWidth
                onClick={() => {
                  setOpen(false);
                  SetShowUserLogin(true);
                }}
                sx={gradientBtnSx}
              >
                Sign In
              </Button>
            ) : (
              <Button fullWidth onClick={logout} sx={gradientBtnSx}>
                Sign Out
              </Button>
            )}
          </Box>
        </Box>
      </Collapse>
    </AppBar>
  );
};

export default Navbar;
