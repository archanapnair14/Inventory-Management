import React from "react";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { useForm } from "react-hook-form";
import { useNavigate} from "react-router-dom";
import axios from "axios";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";



export default function Login() {
  const navigate = useNavigate();


  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async(data) => {
    const UserData = {
      email: data.email,
      password: data.password,
    };

    axios.post(`http://localhost:3001/signin`, UserData).then((response) => {

      reset();

      if (response.data.status === "success") {
        let token = response.data.token;
        let userId = response.data.data && response.data.data[0] && response.data.data[0]._id;
        let useremail = UserData.email;
        console.log(useremail);

        localStorage.setItem("userToken", token);
        localStorage.setItem("userId", userId);


        if (useremail === "admin@gmail.com") {
          navigate("/page");
          window.location.reload()

        } else {
          navigate("/pages");
          window.location.reload()

        }
      } else {
        alert("Invalid user");
      }
      
    });
  };

  return (
    <Box sx={{display:"flex",backgroundColor:'lightblue',height:900}}>

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
            Login
          </Typography>
          <TextField
            sx={{ mt: 1 }}
            variant="outlined"
            label="Email"
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
            fullWidth
            autoComplete="email"
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
          color="primary"
          fullWidth
        >
          LogIn
        </Button>
        <Link to="/signup">New User?</Link>
      </form>
    </Container>
    </Box>
  );
}
