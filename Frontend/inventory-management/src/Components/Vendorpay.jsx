import React, { useState, useEffect } from "react";
import Axios from "axios";
import "bootstrap/dist/css/bootstrap.css";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Button,
  Typography,
  Grid,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const VendorPay = () => {
  const [payments, setPayments] = useState([]);
  const [vendors, setVendors] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    Axios.get("http://localhost:3001/payments").then((response) => {
      setPayments(response.data);
    });
  }, []);

  const fetchVendorName = (vendorId) => {
    Axios.get(`http://localhost:3001/vendors/${vendorId}`).then((response) => {
      setVendors(response.data);
      console.log(response.data);
    });
  };

  const handlePay = (id) => {
    const updatedPayment = {
      status: "Payment Completed",
    };

    Axios.put(`http://localhost:3001/completed/${id}`, updatedPayment)
      .then((response) => {
        console.log(response.data);
        // Do something with the updated payment data
      })
      .catch((error) => {
        console.log(error);
        // Handle error
      });

    navigate("/payments");
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h4" align="center" gutterBottom>
          VENDOR - PAYMENT
        </Typography>
      </Grid>
      <Grid item xs={10}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>VENDOR NAME</TableCell>
                <TableCell>ITEM NAME</TableCell>
                <TableCell>QUANTITY</TableCell>
                <TableCell>AMOUNT TO PAY</TableCell>
                <TableCell>ACTION</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {payments.map((payment) => (
                <TableRow key={payment._id}>
                  {fetchVendorName(payment.vendorname)}
                  <TableCell>{vendors?.vendorname}</TableCell>
                  <TableCell>{payment.itemname}</TableCell>
                  <TableCell>{payment.quantity}</TableCell>
                  <TableCell>{payment.amount}</TableCell>
                  <TableCell>
                    <Button
                      sx={{ color: "primary" }}
                      onClick={() => handlePay(payment._id)}
                    >
                      PAY AMOUNT
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
};

export default VendorPay;
