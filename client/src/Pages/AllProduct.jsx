import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { useAppContext } from "../Context/AppContext";
import ProductCard from "../Components/ProductCard";

const AllProduct = () => {
  const { products, searchQuery } = useAppContext();
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    if (searchQuery.length > 0) {
      setFilteredProducts(products.filter((product) => product.name.toLowerCase().includes(searchQuery.toLowerCase())));
    } else {
      setFilteredProducts(products);
    }
  }, [products, searchQuery]);

  return (
    <Box sx={{ mt: 8 }}>
      <Box sx={{ display: "inline-flex", flexDirection: "column", alignItems: "flex-end" }}>
        <Typography variant="h5" fontWeight={500} sx={{ textTransform: "uppercase" }}>
          All Products
        </Typography>
        <Box sx={{ width: 64, height: 3, bgcolor: "primary.main", borderRadius: 999, mt: 0.5 }} />
      </Box>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)", md: "repeat(3, 1fr)", lg: "repeat(4, 1fr)" },
          gap: 1.5,
          mt: 3,
        }}
      >
        {filteredProducts
          .filter((product) => product.inStock)
          .map((product, index) => (
            <ProductCard key={index} product={product} />
          ))}
      </Box>
    </Box>
  );
};

export default AllProduct;
