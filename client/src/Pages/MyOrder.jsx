import React, { useEffect, useState } from "react";
import { Box, Typography, Paper, Stack } from "@mui/material";
import { useAppContext } from "../Context/AppContext";

const MyOrder = () => {
  const [myOrders, setMyOrders] = useState([]);
  const { currency, axios, user } = useAppContext();

  const fetchMyOrders = async () => {
    try {
      const { data } = await axios.get(`/api/order/user?userId=${user._id}`);
      if (data.success) {
        setMyOrders(data.orders);
      }
    } catch (error) {
      console.error("Failed to fetch orders:", error.message);
    }
  };

  useEffect(() => {
    if (user) {
      fetchMyOrders();
    }
  }, [user]);

  return (
    <Box sx={{ my: 8, pb: 8 }}>
      <Box sx={{ display: "inline-flex", flexDirection: "column", alignItems: "flex-end", mb: 4 }}>
        <Typography variant="h5" fontWeight={500} sx={{ textTransform: "uppercase" }}>
          My Orders
        </Typography>
        <Box sx={{ width: 64, height: 3, bgcolor: "primary.main", borderRadius: 999, mt: 0.5 }} />
      </Box>

      {myOrders.map((order, index) => (
        <Paper key={index} variant="outlined" sx={{ mb: 5, p: 2, py: 3, maxWidth: "56rem" }}>
          <Stack direction={{ xs: "column", md: "row" }} flexWrap="wrap" spacing={1} sx={{ color: "text.secondary", fontWeight: 500, typography: "body2", mb: 2 }}>
            <Typography variant="caption">Order ID: {order._id}</Typography>
            <Typography variant="caption">Payment: {order.paymentType}</Typography>
            <Typography variant="caption">
              Total Amount: {currency} {order.amount}
            </Typography>
            <Typography variant="caption">
              Date: {new Date(order.createdAt).toLocaleDateString()} {new Date(order.createdAt).toLocaleTimeString()}
            </Typography>
          </Stack>

          {order.items.map((item, idx) => (
            <Stack
              key={idx}
              direction={{ xs: "column", md: "row" }}
              alignItems={{ md: "center" }}
              justifyContent="space-between"
              sx={{
                position: "relative",
                bgcolor: "background.paper",
                py: 2,
                px: 2,
                borderTop: 1,
                borderColor: "grey.300",
                gap: 2,
              }}
            >
              <Stack direction="row" alignItems="center">
                <Box sx={{ bgcolor: "rgba(37,99,235,0.1)", p: 2, borderRadius: 2 }}>
                  <Box component="img" src={item.product?.image?.[0]} alt={item.product?.name || "Product"} sx={{ width: 64, height: 64, objectFit: "cover" }} />
                </Box>
                <Box sx={{ ml: 2 }}>
                  <Typography variant="h6" fontWeight={500}>
                    {item.product?.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Category: {item.product?.category}
                  </Typography>
                </Box>
              </Stack>

              <Stack sx={{ minWidth: 120 }}>
                <Typography variant="body2">Quantity: {item.quantity || 1}</Typography>
                <Typography variant="body2">Status: {order.status || "Processing"}</Typography>
              </Stack>

              <Typography color="primary" fontWeight={600} fontSize="1.125rem">
                Amount: {currency}{" "}
                {item.product?.offerprice ? item.product.offerprice * item.quantity : "N/A"}
              </Typography>
            </Stack>
          ))}
        </Paper>
      ))}

      {myOrders.length === 0 && (
        <Typography align="center" color="text.secondary" variant="h6">
          No orders yet.
        </Typography>
      )}
    </Box>
  );
};

export default MyOrder;
