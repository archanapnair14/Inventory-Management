import { useForm } from "react-hook-form";
import { TextField, Button, Container, Grid, Typography } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Axios from "axios";

const EditCustomer = () => {
  const [customer, setcustomer] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    Axios.get(`http://localhost:3001/customer/${id}`).then((response) => {
      setcustomer(response.data);
      console.log(customer?.name);
    });
  }, []);
  const onSubmit = async (data) => {
    console.log(data);

    try {
      const response = await Axios.put(
        `http://localhost:3001/editcustomers/${id}`,
        {
          name: data.name,
          email: data.email,
          address: data.address,
        }
      );

      console.log(response.data.message);
      reset();
      navigate("/customers");
    } catch (error) {
      console.error(error);
      setMessage("Error updating");
    }
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
            EDIT - CUSTOMER
          </Typography>
          <Grid item xs={12}>
            <TextField
              {...register("name", { required: true })}
              variant="outlined"
              fullWidth
              label="Name"
              defaultValue={customer?.name}
              error={Boolean(errors.name)}
              helperText={errors.name && "Name is required"}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              {...register("email", { required: true })}
              variant="outlined"
              fullWidth
              label="Email"
              defaultValue={customer?.email}
              error={Boolean(errors.email)}
              helperText={errors.email && "Email is required"}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              {...register("address", { required: true })}
              variant="outlined"
              fullWidth
              label="Address"
              defaultValue={customer?.address}
              error={Boolean(errors.address)}
              helperText={errors.address && "Address is required"}
            />
          </Grid>
        </Grid>
        <Button
          sx={{ mt: 3 }}
          type="submit"
          variant="contained"
          color="primary"
        >
          UPDATE
        </Button>
      </form>
    </Container>
  );
};

export default EditCustomer;
