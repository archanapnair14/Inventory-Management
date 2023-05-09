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
  Box,
} from "@mui/material";
import Sidemenus from "./Dashboard";

const DeliveryChallanDetails = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    Axios.get("http://localhost:3001/deliverychallan").then((response) => {
      setItems(response.data);
      console.log(response.data);
    });
  }, []);

  return (
    <Box
      sx={{ display: "flex", backgroundColor: "beige", height: 900, mt: 10 }}
    >
      <Sidemenus />
      {/* <Grid container spacing={3}> */}
        <Grid item xs={10} p={5}>
          <Typography variant="h6" align="center" gutterBottom>
            DELIVERY - CHALLANS - DETAILS
          </Typography>
        </Grid>
        <Grid item xs={6} mt={5}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>REFERENCE NUMBER</TableCell>
                  <TableCell>DELIVERY CHALLAN DATE</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {items.map((item) => (
                  <TableRow key={item._id}>
                    <TableCell>{item.refno}</TableCell>
                    <TableCell>{item.deliverydate}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      {/* </Grid> */}
    </Box>
  );
};

export default DeliveryChallanDetails;
