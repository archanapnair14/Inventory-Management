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

const AddCreditNote = () => {
  const [items, setItems] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const cdate = currentDate.toLocaleString();

  const navigate = useNavigate();

  useEffect(() => {
    Axios.get("http://localhost:3001/salesreturn").then((response) => {
      setItems(response.data);
      console.log(response.data);
    });
  }, []);

  const credit = (item) => {
    const data = {
      CreditID: item.salesid,
      reason: item.reason,
      creditNoteDate:cdate,
    };
    Axios.post("http://localhost:3001/credit", data)
      .then((response) => {
        console.log(response);
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
          SALES - RETURNS -CREDIT
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
                    <Button variant="contained" onClick={() => credit(item)}>
                      ADD CREDIT
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

export default AddCreditNote;
