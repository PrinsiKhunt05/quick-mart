import React, { useEffect, useState } from "react";
import { Box, Typography, Paper, Stack, Button } from "@mui/material";
import { useAppContext } from "../../Context/AppContext";
import { assets } from "../../assets/assets";
import toast from "react-hot-toast";

const Orders = () => {
  const { currency, axios } = useAppContext();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get("/api/order/seller");
      if (data.success) {
        setOrders(data.orders || []);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
    const interval = setInterval(fetchOrders, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Box className="no-scrollbar" sx={{ flex: 1, height: "95vh", overflowY: "auto", p: { xs: 2, md: 4 } }}>
      <Stack direction={{ xs: "column", md: "row" }} justifyContent="space-between" alignItems={{ md: "center" }} spacing={2} sx={{ mb: 2 }}>
        <Typography variant="h6" fontWeight={500}>
          Orders List
        </Typography>
        <Stack direction="row" alignItems="center" spacing={2}>
          <Typography variant="body2" color="text.secondary" fontWeight={600}>
            Total Orders: {orders.length}
          </Typography>
          <Button variant="contained" size="small" disabled={loading} onClick={fetchOrders} sx={{ textTransform: "none" }}>
            <Box component="img" src={assets.refresh_icon} alt="" sx={{ width: 16, height: 16, mr: 1, animation: loading ? "spin 1s linear infinite" : "none", "@keyframes spin": { from: { transform: "rotate(0deg)" }, to: { transform: "rotate(360deg)" } } }} />
            {loading ? "Loading..." : "Refresh"}
          </Button>
        </Stack>
      </Stack>

      {!orders || orders.length === 0 ? (
        <Typography align="center" color="text.secondary" sx={{ py: 4 }}>
          No orders found
        </Typography>
      ) : (
        <Stack spacing={2}>
          {orders.map((order, index) =>
            order ? (
              <Paper key={index} variant="outlined" sx={{ p: 3, maxWidth: "56rem" }}>
                <Stack direction={{ xs: "column", md: "row" }} spacing={3} justifyContent="space-between" alignItems={{ md: "center" }}>
                  <Stack direction="row" spacing={2} sx={{ maxWidth: 320 }}>
                    <Box component="img" src={assets.box_icon} alt="" sx={{ width: 48, height: 48, objectFit: "contain" }} />
                    <Stack>
                      {order.items?.map((item, i) => (
                        <Typography key={i} variant="body2" fontWeight={600}>
                          {item.product?.name || "Product Name Not Available"}{" "}
                          <Typography component="span" color="primary.main">
                            x {item.quantity || 0}
                          </Typography>
                        </Typography>
                      ))}
                    </Stack>
                  </Stack>

                  <Typography variant="body2" sx={{ opacity: 0.75 }}>
                    {order.address?.street || "N/A"}, {order.address?.city || "N/A"}
                    <br />
                    {order.address?.state || "N/A"}, {order.address?.zipcode || "N/A"}
                    <br />
                    {order.address?.phone || "N/A"}
                  </Typography>

                  <Typography variant="subtitle1" fontWeight={700}>
                    {currency}
                    {order.amount}
                  </Typography>

                  <Stack sx={{ typography: "body2", opacity: 0.85 }}>
                    <Typography variant="caption">
                      Method:{" "}
                      <Box component="span" sx={{ fontWeight: 700, color: order.paymentType === "Online" ? "primary.main" : "secondary.main" }}>
                        {order.paymentType === "Online" ? " Online" : " COD"}
                      </Box>
                    </Typography>
                    <Typography variant="caption">{new Date(order.createdAt).toLocaleDateString()}</Typography>
                  </Stack>
                </Stack>
              </Paper>
            ) : null,
          )}
        </Stack>
      )}
    </Box>
  );
};

export default Orders;
