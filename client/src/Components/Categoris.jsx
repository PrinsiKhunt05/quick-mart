import React from "react";
import { Box, Typography } from "@mui/material";
import { categories } from "../assets/assets";
import { useAppContext } from "../Context/AppContext";

const Categoris = () => {
  const { navigate } = useAppContext();

  return (
    <Box sx={{ mt: 4 }}>
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Typography variant="h5" sx={{ fontWeight: 500, fontSize: { xs: "1.5rem", md: "1.875rem" } }}>
          Categories
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ display: { xs: "none", md: "inline" } }}>
          Browse by department
        </Typography>
      </Box>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "repeat(2, 1fr)",
            sm: "repeat(3, 1fr)",
            md: "repeat(5, 1fr)",
            lg: "repeat(6, 1fr)",
            xl: "repeat(7, 1fr)",
          },
          gap: 3,
          mt: 3,
        }}
      >
        {categories.map((category, index) => (
          <Box
            key={index}
            onClick={() => {
              navigate(`/products/${category.path.toLocaleLowerCase()}`);
              scrollTo(0, 0);
            }}
            sx={{
              cursor: "pointer",
              py: 2.5,
              px: 1,
              borderRadius: 2,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              bgcolor: category.bgColor,
              boxShadow: 1,
              border: "1px solid rgba(0,0,0,0.06)",
              transition: "transform 0.2s, box-shadow 0.2s",
              "&:hover": { boxShadow: 3, transform: "translateY(-2px)" },
            }}
          >
            <Box component="img" src={category.image} alt={category.text} sx={{ maxWidth: 80, transition: "transform 0.2s", "&:hover": { transform: "scale(1.05)" } }} />
            <Typography variant="body2" fontWeight={500} sx={{ mt: 1 }}>
              {category.text}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default Categoris;
