import React from "react";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Typography from "@mui/material/Typography";

const SignUp = () => {
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
      const password = data.password;
      console.log(name);

      reset();

      axios
        .post(`http://localhost:3001/register/`, { name, email, password })
        .then(() => {
          navigate("/login");
        });
     
  };
  return (
    <>
      <Box sx={{ display: "flex", backgroundColor: "lightblue", height: 900 }}>
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
                SignUp
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
                label="Password"
                type="password"
                name="password"
                fullWidth
                autoComplete="password"
                autoFocus
                {...register("password", {
                  required: "Required field",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters",
                  },
                })}
                error={!!errors?.password}
                helperText={errors?.password && errors.password.message}
              />
            </Box>

            <Button
              sx={{ mt: 3 }}
              type="submit"
              variant="contained"
              color="success"
              fullWidth
            >
              Sign Up
            </Button>
          </form>
        </Container>
      </Box>
    </>
  );
};

export default SignUp;
