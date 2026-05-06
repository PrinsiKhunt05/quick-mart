import React, { useState } from "react";
import { Box, Typography, TextField, Button, Stack, MenuItem, Select, FormControl, InputLabel } from "@mui/material";
import { assets, categories } from "../../assets/assets";
import { useAppContext } from "../../Context/AppContext";
import toast from "react-hot-toast";

const AddProduct = () => {
  const [files, setFiles] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [offerPrice, setOfferPrice] = useState("");

  const { axios } = useAppContext();

  const onSubmitHandler = async (event) => {
    try {
      event.preventDefault();

      const productData = {
        name,
        description: description.split("\n"),
        category,
        price,
        offerPrice,
      };

      const formData = new FormData();
      formData.append("productData", JSON.stringify(productData));
      for (let i = 0; i < files.length; i++) {
        formData.append("images", files[i]);
      }
      const { data } = await axios.post("/api/product/add", formData);

      if (data.success) {
        toast.success(data.message);
        setName("");
        setDescription("");
        setCategory("");
        setPrice("");
        setOfferPrice("");
        setFiles([]);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <Box className="no-scrollbar" sx={{ flex: 1, height: "95vh", overflowY: "auto", display: "flex", flexDirection: "column" }}>
      <Box component="form" onSubmit={onSubmitHandler} sx={{ p: { xs: 2, md: 5 }, maxWidth: 520 }}>
        <Typography variant="subtitle1" fontWeight={600} gutterBottom>
          Product Image
        </Typography>
        <Stack direction="row" flexWrap="wrap" gap={2} sx={{ mt: 1 }}>
          {Array(4)
            .fill("")
            .map((_, index) => (
              <label key={index} htmlFor={`image${index}`}>
                <input
                  onChange={(e) => {
                    const updateFiles = [...files];
                    updateFiles[index] = e.target.files[0];
                    setFiles(updateFiles);
                  }}
                  type="file"
                  id={`image${index}`}
                  hidden
                />
                <Box component="img" src={files[index] ? URL.createObjectURL(files[index]) : assets.upload_area} alt="upload" sx={{ maxWidth: 100, cursor: "pointer" }} />
              </label>
            ))}
        </Stack>

        <TextField label="Product Name" value={name} onChange={(e) => setName(e.target.value)} id="product-name" fullWidth margin="normal" placeholder="Type here" required />
        <TextField label="Product Description" value={description} onChange={(e) => setDescription(e.target.value)} id="product-description" fullWidth margin="normal" multiline rows={4} placeholder="Type here" />
        <FormControl fullWidth margin="normal">
          <InputLabel id="category-label">Category</InputLabel>
          <Select labelId="category-label" label="Category" value={category} onChange={(e) => setCategory(e.target.value)} id="category" required displayEmpty>
            <MenuItem value="">
              <em>Select Category</em>
            </MenuItem>
            {categories.map((item, index) => (
              <MenuItem key={index} value={item.path}>
                {item.path}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Stack direction="row" spacing={3} sx={{ mt: 2 }}>
          <TextField label="Product Price" value={price} onChange={(e) => setPrice(e.target.value)} id="product-price" type="number" placeholder="0" required fullWidth />
          <TextField label="Offer Price" value={offerPrice} onChange={(e) => setOfferPrice(e.target.value)} id="offer-price" type="number" placeholder="0" required fullWidth />
        </Stack>

        <Button type="submit" variant="contained" color="primary" sx={{ mt: 3, px: 4, py: 1.25, textTransform: "none", fontWeight: 600 }}>
          ADD
        </Button>
      </Box>
    </Box>
  );
};

export default AddProduct;
