import { useForm } from "react-hook-form";
import {
  TextField,
  Button,
  Container,
  Grid,
  Typography,
  Select,
  MenuItem,
  Box,
} from "@mui/material";
import { useState, useEffect } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import Sidemenus from "./Dashboard";

const AddItem = () => {
  const navigate = useNavigate();
  const [file, setFileData] = useState(null);
  const [categories, setCategory] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const handleFileChange = (e) => {
    const fileData = e.target.files[0];
    console.log(fileData);
    setFileData(fileData);
  };

  useEffect(() => {
    Axios.get("http://localhost:3001/category").then((response) => {
      setCategory(response.data);
      console.log(response.data);
    });
  }, []);

  const onSubmit = (data) => {
    console.log(data);
    const formData = new FormData();
    formData.append("itemName", data.itemName);
    formData.append("unit", data.unit);
    formData.append("sellingPrice", data.sellingPrice);
    formData.append("costPrice", data.costPrice);
    formData.append("dimension", data.dimension);
    formData.append("weight", data.weight);
    formData.append("manufacturer", data.manufacturer);
    formData.append("brand", data.brand);
    formData.append("description", data.description);
    formData.append("openingStock", data.openingStock);
    formData.append("reorderPoint", data.reorderPoint);
    formData.append("preferredvendor", data.preferredVendor);
    formData.append("category", data.category);
    formData.append("files", file);
    formData.append("estatus", "Not Edited");

    fetch("http://localhost:3001/additems", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        navigate('/')
      });

    reset();
  };
  return (
    <Box sx={{display:"flex",backgroundColor:'beige',height:900,mt:3}}>
      <Sidemenus/>
    <Container maxWidth="sm" sx={{ mt: 10 }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Typography
            gutterBottom
            variant="h5"
            fontFamily="cursive"
            component="div"
          >
            Add New Item
          </Typography>
          <Grid item xs={12}>
            <TextField
              {...register("itemName", { required: "Item name is required" })}
              variant="outlined"
              fullWidth
              label="Item Name"
              error={Boolean(errors.itemName)}
              helperText={errors.itemName?.message}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              {...register("unit", { required: "Unit is required" })}
              variant="outlined"
              fullWidth
              label="Unit"
              error={Boolean(errors.unit)}
              helperText={errors.unit?.message}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              {...register("dimension", { required: "Dimension is required" })}
              variant="outlined"
              fullWidth
              label="Dimension"
              error={Boolean(errors.dimension)}
              helperText={errors.dimension?.message}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              {...register("weight", { required: "Weight is required" })}
              variant="outlined"
              fullWidth
              label="Weight"
              error={Boolean(errors.weight)}
              helperText={errors.weight?.message}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              {...register("manufacturer", {
                required: "Manufacturer is required",
              })}
              variant="outlined"
              fullWidth
              label="Manufacturer"
              error={Boolean(errors.manufacturer)}
              helperText={errors.manufacturer?.message}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              {...register("brand", {
                required: "Brand is required",
              })}
              variant="outlined"
              fullWidth
              label="Brand"
              error={Boolean(errors.brand)}
              helperText={errors.brand?.message}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Select
              {...register("category", {
                required: "Category is required",
              })}
              variant="outlined"
              fullWidth
              label="category"
              error={Boolean(errors.category)}
              helperText={errors.category?.message}
            >
              {categories.map((cat) => (
                <MenuItem key={cat._id} value={cat.category}>
                  {cat.category}
                </MenuItem>
              ))}
            </Select>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              {...register("sellingPrice", {
                required: "Selling price is required",
              })}
              variant="outlined"
              fullWidth
              label="Selling Price"
              error={Boolean(errors.sellingPrice)}
              helperText={errors.sellingPrice?.message}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              {...register("costPrice", { required: "Cost price is required" })}
              variant="outlined"
              fullWidth
              label="Cost Price"
              error={Boolean(errors.costPrice)}
              helperText={errors.costPrice?.message}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              {...register("description", {
                required: "Description is required",
              })}
              variant="outlined"
              fullWidth
              label="Description"
              error={Boolean(errors.description)}
              helperText={errors.description?.message}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              {...register("openingStock", {
                required: "Openingstock is required",
              })}
              variant="outlined"
              fullWidth
              label="Opening Stock"
              error={Boolean(errors.openingStock)}
              helperText={errors.openingStock?.message}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              {...register("reorderPoint", {
                required: "reorderpoint is required",
              })}
              variant="outlined"
              fullWidth
              label="Reorder Point"
              error={Boolean(errors.reorderPoint)}
              helperText={errors.reorderPoint?.message}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              {...register("preferredVendor", {
                required: "PreferredVendor is required",
              })}
              variant="outlined"
              fullWidth
              label="Preferred Vendor"
              error={Boolean(errors.preferredVendor)}
              helperText={errors.preferredVendor?.message}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              type="file"
              fullWidth
              {...register("files", {
                required: "Image is required",
              })}
              error={!!errors?.files}
              helperText={errors?.files && errors.files.message}
              accept="application/pdf"
              onChange={handleFileChange}
            />
          </Grid>
        </Grid>
        <Button
          sx={{ mt: 3 }}
          type="submit"
          variant="contained"
          color="primary"
        >
          Create Item
        </Button>
      </form>
    </Container>
    </Box>
  );
};

export default AddItem;
