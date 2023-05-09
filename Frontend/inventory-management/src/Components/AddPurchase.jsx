import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  TextField,
  Button,
  Box,
  Container,
  Typography,
  Grid,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import Sidemenus from "./Dashboard";

const AddPurchase = () => {
  const [vendor, setVendor] = useState("");
  const [vdetails, setVdetails] = useState([]);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    Axios.get("http://localhost:3001/allvendors").then((response) => {
      setVdetails(response.data);
    });
  }, []);

  const handleVendorChange = (vendorId) => {
    setVendor(vendorId);
    console.log(vendorId);
  };

  const onSubmit = (data) => {
    console.log(data);
    const vendorname = data.vendorname;
    const itemname = data.itemname;
    const quantity = data.quantity;
    const amount = data.amount;
    const status = "payment pending";
    reset();

    Axios.post(`http://localhost:3001/addpurchase/`, {
      vendorname,
      itemname,
      quantity,
      amount,
      status,
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
                ADD PURCHASE
              </Typography>
              <InputLabel sx={{ mt: 3 }}>Select Vendor</InputLabel>
              <Select
                {...register("vendorname", {
                  required: "slaesid is required",
                })}
                variant="outlined"
                fullWidth
                label="Vendor Name"
                error={Boolean(errors.vendorname)}
                helperText={errors.vendorname?.message}
                value={vendor}
                onChange={(e) => handleVendorChange(e.target.value)}
              >
                <MenuItem value="">Select</MenuItem>
                {vdetails.map((val, key) => (
                  <MenuItem key={key} value={val._id}>
                    {val.vendorname}
                  </MenuItem>
                ))}
              </Select>
              <TextField
                sx={{ mt: 3 }}
                {...register("itemname", {
                  required: "Item name is required",
                })}
                variant="outlined"
                fullWidth
                label="Item Name"
                error={Boolean(errors.itemname)}
                helperText={errors.itemname?.message}
              />
              <TextField
                sx={{ mt: 3 }}
                {...register("quantity", { required: "Quantity is required" })}
                variant="outlined"
                fullWidth
                label="Quantity"
                error={Boolean(errors.quantity)}
                helperText={errors.quantity?.message}
              />
              <TextField
                sx={{ mt: 3 }}
                variant="outlined"
                label="Amount"
                type="text"
                name="amount"
                fullWidth
                autoComplete="amount"
                autoFocus
                {...register("amount", {
                  required: "Required field",
                })}
                error={!!errors?.amount}
                helperText={errors?.amount && errors.amount.message}
              />
            </Box>

            <Button
              sx={{ mt: 3 }}
              type="submit"
              variant="contained"
              color="success"
              fullWidth
            >
              add purchase
            </Button>
          </form>
        </Container>
      </Box>
    </>
  );
};

export default AddPurchase;
