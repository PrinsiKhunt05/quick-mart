import React, { useEffect, useState } from "react";
import { Box, Typography, Button, IconButton, Divider, MenuItem, Select, FormControl, Stack, Paper } from "@mui/material";
import { assets } from "../assets/assets";
import { useAppContext } from "../Context/AppContext";
import toast from "react-hot-toast";

const Cart = () => {
  const {
    products,
    currency,
    removeFromCart,
    cartItems,
    getCartCount,
    updateCartItem,
    navigate,
    getCartAmount,
    axios,
    user,
    SetCartItems,
  } = useAppContext();

  const [cartArray, setCartArray] = useState([]);
  const [addresses, setAddress] = useState([]);
  const [showAddress, setShowAddress] = useState(false);
  const [selectAddress, setSelectAdress] = useState(null);
  const [paymentOption, setPaymentOption] = useState("COD");

  const getCart = () => {
    const tempArray = [];
    for (const key in cartItems) {
      const product = products.find((item) => item._id === key);
      if (!product) continue;
      tempArray.push({ ...product, quantity: cartItems[key] });
    }
    setCartArray(tempArray);
  };

  const getUserAddress = async () => {
    try {
      const { data } = await axios.get("/api/address/get");
      if (data.success) {
        setAddress(data.address);
        if (data.address.length > 0) setSelectAdress(data.address[0]);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const PlaceOrder = async () => {
    try {
      if (!selectAddress) {
        return toast.error("please select addres");
      }

      if (paymentOption === "COD") {
        const { data } = await axios.post("/api/order/cod", {
          userId: user._id,
          items: cartArray.map((item) => ({
            product: item._id,
            quantity: item.quantity,
          })),
          address: selectAddress._id,
        });

        if (data.success) {
          toast.success(data.message);
          SetCartItems({});
          navigate("/my-orders");
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await axios.post("/api/order/stripe", {
          userId: user._id,
          items: cartArray.map((item) => ({
            product: item._id,
            quantity: item.quantity,
          })),
          address: selectAddress._id,
        });

        if (data.success) {
          SetCartItems({});
          window.location.replace(data.url);
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (products.length > 0 && cartItems) {
      getCart();
    }
  }, [products, cartItems]);

  useEffect(() => {
    if (user) {
      getUserAddress();
    }
  }, [user]);

  if (!(products.length > 0 && cartItems)) return null;

  return (
    <Stack direction={{ xs: "column", md: "row" }} spacing={4} sx={{ mt: 8 }} alignItems="flex-start">
      <Box sx={{ flex: 1, maxWidth: "56rem", width: "100%" }}>
        <Typography variant="h4" fontWeight={500} gutterBottom>
          Shopping Cart{" "}
          <Typography component="span" variant="body2" color="primary">
            {getCartCount()} Items
          </Typography>
        </Typography>

        <Box sx={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", color: "text.secondary", fontWeight: 600, pb: 2, mt: 2 }}>
          <Typography variant="body2">Product Details</Typography>
          <Typography variant="body2" textAlign="center">
            Subtotal
          </Typography>
          <Typography variant="body2" textAlign="center">
            Action
          </Typography>
        </Box>
        <Divider />

        {cartArray.map((product) => (
          <Box key={product._id} sx={{ py: 2 }}>
            <Box sx={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", alignItems: "center", gap: 1 }}>
              <Stack direction="row" spacing={{ xs: 1.5, md: 3 }} alignItems="center">
                <Box
                  onClick={() => {
                    navigate(`/products/${product.category.toLowerCase()}/${product._id}`);
                    scrollTo(0, 0);
                  }}
                  sx={{
                    cursor: "pointer",
                    width: 96,
                    height: 96,
                    border: 1,
                    borderColor: "grey.300",
                    borderRadius: 1,
                    overflow: "hidden",
                    flexShrink: 0,
                  }}
                >
                  <Box component="img" src={product.image[0]} alt={product.name} sx={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </Box>
                <Box>
                  <Typography fontWeight={600} sx={{ display: { xs: "none", md: "block" } }}>
                    {product.name}
                  </Typography>
                  <Box sx={{ mt: 2 }}>
                    <Stack direction="row" alignItems="center" spacing={2}>
                      <Typography variant="caption" color="text.secondary" sx={{ textTransform: "uppercase" }}>
                        Qty:
                      </Typography>
                      <Stack direction="row" alignItems="center" sx={{ width: 80, height: 32, bgcolor: "grey.100", borderRadius: 2, border: 1, borderColor: "grey.200" }}>
                        <Button
                          size="small"
                          onClick={() => {
                            const newQty = cartItems[product._id] - 1;
                            if (newQty > 0) {
                              updateCartItem(product._id, newQty);
                            } else {
                              removeFromCart(product._id);
                            }
                          }}
                          sx={{ minWidth: 32, px: 0, color: "primary.main", fontWeight: 700 }}
                        >
                          −
                        </Button>
                        <Typography sx={{ flex: 1, textAlign: "center", fontWeight: 700 }}>{cartItems[product._id]}</Typography>
                        <Button size="small" onClick={() => updateCartItem(product._id, cartItems[product._id] + 1)} sx={{ minWidth: 32, px: 0, color: "primary.main", fontWeight: 700 }}>
                          +
                        </Button>
                      </Stack>
                    </Stack>
                  </Box>
                </Box>
              </Stack>
              <Typography textAlign="center" color="text.secondary">
                {currency}
                {product.offerprice * product.quantity}
              </Typography>
              <IconButton onClick={() => removeFromCart(product._id)} sx={{ mx: "auto" }}>
                <Box component="img" src={assets.remove_icon} alt="remove" sx={{ width: 24, height: 24 }} />
              </IconButton>
            </Box>
          </Box>
        ))}

        <Button
          onClick={() => {
            navigate("/products");
            scrollTo(0, 0);
          }}
          sx={{ mt: 2, textTransform: "none", fontWeight: 600, color: "primary.main" }}
          startIcon={<Box component="img" src={assets.arrow_right_icon_colored} alt="" />}
        >
          Continue Shopping
        </Button>
      </Box>

      <Paper variant="outlined" sx={{ width: "100%", maxWidth: 360, p: 2.5, bgcolor: "rgba(249,250,251,0.85)", mt: { xs: 4, md: 0 }, alignSelf: "stretch" }}>
        <Typography variant="h6" fontWeight={500}>
          Order Summary
        </Typography>
        <Divider sx={{ my: 3 }} />

        <Box sx={{ position: "relative" }}>
          <Typography variant="caption" fontWeight={600} sx={{ letterSpacing: 0.5 }}>
            DELIVERY ADDRESS
          </Typography>
          <Stack direction="row" justifyContent="space-between" alignItems="flex-start" sx={{ mt: 1 }}>
            <Typography variant="body2" color="text.secondary" sx={{ pr: 1 }}>
              {selectAddress
                ? [selectAddress.street, selectAddress.city, selectAddress.state, selectAddress.country || selectAddress.contry]
                    .filter(Boolean)
                    .join(", ")
                : "No address found"}
            </Typography>
            <Typography component="button" variant="body2" color="primary" onClick={() => setShowAddress(!showAddress)} sx={{ border: "none", background: "none", cursor: "pointer", textDecoration: showAddress ? "none" : "underline", flexShrink: 0 }}>
              Add-Address
            </Typography>
          </Stack>
          {showAddress && (
            <Paper variant="outlined" sx={{ position: "absolute", left: 0, right: 0, top: "100%", mt: 0.5, zIndex: 10, bgcolor: "background.paper" }}>
              {addresses.map((address, index) => (
                <Typography
                  key={address.id || index}
                  variant="body2"
                  sx={{ px: 1, py: 1, cursor: "pointer", "&:hover": { bgcolor: "grey.100" } }}
                  onClick={() => {
                    setSelectAdress(address);
                    setShowAddress(false);
                  }}
                >
                  {[address.street, address.city, address.state, address.country || address.contry]
                    .filter(Boolean)
                    .join(", ")}
                </Typography>
              ))}
              <Typography variant="body2" textAlign="center" color="primary" sx={{ cursor: "pointer", py: 1, "&:hover": { bgcolor: "rgba(99,102,241,0.08)" } }} onClick={() => navigate("/add-address")}>
                Add address
              </Typography>
            </Paper>
          )}
        </Box>

        <Typography variant="caption" fontWeight={600} sx={{ letterSpacing: 0.5, display: "block", mt: 4 }}>
          PAYMENT METHOD
        </Typography>
        <FormControl fullWidth sx={{ mt: 1 }}>
          <Select size="small" value={paymentOption} onChange={(e) => setPaymentOption(e.target.value)}>
            <MenuItem value="COD">Cash On Delivery</MenuItem>
            <MenuItem value="Online">Online Payment</MenuItem>
          </Select>
        </FormControl>

        <Divider sx={{ my: 3 }} />

        <Stack spacing={1}>
          <Stack direction="row" justifyContent="space-between" color="text.secondary">
            <Typography variant="body2">Price</Typography>
            <Typography variant="body2">
              {currency}
              {getCartAmount()}
            </Typography>
          </Stack>
          <Stack direction="row" justifyContent="space-between" color="text.secondary">
            <Typography variant="body2">Shipping Fee</Typography>
            <Typography variant="body2" color="success.main">
              Free
            </Typography>
          </Stack>
          <Stack direction="row" justifyContent="space-between" sx={{ pt: 1 }}>
            <Typography fontWeight={600}>Total Amount:</Typography>
            <Typography fontWeight={600}>
              {currency}
              {getCartAmount()}
            </Typography>
          </Stack>
        </Stack>

        <Button fullWidth variant="contained" color="primary" onClick={PlaceOrder} sx={{ mt: 3, py: 1.5, textTransform: "none", fontWeight: 600 }}>
          {paymentOption === "COD" ? "Place Order" : "Proceed to Checkout"}
        </Button>
      </Paper>
    </Stack>
  );
};

export default Cart;
