import { useForm } from "react-hook-form";
import { TextField, Button, Container, Grid, Typography,Select,MenuItem } from "@mui/material";
const CreateItem = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    // Save item data to database
  };
  return (
    <Container maxWidth="sm" sx={{ mt: 3 }}>
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
            <Select
              {...register("brand", {
                required: "Brand is required",
              })}
              variant="outlined"
              fullWidth
              label="Brand"
              error={Boolean(errors.brand)}
              helperText={errors.brand?.message}
            >
              <MenuItem value="Brand 1">Brand 1</MenuItem>
              <MenuItem value="Brand 2">Brand 2</MenuItem>
              <MenuItem value="Brand 3">Brand 3</MenuItem>
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
  );
};

export default CreateItem;
