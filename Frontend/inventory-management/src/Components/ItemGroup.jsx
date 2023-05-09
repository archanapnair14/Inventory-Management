import { useForm } from "react-hook-form";
import { TextField, Button, Container, Grid, Typography,Box} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidemenus from "./Dashboard";

const CreateItemGroup = () => {
  const [file, setFileData] = useState(null);
  const navigate = useNavigate();

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

  const onSubmit = (data) => {
    console.log(data);
    const formData = new FormData();
    formData.append("category", data.category);
    formData.append("description", data.description);
    formData.append("files", file);

    fetch("http://localhost:3001/addgroup", {
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
    <Box sx={{display:"flex",backgroundColor:'beige',height:900,mt:5}}>
      <Sidemenus/>
    <Container maxWidth="sm" sx={{ mt: 8 }}>
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
              {...register("category", { required: true })}
              variant="outlined"
              fullWidth
              label="Category"
              error={Boolean(errors.category)}
              helperText={errors.category && "Category is required"}
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
          Create Item Group
        </Button>
      </form>
    </Container>
    </Box>
  );
};

export default CreateItemGroup;
