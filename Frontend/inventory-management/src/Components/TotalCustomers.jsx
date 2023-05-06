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

const TotalCustomers = () => {
  const [customer, setCustomer] = useState([]);

  useEffect(() => {
    Axios.get("http://localhost:3001/allcustomers").then((response) => {
      setCustomer(response.data);
      console.log(response.data);
    });
  }, []);

  const handleDelete = (_id) => {
    Axios.delete(`http://localhost:3001/customer/${_id}`).then(() => {
      getData();
    });
  };
  const getData = () => {
    Axios.get("http://localhost:3001/allcustomers").then((getData) => {
      setCustomer(getData.data);
    });
  };
  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={6} mt={4}>
          <Typography variant="h5" align="center" gutterBottom>
            ALL - CUSTOMERS
          </Typography>
        </Grid>
        <Grid item xs={10}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>CUSTOMER NAME</TableCell>
                  <TableCell>EMAIL</TableCell>
                  <TableCell>ADDRESS</TableCell>
                  <TableCell>ACTION</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {customer.map((item) => (
                  <TableRow key={item._id}>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.email}</TableCell>
                    <TableCell>{item.address}</TableCell>
                    <TableCell>
                      <Link to={`/editcustomer/${item._id}`}>Edit</Link>{" "}
                      <Button
                        sx={{ color: "primary" }}
                        onClick={() => handleDelete(item._id)}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </>
  );
};

export default TotalCustomers;
