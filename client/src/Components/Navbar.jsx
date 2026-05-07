import React, { useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import { assets } from "../assets/assets";
import { useAppContext } from "../Context/AppContext";
import toast from "react-hot-toast";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Badge,
  Box,
  InputBase,
  Menu,
  MenuItem,
  Avatar,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  styled,
  alpha
} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.black, 0.05),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.black, 0.1),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.text.secondary,
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '25ch',
    },
  },
}));

const NavButton = styled(Button)(({ theme }) => ({
  textTransform: 'none',
  fontWeight: 500,
  color: theme.palette.text.primary,
  '&.active': {
    color: theme.palette.primary.main,
  },
  '&:hover': {
    backgroundColor: 'transparent',
    color: theme.palette.primary.main,
  },
}));

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  
  const {
    user,
    setUser,
    SetShowUserLogin,
    navigate,
    searchQuery,
    SetSearchQuery,
    getCartCount,
    axios
  } = useAppContext();

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logout = async () => {
    try {
      const { data } = await axios.get('/api/user/logout')
      if(data.success){
        toast.success(data.message)
        setUser(null);
        handleClose();
        navigate("/");
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  };

  useEffect(() => {
    if (searchQuery.length > 0) {
      navigate("/products");
    }
  }, [searchQuery]);

  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'Products', path: '/products' },
    { label: 'About', path: '/about' },
    { label: 'Contact', path: '/contact' },
    { label: 'Seller', path: '/seller' },
  ];

  const drawer = (
    <Box sx={{ width: 250 }} onClick={() => setMobileOpen(false)}>
      <List>
        {navItems.map((item) => (
          <ListItem key={item.label} disablePadding>
            <ListItemButton component={NavLink} to={item.path}>
              <ListItemText primary={item.label} />
            </ListItemButton>
          </ListItem>
        ))}
        {user && (
          <ListItem disablePadding>
            <ListItemButton onClick={() => navigate("my-orders")}>
              <ListItemText primary="My Orders" />
            </ListItemButton>
          </ListItem>
        )}
      </List>
      <Box sx={{ p: 2 }}>
        {!user ? (
          <Button 
            fullWidth 
            variant="contained" 
            onClick={() => SetShowUserLogin(true)}
          >
            Sign In
          </Button>
        ) : (
          <Button 
            fullWidth 
            variant="outlined" 
            onClick={logout}
          >
            Sign Out
          </Button>
        )}
      </Box>
    </Box>
  );

  return (
    <AppBar position="sticky" color="inherit" elevation={0} sx={{ borderBottom: '1px solid', borderColor: 'divider', bgcolor: 'rgba(255, 255, 255, 0.9)', backdropFilter: 'blur(8px)' }}>
      <Toolbar sx={{ justifyContent: 'space-between', maxWidth: 'lg', width: '100%', mx: 'auto' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={() => setMobileOpen(true)}
            sx={{ mr: 2, display: { md: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          
          <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Box sx={{ 
              width: 32, 
              height: 32, 
              borderRadius: 1, 
              bgcolor: 'primary.main', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center' 
            }}>
              <Typography variant="body2" sx={{ color: 'white', fontWeight: 'bold' }}>Q</Typography>
            </Box>
            <Typography 
              variant="h6" 
              component="span" 
              sx={{ 
                fontWeight: 'bold', 
                background: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                display: { xs: 'none', sm: 'block' }
              }}
            >
              Quickmart
            </Typography>
          </Link>
        </Box>

        <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 1 }}>
          {navItems.map((item) => (
            <NavButton 
              key={item.label} 
              component={NavLink} 
              to={item.path}
            >
              {item.label}
            </NavButton>
          ))}
          
          <Search>
            <SearchIconWrapper>
              <SearchIcon fontSize="small" />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search products..."
              inputProps={{ 'aria-label': 'search' }}
              onChange={(e) => SetSearchQuery(e.target.value)}
            />
          </Search>

          <IconButton onClick={() => navigate("/cart")} color="inherit">
            <Badge badgeContent={getCartCount()} color="primary">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>

          {!user ? (
            <Button 
              variant="contained" 
              onClick={() => SetShowUserLogin(true)}
              sx={{ ml: 2, borderRadius: 2, px: 3 }}
            >
              Sign In
            </Button>
          ) : (
            <Box sx={{ ml: 2 }}>
              <IconButton
                onClick={handleMenu}
                color="inherit"
              >
                <Avatar 
                  src={assets.profile_icon} 
                  sx={{ width: 32, height: 32 }}
                />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
              >
                <MenuItem onClick={() => { handleClose(); navigate("my-orders"); }}>My Orders</MenuItem>
                <MenuItem onClick={logout}>Sign Out</MenuItem>
              </Menu>
            </Box>
          )}
        </Box>

        <Box sx={{ display: { md: 'none' }, alignItems: 'center' }}>
          <IconButton onClick={() => navigate("/cart")} color="inherit">
            <Badge badgeContent={getCartCount()} color="primary">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
        </Box>
      </Toolbar>

      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 250 },
        }}
      >
        {drawer}
      </Drawer>
    </AppBar>
  );
};

export default Navbar;
