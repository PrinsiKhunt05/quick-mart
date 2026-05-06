import React from "react";
import { Box, Container, Divider } from "@mui/material";
import MainBanner from "../Components/MainBanner";
import Categoris from "../Components/Categoris";
import BestSeller from "../Components/BestSeller";
import BottomBanner from "../Components/BottomBanner";
import NewLetter from "../Components/NewLetter";

const Home = () => {
  return (
    <Box component="main" sx={{ mt: 5 }} aria-label="Homepage">
      <Box component="section" aria-label="Main banner">
        <MainBanner />
      </Box>
      <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3 } }}>
        <Box component="section" aria-label="Product categories" sx={{ mt: 8 }}>
          <Categoris />
        </Box>
        <Divider sx={{ mt: 6, borderColor: "rgba(0,0,0,0.08)" }} />
        <Box component="section" aria-label="Best sellers" sx={{ mt: 6 }}>
          <BestSeller />
        </Box>
      </Container>
      <Box component="section" aria-label="Why we are the best" sx={{ mt: 10 }}>
        <BottomBanner />
      </Box>
      <Container maxWidth="md" sx={{ px: { xs: 2, sm: 3 } }}>
        <Box component="section" aria-label="Newsletter" sx={{ mt: 10 }}>
          <NewLetter />
        </Box>
      </Container>
    </Box>
  );
};

export default Home;
