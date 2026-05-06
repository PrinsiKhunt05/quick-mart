import React, { useEffect, useState } from "react";
import { Box, Typography, Button, Stack, Link as MuiLink } from "@mui/material";
import { Link as RouterLink, useParams } from "react-router-dom";
import { useAppContext } from "../Context/AppContext";
import { assets } from "../assets/assets";
import ProductCard from "../Components/ProductCard";

const ProductDetails = () => {
  const { products, currency, addToCart, navigate } = useAppContext();
  const { id } = useParams();

  const [relatedProduct, setRelatedProduct] = useState([]);
  const [thumbnail, setThumbnail] = useState(null);

  const product = products.find((item) => item._id === id);

  useEffect(() => {
    if (products.length > 0 && product) {
      let productsCopy = products.slice();
      productsCopy = productsCopy.filter((item) => product.category === item.category && item._id !== product._id);
      setRelatedProduct(productsCopy.slice(0, 5));
    }
  }, [products, product]);

  useEffect(() => {
    setThumbnail(product?.image[0] ? product.image[0] : null);
  }, [product]);

  if (!product) return null;

  return (
    <Box sx={{ mt: 6 }}>
      <Typography variant="body2" gutterBottom component="nav">
        <MuiLink component={RouterLink} to="/" underline="hover" color="inherit">
          Home
        </MuiLink>
        {" / "}
        <MuiLink component={RouterLink} to="/products" underline="hover" color="inherit">
          Products
        </MuiLink>
        {" / "}
        <MuiLink component={RouterLink} to={`/products/${product.category.toLowerCase()}`} underline="hover" color="inherit">
          {product.category}
        </MuiLink>
        {" / "}
        <Typography component="span" color="primary">
          {" "}
          {product.name}
        </Typography>
      </Typography>

      <Stack direction={{ xs: "column", md: "row" }} spacing={8} sx={{ mt: 2 }}>
        <Stack direction="row" spacing={2}>
          <Stack spacing={2}>
            {product.image.map((image) => (
              <Box
                key={image}
                onClick={() => setThumbnail(image)}
                sx={{
                  maxWidth: 96,
                  border: 1,
                  borderColor: "rgba(0,0,0,0.2)",
                  borderRadius: 1,
                  overflow: "hidden",
                  cursor: "pointer",
                }}
              >
                <Box component="img" src={image} alt="Thumbnail" sx={{ display: "block", width: "100%" }} />
              </Box>
            ))}
          </Stack>
          <Box sx={{ border: 1, borderColor: "rgba(0,0,0,0.2)", borderRadius: 1, overflow: "hidden", maxWidth: 400 }}>
            <Box component="img" src={thumbnail} alt="Selected product" sx={{ width: "100%", display: "block" }} />
          </Box>
        </Stack>

        <Box sx={{ flex: 1 }}>
          <Typography variant="h4" fontWeight={500}>
            {product.name}
          </Typography>

          <Stack direction="row" alignItems="center" spacing={0.5} sx={{ mt: 1 }}>
            {Array(5)
              .fill("")
              .map((_, i) => (
                <Box key={i} component="img" src={i < 4 ? assets.star_icon : assets.star_dull_icon} alt="star" sx={{ width: { xs: 14, md: 16 }, height: "auto" }} />
              ))}
            <Typography variant="body2" sx={{ ml: 1 }}>
              (4)
            </Typography>
          </Stack>

          <Box sx={{ mt: 3 }}>
            <Typography variant="body1" color="text.secondary" sx={{ textDecoration: "line-through" }}>
              MRP: {currency} {product.price}
            </Typography>
            <Typography variant="h5" fontWeight={500}>
              MRP: {currency} {product.offerprice}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              (inclusive of all taxes)
            </Typography>
          </Box>

          <Typography variant="subtitle1" fontWeight={600} sx={{ mt: 3 }}>
            About Product
          </Typography>
          <Box component="ul" sx={{ pl: 2, color: "text.secondary", mt: 1 }}>
            {product.description.map((desc) => (
              <li key={desc}>{desc}</li>
            ))}
          </Box>

          <Stack direction={{ xs: "column", sm: "row" }} spacing={2} sx={{ mt: 5 }}>
            <Button variant="contained" color="inherit" fullWidth sx={{ bgcolor: "grey.100", color: "text.primary", py: 1.75, textTransform: "none", fontWeight: 600 }} onClick={() => addToCart(product._id)}>
              Add to Cart
            </Button>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              sx={{ py: 1.75, textTransform: "none", fontWeight: 600 }}
              onClick={() => {
                addToCart(product._id);
                navigate("/cart");
              }}
            >
              Buy now
            </Button>
          </Stack>
        </Box>
      </Stack>

      <Stack alignItems="center" sx={{ mt: 10 }}>
        <Box sx={{ textAlign: "center" }}>
          <Typography variant="h4" fontWeight={500}>
            Related Products
          </Typography>
          <Box sx={{ width: 80, height: 3, bgcolor: "primary.main", borderRadius: 999, mx: "auto", mt: 1 }} />
        </Box>
        <Box
          sx={{
            width: "100%",
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)", md: "repeat(3, 1fr)", lg: "repeat(4, 1fr)" },
            gap: 1.5,
            mt: 3,
          }}
        >
          {relatedProduct
            .filter((item) => item.inStock)
            .map((item) => (
              <ProductCard key={item._id} product={item} />
            ))}
        </Box>
        <Button
          variant="outlined"
          color="primary"
          sx={{ mt: 6, px: 6, py: 1.25, borderRadius: 1, textTransform: "none", fontWeight: 600 }}
          onClick={() => {
            navigate("/products");
            scrollTo(0, 0);
          }}
        >
          See more
        </Button>
      </Stack>
    </Box>
  );
};

export default ProductDetails;
