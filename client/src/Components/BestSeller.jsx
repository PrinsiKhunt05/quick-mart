import React from "react";
import { Box, Typography, Link } from "@mui/material";
import ProductCard from "./ProductCard";
import { useAppContext } from "../Context/AppContext";

const BestSeller = () => {
  const { products } = useAppContext();

  return (
    <Box sx={{ mt: 8 }}>
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Typography variant="h5" sx={{ fontWeight: 500, fontSize: { xs: "1.5rem", md: "1.875rem" } }}>
          Best Sellers
        </Typography>
        <Link href="#" underline="hover" color="primary" sx={{ fontSize: "0.875rem", display: { xs: "none", md: "inline" } }}>
          View all
        </Link>
      </Box>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)", md: "repeat(3, 1fr)", lg: "repeat(4, 1fr)" },
          gap: 2,
          mt: 3,
        }}
      >
        {products
          .filter((product) => product.inStock)
          .slice(0, 5)
          .map((product, index) => (
            <ProductCard key={index} product={product} />
          ))}
      </Box>
    </Box>
  );
};

export default BestSeller;
