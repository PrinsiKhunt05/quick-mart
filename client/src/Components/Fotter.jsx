import React from "react";
import { Box, Typography, Link as MuiLink, Container, Stack } from "@mui/material";
import { footerLinks } from "../assets/assets";

const Fotter = () => {
  return (
    <Box sx={{ mt: 12, bgcolor: "grey.50", px: { xs: 3, md: 8, lg: 12 } }}>
      <Container maxWidth={false} sx={{ py: 6, borderBottom: 1, borderColor: "grey.200" }}>
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={5}
          justifyContent="space-between"
          alignItems={{ xs: "flex-start", md: "flex-start" }}
        >
          <Box sx={{ maxWidth: 480 }}>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 800,
                background: "linear-gradient(90deg, #2563eb 0%, #7c3aed 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                mb: 3,
              }}
            >
              Quickmart
            </Typography>
            <Typography color="text.secondary">
              We deliver fresh groceries and snacks straight to your door. Trusted by thousands, we aim to make your shopping
              experience simple and affordable.
            </Typography>
          </Box>
          <Stack direction="row" flexWrap="wrap" useFlexGap spacing={5} sx={{ flex: 1, justifyContent: { md: "flex-end" } }}>
            {footerLinks.map((section, index) => (
              <Box key={index} sx={{ minWidth: 140 }}>
                <Typography variant="subtitle1" fontWeight={600} color="grey.900" gutterBottom>
                  {section.title}
                </Typography>
                <Stack component="ul" spacing={1} sx={{ listStyle: "none", m: 0, p: 0 }}>
                  {section.links.map((link, i) => (
                    <Box component="li" key={i}>
                      <MuiLink href={link.url} underline="hover" color="text.secondary" sx={{ fontSize: "0.875rem" }}>
                        {link.text}
                      </MuiLink>
                    </Box>
                  ))}
                </Stack>
              </Box>
            ))}
          </Stack>
        </Stack>
      </Container>
      <Typography align="center" color="text.secondary" sx={{ py: 2.5, fontSize: { xs: "0.875rem", md: "1rem" } }}>
        © {new Date().getFullYear()} Quickmart. All rights reserved.
      </Typography>
    </Box>
  );
};

export default Fotter;
