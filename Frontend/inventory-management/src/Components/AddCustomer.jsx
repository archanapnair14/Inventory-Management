import React from "react";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Typography from "@mui/material/Typography";
import Sidemenus from "./Dashboard";

const AddCustomer = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    console.log(data);
    const name = data.name;
    const email = data.email;
    const address = data.address;
    console.log(name);

    reset();

    axios
      .post(`http://localhost:3001/customer/`, { name, email, address })
      .then(() => {
        navigate("/page");
      });
  };
  return (
    <>
      <Box
        sx={{ display: "flex", backgroundColor: "beige", height: 900, mt: 10 }}
      >
        <Sidemenus />

        <Container maxWidth="xs">
          <Grid container spacing={2} mt={3} mr={9}>
            <Link to="/customers">
              <Button variant="contained">Customers List</Button>
            </Link>
          </Grid>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box
              mb={2}
              sx={{
                marginTop: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography
                gutterBottom
                variant="h4"
                fontFamily="cursive"
                component="div"
              >
                ADD CUSTOMER
              </Typography>
              <TextField
                sx={{ mt: 3 }}
                variant="outlined"
                label="Name"
                name="name"
                fullWidth
                autoComplete="name"
                autoFocus
                {...register("name", {
                  required: "Required field",
                  minLength: {
                    value: 4,
                    message: "Name must be minimum four characters",
                  },
                })}
                error={!!errors?.name}
                helperText={errors?.name ? errors.name.message : null}
              />
              <TextField
                sx={{ mt: 3 }}
                variant="outlined"
                label="Email"
                name="email"
                fullWidth
                autoComplete="email"
                autoFocus
                {...register("email", {
                  required: "Required field",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
                error={!!errors?.email}
                helperText={errors?.email ? errors.email.message : null}
              />
              <TextField
                sx={{ mt: 5 }}
                variant="outlined"
                label="Address"
                type="text"
                name="address"
                fullWidth
                autoComplete="address"
                autoFocus
                {...register("address", {
                  required: "Required field",
                })}
                error={!!errors?.address}
                helperText={errors?.address && errors.address.message}
              />
            </Box>

            <Button
              sx={{ mt: 3 }}
              type="submit"
              variant="contained"
              color="success"
              fullWidth
            >
              add customer
            </Button>
          </form>
        </Container>
      </Box>
    </>
  );
};

export default AddCustomer;
