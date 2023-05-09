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
import { useNavigate } from "react-router-dom";
import Sidemenus from "./Dashboard";

const ViewsalesReturns = () => {
  const [items, setItems] = useState([]);
  const [status, setStatus] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    Axios.get("http://localhost:3001/salesreturns").then((response) => {
      setItems(response.data);
      console.log(response.data);
    });
  }, []);

  const approve = (item) => {
    Axios.put(`http://localhost:3001/salesreturns/${item._id}`, {
      status: "approved",
    })
      .then((response) => {
        setStatus(response.data.status);
        navigate('/')
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <Box
    sx={{ display: "flex", backgroundColor: "beige", height: 900, mt: 10 }}
  >
    <Sidemenus/>
    {/* <Grid container spacing={3}> */}
      <Grid item xs={10} p={3}>
        <Typography variant="h6" align="center" gutterBottom>
          SALES -RETURNS 
        </Typography>
      </Grid>
      <Grid item xs={6} mt={4}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>SALES ID</TableCell>
                <TableCell>REASON</TableCell>
                <TableCell>ACTION</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((item) => (
                <TableRow key={item._id}>
                  <TableCell>{item.salesid}</TableCell>
                  <TableCell>{item.reason}</TableCell>
                  <TableCell>
                    <Button variant="contained" onClick={() => approve(item)}>
                      APPROVE
                    </Button>
                  </TableCell>
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

export default ViewsalesReturns;
