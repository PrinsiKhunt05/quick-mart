import React from "react";
import { Box, Typography, Button, Container, Grid, Card, CardContent, Link } from "@mui/material";

const About = () => {
  const cards = [
    { title: "Fresh & Organic", desc: "Handpicked fruits and vegetables directly from farms." },
    { title: "Wide Variety", desc: "From groceries to household essentials, all in one place." },
    { title: "Affordable Prices", desc: "Best deals and discounts for your daily needs." },
    { title: "Fast Delivery", desc: "Get your groceries delivered to your doorstep quickly." },
  ];

  return (
    <Box sx={{ color: "text.primary" }}>
      <Box
        sx={{
          backgroundImage:
            "url('https://img.freepik.com/free-photo/healthy-food-background-studio-photo-different-fruits-vegetables-black-table_155003-32946.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          color: "#fff",
          py: { xs: 8, md: 12 },
          px: 2,
          textAlign: "center",
        }}
      >
        <Typography variant="h3" sx={{ fontWeight: 800, mb: 2, fontSize: { xs: "2rem", md: "3rem" } }}>
          Welcome to QuickMart 🛒
        </Typography>
        <Typography variant="h6" sx={{ maxWidth: 700, mx: "auto", opacity: 0.95 }}>
          Your trusted online grocery store – delivering freshness, quality, and convenience at your doorstep.
        </Typography>
      </Box>

      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 8 }, px: 2 }}>
        <Grid container spacing={5} alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography variant="h4" sx={{ color: "success.dark", mb: 2, fontWeight: 700 }}>
              🌱 Our Mission
            </Typography>
            <Typography sx={{ fontSize: "1.125rem", lineHeight: 1.7 }}>
              At <strong>QuickMart</strong>, we aim to simplify grocery shopping by offering a wide range of fresh, affordable, and high-quality products. We
              partner with local farmers and trusted suppliers to bring you only the best.
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box component="img" src="https://img.freepik.com/free-photo/basket-full-vegetables_1112-316.jpg" alt="Mission" sx={{ width: "100%", borderRadius: 2, boxShadow: 4 }} />
          </Grid>
        </Grid>
      </Container>

      <Box sx={{ bgcolor: "grey.100", py: { xs: 6, md: 8 }, px: 2 }}>
        <Typography variant="h4" align="center" sx={{ color: "success.dark", mb: 5, fontWeight: 700 }}>
          🚀 Why Choose QuickMart?
        </Typography>
        <Grid container spacing={3} sx={{ maxWidth: 1100, mx: "auto" }}>
          {cards.map((card, i) => (
            <Grid item xs={12} sm={6} md={3} key={i}>
              <Card
                elevation={3}
                sx={{
                  height: "100%",
                  textAlign: "center",
                  borderRadius: 2,
                  transition: "transform 0.25s, box-shadow 0.25s",
                  "&:hover": { transform: "translateY(-8px)", boxShadow: 8 },
                }}
              >
                <CardContent sx={{ py: 3 }}>
                  <Typography variant="h6" sx={{ color: "success.dark", mb: 1, fontWeight: 700 }}>
                    {card.title}
                  </Typography>
                  <Typography sx={{ fontSize: "1rem", color: "text.secondary" }}>{card.desc}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 8 }, px: 2 }}>
        <Grid container spacing={5} alignItems="center">
          <Grid item xs={12} md={6}>
            <Box
              component="img"
              src="https://img.freepik.com/free-photo/grocery-shopping-basket-cart-filled-with-fresh-vegetables-isolated-white-background-generative-ai_1258-150754.jpg"
              alt="Our Story"
              sx={{ width: "100%", borderRadius: 2, boxShadow: 4 }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h4" sx={{ color: "success.dark", mb: 2, fontWeight: 700 }}>
              📍 Our Story
            </Typography>
            <Typography sx={{ fontSize: "1.125rem", lineHeight: 1.7 }}>
              QuickMart started as a small neighborhood shop with a big dream – to make grocery shopping simple and enjoyable. Today, we proudly serve
              thousands of happy families, delivering not just groceries, but trust, convenience, and care.
            </Typography>
          </Grid>
        </Grid>
      </Container>

      <Box sx={{ bgcolor: "success.dark", color: "#fff", textAlign: "center", py: { xs: 6, md: 8 }, px: 2 }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 700 }}>
          Ready to Shop with QuickMart?
        </Typography>
        <Typography sx={{ fontSize: "1.125rem", mb: 4, opacity: 0.95 }}>Get your groceries delivered fast, fresh, and affordably.</Typography>
        <Button component={Link} href="/products" variant="contained" color="inherit" sx={{ bgcolor: "#fff", color: "success.dark", fontWeight: 700, px: 4, "&:hover": { bgcolor: "#f1f5f9" } }}>
          🛍️ Start Shopping
        </Button>
      </Box>
    </Box>
  );
};

export default About;
