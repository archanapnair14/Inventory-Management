import { useForm } from "react-hook-form";
import { TextField, Button, Container, Grid, Typography } from "@mui/material";

const CreateItemGroup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    // Save item group data to database
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
            Add ItemGroup
          </Typography>
          <Grid item xs={12}>
            <TextField
              {...register("brandName", { required: true })}
              variant="outlined"
              fullWidth
              label="Brand Name"
              error={Boolean(errors.brandName)}
              helperText={errors.brandName && "Brand name is required"}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              {...register("description", { required: true })}
              variant="outlined"
              fullWidth
              label="Description"
              error={Boolean(errors.description)}
              helperText={errors.description && "Description is required"}
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
          Create Item Group
        </Button>
      </form>
    </Container>
  );
};

export default CreateItemGroup;
