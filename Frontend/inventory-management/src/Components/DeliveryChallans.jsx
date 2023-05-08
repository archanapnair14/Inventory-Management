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
const DeliveryChallans = () => {
  const [items, setItems] = useState([]);
  const [customer, setCustomer] = useState();
  const [tno, setTno] = useState();

  useEffect(() => {
    Axios.get("http://localhost:3001/deliveryitems").then((response) => {
      setItems(response.data);
      //   console.log(response.data);
    });
  }, []);

  const fetchCustomerName = (cid) => {
    Axios.get(`http://localhost:3001/customer/${cid}`).then((response) => {
      setCustomer(response.data);
      console.log(response.data);
    });
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h4" align="center" gutterBottom>
          DELIVERY - CHALLANS
        </Typography>
      </Grid>
      <Grid item xs={10}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>CUSTOMER NAME</TableCell>
                <TableCell>ADDRESS</TableCell>
                <TableCell>EMAIL</TableCell>
                <TableCell>AMOUNT</TableCell>
                <TableCell>ORDER DATE</TableCell>
                <TableCell>ACTION</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((item) => (
                <TableRow key={item._id}>
                  {fetchCustomerName(item.cid)}
                  <TableCell>{customer?.name}</TableCell>
                  <TableCell>{item.address}</TableCell>
                  <TableCell>{item.customername}</TableCell>
                  <TableCell>{item.amount}</TableCell>
                  <TableCell>{item.sodate}</TableCell>

                  <TableCell>
                    <Link to={`/challan_generate/${item._id}`}>
                      Generate Challans
                    </Link>
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

export default DeliveryChallans;
