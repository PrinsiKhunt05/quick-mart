import React from "react";
import { Box, Typography } from "@mui/material";
import { useAppContext } from "../Context/AppContext";
import { useParams } from "react-router-dom";
import { categories } from "../assets/assets";
import ProductCard from "../Components/ProductCard";

const ProductCatrgory = () => {
  const { products } = useAppContext();
  const { category } = useParams();

  const searchCategory = categories.find((item) => item.path.toLowerCase() === category);

  const fillterProduct = products
    .filter((product) => product.category.toLowerCase() === category)
    .filter((product) => product.inStock);

  return (
    <Box sx={{ mt: 8 }}>
      {searchCategory && (
        <Box sx={{ display: "inline-flex", flexDirection: "column", alignItems: "flex-end" }}>
          <Typography variant="h5" fontWeight={500}>
            {searchCategory.text.toUpperCase()}
          </Typography>
          <Box sx={{ width: 64, height: 3, bgcolor: "primary.main", borderRadius: 999, mt: 0.5 }} />
        </Box>
      )}
      {fillterProduct.length > 0 ? (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)", md: "repeat(3, 1fr)", lg: "repeat(4, 1fr)" },
            gap: 1.5,
            mt: 3,
          }}
        >
          {fillterProduct.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </Box>
      ) : (
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "60vh" }}>
          <Typography variant="h5" fontWeight={500} color="primary">
            No products found in this category.
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default ProductCatrgory;
