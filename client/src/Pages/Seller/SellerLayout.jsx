import React from "react";
import { useAppContext } from "../../Context/AppContext";
import { assets } from "../../assets/assets";
import { Link, Outlet, NavLink } from "react-router-dom";
import toast from "react-hot-toast";
import { 
  Box, 
  Typography, 
  Button, 
  Divider, 
  List, 
  ListItem, 
  ListItemButton, 
  ListItemIcon, 
  ListItemText, 
  AppBar, 
  Toolbar,
  Avatar,
  styled
} from "@mui/material";
import LogoutIcon from '@mui/icons-material/Logout';

const StyledNavLink = styled(NavLink)(({ theme }) => ({
  textDecoration: 'none',
  color: theme.palette.text.primary,
  display: 'flex',
  alignItems: 'center',
  padding: '12px 16px',
  gap: '12px',
  transition: 'background-color 0.2s',
  '&:hover': {
    backgroundColor: 'rgba(0, 0, 0, 0.04)',
  },
  '&.active': {
    backgroundColor: 'rgba(37, 99, 235, 0.08)',
    color: '#2563eb',
    borderRight: '4px solid #2563eb',
    '& .MuiListItemIcon-root': {
      color: '#2563eb',
    },
    '& .MuiTypography-root': {
      fontWeight: 600,
    }
  },
}));

const SellerLayout = () => {
  const { axios, navigate, setIsSeller, sellerProfile, setSellerProfile } = useAppContext();

  const sidebarLinks = [
    { name: "Admin Profile", path: "/seller/dashboard", icon: assets.profile_icon },
    { name: "Add product", path: "/seller/dashboard/add-product", icon: assets.add_icon },
    { name: "Product List", path: "/seller/dashboard/product-list", icon: assets.product_list_icon },
    { name: "Orders", path: "/seller/dashboard/orders", icon: assets.order_icon },
    // { name: "User-list", path: "/seller/dashboard/user-list", icon: assets.product_list_icon },
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
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh', bgcolor: 'background.default' }}>
      <AppBar position="static" color="inherit" elevation={0} sx={{ borderBottom: '1px solid', borderColor: 'divider' }}>
        <Toolbar sx={{ justifyContent: 'space-between', px: { xs: 2, md: 4 } }}>
          <Link to="/" style={{ textDecoration: 'none' }}>
            <Typography 
              variant="h6" 
              component="span" 
              sx={{ 
                fontWeight: 'bold', 
                background: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Quickmart
            </Typography>
          </Link>
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography variant="body2" color="text.secondary">
              Hi! {sellerProfile?.name || 'Admin'}
            </Typography>
            <Button 
              variant="outlined" 
              size="small" 
              onClick={logout}
              startIcon={<LogoutIcon />}
              sx={{ borderRadius: 50, textTransform: 'none' }}
            >
              Logout
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      <Box sx={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        <Box 
          component="nav" 
          sx={{ 
            width: { xs: 64, md: 256 }, 
            borderRight: '1px solid', 
            borderColor: 'divider',
            bgcolor: 'white',
            display: 'flex',
            flexDirection: 'column',
            pt: 2
          }}
        >
          <List disablePadding>
            {sidebarLinks.map((item) => (
              <ListItem key={item.name} disablePadding sx={{ display: 'block' }}>
                <StyledNavLink 
                  to={item.path} 
                  end={item.path === "/seller/dashboard"}
                >
                  <ListItemIcon sx={{ minWidth: 0, mr: { md: 2 } }}>
                    <Avatar 
                      src={item.icon} 
                      sx={{ width: 28, height: 28, borderRadius: 0 }} 
                      variant="square"
                    />
                  </ListItemIcon>
                  <ListItemText 
                    primary={item.name} 
                    sx={{ display: { xs: 'none', md: 'block' } }} 
                  />
                </StyledNavLink>
              </ListItem>
            ))}
          </List>
        </Box>

        <Box component="main" sx={{ flexGrow: 1, p: 3, overflowY: 'auto' }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default SellerLayout;
