import React from "react";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Typography from "@mui/material/Typography";

const AddDeliveryChallan = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const { id } = useParams();

  const onSubmit = (data) => {
    console.log(data);
    const refno = data.refno;
    const deliverydate = data.deliverydate;
    const salesId = id;
    console.log(salesId);
    reset();

    axios
      .post(`http://localhost:3001/deliverychallan/`, { refno,deliverydate,salesId})
      .then(() => {
        navigate("/page");
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
                GENERATE - CHALLAN
              </Typography>
              <TextField
                sx={{ mt: 3 }}
                variant="outlined"
                label="Reference Number"
                name="refno"
                fullWidth
                autoComplete="refno"
                autoFocus
                {...register("refno", {
                  required: "Required field",
                })}
                error={!!errors?.refno}
                helperText={errors?.refno ? errors.refno.message : null}
              />
              <TextField
                sx={{ mt: 3 }}
                id="date"
                label="Date"
                type="text"
                {...register("deliverydate", {
                  required: true,
                  validate: {
                    futureDate: (value) =>
                      value === "" || new Date(value) > new Date(),
                  },
                })}
                placeholder="YYYY-MM-DD"
                className={errors.deliverydate ? "error" : ""}
              />
              {errors.deliverydate &&
                errors.deliverydate.type === "futureDate" && (
                  <Typography sx={{ ml: 1 }} variant="caption" color="error">
                    Please enter a valid date.
                  </Typography>
                )}
            </Box>

            <Button
              sx={{ mt: 3 }}
              type="submit"
              variant="contained"
              color="success"
              fullWidth
            >
              Generate
            </Button>
          </form>
        </Container>
      </Box>
    </>
  );
};

export default AddDeliveryChallan;
