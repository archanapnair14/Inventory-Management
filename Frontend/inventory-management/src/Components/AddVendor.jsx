import React from "react";
import { useForm } from "react-hook-form";
import {
  TextField,
  Button,
  Box,
  Container,
  Typography,
  Grid,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import Sidemenus from "./Dashboard";
import { Link } from "react-router-dom";

const AddVendor = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    console.log(data);
    const vendorname = data.vendorname;
    const address = data.address;
    const email = data.email;
    const vphno = data.vphno;

    reset();

    Axios.post(`http://localhost:3001/addvendor/`, {
      vendorname,
      address,
      email,
      vphno,
    }).then(() => {
      navigate("/");
    });
  };
  return (
    <>
      <Box
        sx={{ display: "flex", backgroundColor: "beige", height: 900, mt: 5 }}
      >
        <Sidemenus />
        <Container maxWidth="xs">
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box
              mb={2}
              sx={{
                marginTop: 8,
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
                ADD VENDOR
              </Typography>
              <TextField
                sx={{ mt: 3 }}
                variant="outlined"
                label="Name"
                name="name"
                fullWidth
                autoComplete="name"
                autoFocus
                {...register("vendorname", {
                  required: "Required field",
                  minLength: {
                    value: 4,
                    message: "Name must be minimum four characters",
                  },
                })}
                error={!!errors?.vendorname}
                helperText={
                  errors?.vendorname ? errors.vendorname.message : null
                }
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
                label="Mobile Number"
                type="text"
                name="vphno"
                fullWidth
                autoComplete="vphno"
                autoFocus
                {...register("vphno", {
                  required: "Required field",
                })}
                error={!!errors?.vphno}
                helperText={errors?.vphno && errors.vphno.message}
              />
            </Box>

            <Button
              sx={{ mt: 3 }}
              type="submit"
              variant="contained"
              color="success"
              fullWidth
            >
              add vendor
            </Button>
          </form>
        </Container>
        <Grid container spacing={2}  ml={9} mt={9}>
          <Link to="/allvendors">
            <Button variant="contained">All Vendors</Button>
          </Link>
        </Grid>
      </Box>
    </>
  );
};

export default AddVendor;
