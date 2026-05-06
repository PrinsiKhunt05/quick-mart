import React, { useEffect } from "react";
import { Box, CircularProgress } from "@mui/material";
import { useAppContext } from "../Context/AppContext";
import { useLocation } from "react-router-dom";

const Loading = () => {
  const { navigate } = useAppContext();
  const { search } = useLocation();
  const query = new URLSearchParams(search);
  const nextUrl = query.get("next");

  useEffect(() => {
    if (nextUrl) {
      setTimeout(() => {
        navigate(`${nextUrl}`);
      }, 5000);
    }
  }, [nextUrl, navigate]);

  return (
    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh" }}>
      <CircularProgress size={96} thickness={4} color="primary" />
    </Box>
  );
};

export default Loading;
