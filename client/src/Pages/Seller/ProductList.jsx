import React, { useState } from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Switch,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Stack,
  FormControlLabel,
} from "@mui/material";
import { useAppContext } from "../../Context/AppContext";
import toast from "react-hot-toast";

const ProductList = () => {
  const { products, currency, axios, fetchProducts } = useAppContext();
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ name: "", category: "", price: "", offerPrice: "", description: "" });

  const toggleStock = async (id, inStock) => {
    try {
      const { data } = await axios.post("/api/product/stock", { id, inStock });
      if (data.success) {
        fetchProducts();
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const openEdit = (product) => {
    setEditing(product);
    setForm({
      name: product.name || "",
      category: product.category || "",
      price: product.price || "",
      offerPrice: product.offerprice || "",
      description: Array.isArray(product.description) ? product.description.join("\n") : product.description || "",
    });
    setIsEditOpen(true);
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const submitEdit = async (e) => {
    e.preventDefault();
    if (!editing) return;
    try {
      const payload = {
        name: form.name,
        category: form.category,
        price: Number(form.price),
        offerPrice: Number(form.offerPrice),
        description: form.description,
      };
      const { data } = await axios.put(`/api/product/update/${editing._id}`, payload);
      if (data.success) {
        toast.success("Product updated");
        setIsEditOpen(false);
        setEditing(null);
        fetchProducts();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <Box className="no-scrollbar" sx={{ flex: 1, height: "95vh", overflowY: "auto", p: { xs: 2, md: 4 } }}>
      <Typography variant="h6" fontWeight={500} gutterBottom>
        All Products
      </Typography>
      <TableContainer component={Paper} variant="outlined" sx={{ maxWidth: "56rem", mt: 2 }}>
        <Table size="small">
          <TableHead sx={{ bgcolor: "grey.50" }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 700 }}>Product</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Category</TableCell>
              <TableCell sx={{ fontWeight: 700, display: { xs: "none", md: "table-cell" } }}>Selling Price</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>In Stock</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product._id} hover>
                <TableCell>
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <Paper variant="outlined" sx={{ p: 1 }}>
                      <Box component="img" src={product.image[0]} alt="" sx={{ width: 64 }} />
                    </Paper>
                    <Typography sx={{ display: { xs: "none", sm: "block" }, overflow: "hidden", textOverflow: "ellipsis" }} variant="body2">
                      {product.name}
                    </Typography>
                  </Stack>
                </TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell sx={{ display: { xs: "none", md: "table-cell" } }}>
                  {currency}
                  {product.offerprice}
                </TableCell>
                <TableCell>
                  <FormControlLabel
                    control={<Switch checked={product.inStock} onChange={() => toggleStock(product._id, !product.inStock)} color="primary" />}
                    label=""
                  />
                </TableCell>
                <TableCell>
                  <Stack direction="row" spacing={1}>
                    <Button size="small" variant="contained" onClick={() => openEdit(product)}>
                      Edit
                    </Button>
                    <Button
                      size="small"
                      variant="contained"
                      color="error"
                      onClick={async () => {
                        const ok = confirm("Delete this product?");
                        if (!ok) return;
                        try {
                          const { data } = await axios.delete(`/api/product/delete/${product._id}`);
                          if (data.success) {
                            toast.success("Product deleted");
                            fetchProducts();
                          } else {
                            toast.error(data.message);
                          }
                        } catch (error) {
                          toast.error(error.message);
                        }
                      }}
                    >
                      Delete
                    </Button>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={isEditOpen} onClose={() => { setIsEditOpen(false); setEditing(null); }} fullWidth maxWidth="sm">
        <DialogTitle>Edit Product</DialogTitle>
        <Box component="form" onSubmit={submitEdit}>
          <DialogContent>
            <Stack spacing={2} sx={{ pt: 1 }}>
              <TextField name="name" label="Name" value={form.name} onChange={onChange} fullWidth size="small" />
              <TextField name="category" label="Category" value={form.category} onChange={onChange} fullWidth size="small" />
              <Stack direction="row" spacing={2}>
                <TextField name="price" label="Price" type="number" value={form.price} onChange={onChange} fullWidth size="small" />
                <TextField name="offerPrice" label="Offer Price" type="number" value={form.offerPrice} onChange={onChange} fullWidth size="small" />
              </Stack>
              <TextField name="description" label="Description (one per line)" value={form.description} onChange={onChange} fullWidth multiline rows={4} />
            </Stack>
          </DialogContent>
          <DialogActions sx={{ px: 3, pb: 2 }}>
            <Button type="button" onClick={() => { setIsEditOpen(false); setEditing(null); }}>
              Cancel
            </Button>
            <Button type="submit" variant="contained">
              Save
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </Box>
  );
};

export default ProductList;
