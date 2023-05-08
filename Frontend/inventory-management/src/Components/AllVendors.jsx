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

const Allvendors = () => {
  const [name, setName] = useState([]);
  //   const [button, setButton] = useState([]);

  useEffect(() => {
    Axios.get("http://localhost:3001/allvendors").then((response) => {
      setName(response.data);
      console.log(response.data);
    });
  }, []);

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h4" align="center" gutterBottom>
          ALL- VENDORS
        </Typography>
      </Grid>
      <Grid item xs={10}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>VENDOR NAME</TableCell>
                <TableCell>ADRESS</TableCell>
                <TableCell>EMAIL</TableCell>
                <TableCell>PHONE NUMBER</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {name.map((item) => (
                <TableRow key={item._id}>
                  <TableCell>{item.vendorname}</TableCell>
                  <TableCell>{item.address}</TableCell>
                  <TableCell>{item.email}</TableCell>
                  <TableCell>{item.vphno}</TableCell>
                  <TableCell>
                    <Link to={`/vendors/${item._id}`}>Edit</Link>
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

export default Allvendors;
