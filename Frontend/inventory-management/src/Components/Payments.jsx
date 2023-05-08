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
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const Payments = () => {
  const [payments, setPayments] = useState([]);
  const [vendors, setVendors] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    Axios.get("http://localhost:3001/completedpay").then((response) => {
      setPayments(response.data);
    });
  }, []);

  const fetchVendorName = (vendorId) => {
    Axios.get(`http://localhost:3001/vendors/${vendorId}`).then((response) => {
      setVendors(response.data);
      console.log(response.data);
    });
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h4" align="center" gutterBottom>
          PAYEMENT - DETAILS
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
                <TableCell>AMOUNT PAYED</TableCell>
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
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
};

export default Payments;
