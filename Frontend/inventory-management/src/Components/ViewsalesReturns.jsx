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
        navigate('/page')
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <Grid container spacing={3}>
      <Grid item xs={10}>
        <Typography variant="h6" align="center" gutterBottom>
          SALES -RETURNS - STATUS
        </Typography>
      </Grid>
      <Grid item xs={6}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>SALES ID</TableCell>
                <TableCell>REASON</TableCell>
                <TableCell></TableCell>
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
    </Grid>
  );
};

export default ViewsalesReturns;
