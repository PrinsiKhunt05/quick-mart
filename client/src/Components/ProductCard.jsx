import React from "react";
import { Box, Typography, Chip, IconButton, Button, Stack } from "@mui/material";
import { MdAdd, MdRemove } from "react-icons/md";
import { assets } from "../assets/assets";
import { useAppContext } from "../Context/AppContext";

const ProductCard = ({ product }) => {
  const { currency, addToCart, removeFromCart, cartItems, navigate } = useAppContext();

  const cardSx = {
    cursor: "pointer",
    bgcolor: "#fff",
    borderRadius: 3,
    border: "1px solid",
    borderColor: "grey.100",
    overflow: "hidden",
    transition: "all 0.3s",
    "&:hover": {
      boxShadow: 4,
      transform: "translateY(-4px)",
    },
  };

  return (
    product && (
      <Box
        onClick={() => {
          navigate(`/products/${product.category.toLowerCase()}/${product._id}`);
          scrollTo(0, 0);
        }}
        sx={cardSx}
      >
        <Box
          sx={{
            position: "relative",
            height: 192,
            background: "linear-gradient(to bottom right, #fafafa, #f3f4f6)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            p: 3,
          }}
        >
          <Box component="img" src={product.image[0]} alt={product.name} sx={{ maxHeight: 128, width: "auto", objectFit: "contain", transition: "transform 0.3s", "&:hover": { transform: "scale(1.05)" } }} />

          <Box sx={{ position: "absolute", top: 12, left: 12 }}>
            <Chip label={product.category} size="small" color="primary" variant="outlined" sx={{ fontWeight: 600, bgcolor: "rgba(37,99,235,0.08)" }} />
          </Box>

          {product.price > product.offerprice && (
            <Box sx={{ position: "absolute", top: 12, right: 12 }}>
              <Chip
                label={`${Math.round(((product.price - product.offerprice) / product.price) * 100)}% OFF`}
                size="small"
                color="error"
                variant="outlined"
                sx={{ bgcolor: "#fef2f2", fontWeight: 600 }}
              />
            </Box>
          )}
        </Box>

        <Box sx={{ p: 2 }}>
          <Typography variant="subtitle1" fontWeight={600} gutterBottom sx={{ display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden", "&:hover": { color: "primary.main" } }}>
            {product.name}
          </Typography>

          <Stack direction="row" alignItems="center" spacing={0.5} sx={{ mb: 1.5 }}>
            {[0, 1, 2, 3, 4].map((i) => (
              <Box
                key={i}
                component="svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                sx={{ width: 16, height: 16, color: i < 4 ? "#facc15" : "#e5e7eb" }}
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </Box>
            ))}
            <Typography variant="caption" color="text.secondary" sx={{ ml: 0.5 }}>
              (4.0)
            </Typography>
          </Stack>

          <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
            <Typography variant="h6" fontWeight={800}>
              {currency}
              {product.offerprice}
            </Typography>
            {product.price > product.offerprice && (
              <Typography variant="body2" color="text.secondary" sx={{ textDecoration: "line-through" }}>
                {currency}
                {product.price}
              </Typography>
            )}
          </Stack>

          {!cartItems[product._id] ? (
            <Button
              fullWidth
              variant="contained"
              onClick={(e) => {
                e.stopPropagation();
                addToCart(product._id);
              }}
              sx={{
                py: 1.5,
                borderRadius: 2,
                textTransform: "none",
                fontWeight: 600,
                background: "linear-gradient(90deg, #2563eb 0%, #7c3aed 100%)",
                "&:hover": {
                  background: "linear-gradient(90deg, #1d4ed8 0%, #6d28d9 100%)",
                  boxShadow: 4,
                },
              }}
              startIcon={<Box component="img" src={assets.nav_cart_icon} alt="" sx={{ width: 24, height: 24 }} />}
            >
              Add to Cart
            </Button>
          ) : (
            <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ bgcolor: "grey.50", borderRadius: 2, p: 1 }}>
              <IconButton
                size="small"
                onClick={(e) => {
                  e.stopPropagation();
                  removeFromCart(product._id);
                }}
                sx={{ bgcolor: "#fff", boxShadow: 1 }}
              >
                <MdRemove size={22} />
              </IconButton>
              <Typography fontWeight={700} sx={{ minWidth: 40, textAlign: "center" }}>
                {cartItems[product._id]}
              </Typography>
              <IconButton
                size="small"
                onClick={(e) => {
                  e.stopPropagation();
                  addToCart(product._id);
                }}
                sx={{ bgcolor: "#fff", boxShadow: 1 }}
              >
                <MdAdd size={22} />
              </IconButton>
            </Stack>
          )}
        </Box>
      </Box>
    )
  );
};

export default ProductCard;
