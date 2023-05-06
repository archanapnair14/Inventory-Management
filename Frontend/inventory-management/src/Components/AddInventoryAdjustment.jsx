import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  TextField,
  Button,
  Container,
  Grid,
  Typography,
  Select,
  MenuItem,
} from "@mui/material";
import { useParams } from "react-router-dom";
import Axios from "axios";

const AddInventoryAdjustment = () => {
  const [file, setFileData] = useState(null);
  const [item, setItem] = useState();
  const [currentDate, setCurrentDate] = useState(new Date());
  const cdate = currentDate.toLocaleString();
  const { id } = useParams();
  console.log(id);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    Axios.get(`http://localhost:3001/allitems/${id}`).then((response) => {
      setItem(response.data);
      console.log(response.data);
    });
  }, []);

  const handleFileChange = (e) => {
    const fileData = e.target.files[0];
    console.log(fileData);
    setFileData(fileData);
  };

  const onSubmit = (data) => {
    console.log(data);
    const formData = new FormData();
    formData.append("mode", data.mode);
    formData.append("refno", data.refno);
    formData.append("itemid", id);
    formData.append("Quantity", data.Quantity);
    formData.append("values", data.values);
    formData.append("date", cdate);
    formData.append("reason", data.reason);
    formData.append("description", data.description);
    formData.append("files", file);

    const updateData = {
      unit: data.Quantity,
      sellingPrice: data.values,
    };

    fetch(`http://localhost:3001/updateItem/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      });

    fetch("http://localhost:3001/inventory", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      });

    reset();
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
            Add Inventory Adjustment
          </Typography>
          <Grid item xs={12} sm={6}>
            <Select
              {...register("mode", {
                required: "Mode of adjustment is required",
              })}
              variant="outlined"
              fullWidth
              label="Mode Of Adjustments"
              error={Boolean(errors.mode)}
              helperText={errors.mode?.message}
            >
              <MenuItem value="Unit">Quantity</MenuItem>
              <MenuItem value="Price">Value</MenuItem>
            </Select>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              {...register("refno", {
                required: "Reference Number is required",
              })}
              variant="outlined"
              fullWidth
              label="Reference Number"
              error={Boolean(errors.refno)}
              helperText={errors.refno?.message}
            />
          </Grid>
          <Grid container spacing={2} mt={3} ml={0.1}>
            <React.Fragment>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  fullWidth
                  label="Updated Quantity"
                  defaultValue={item?.unit} // use defaultValue prop
                  {...register("Quantity", {
                    required: "Updated Quantity is required",
                  })}
                  error={Boolean(errors.Quantity)}
                  helperText={errors.Quantity?.message}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  {...register("values", {
                    required: "Value is required",
                  })}
                  variant="outlined"
                  fullWidth
                  label="Value"
                  defaultValue={item?.sellingPrice} // use defaultValue prop
                  error={Boolean(errors.values)}
                  helperText={errors.values?.message}
                />
              </Grid>
            </React.Fragment>
          </Grid>
          {console.log(item?.sellingPrice)}
          <Grid item xs={12} sm={6}>
            <TextField
              {...register("reason", {
                required: "Reason is required",
              })}
              variant="outlined"
              fullWidth
              label="Reason"
              error={Boolean(errors.manufacturer)}
              helperText={errors.manufacturer?.message}
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
  );
};

export default AddInventoryAdjustment;
