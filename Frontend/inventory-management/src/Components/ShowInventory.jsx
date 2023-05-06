import React, { useEffect, useState } from "react";
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
import Axios from "axios";

const ShowInventory = () => {
  const [items, setItem] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");

  useEffect(() => {
    Axios.get(`http://localhost:3001/inventory`).then((response) => {
      setItem(response.data);
      console.log(response.data);
    });
  }, []);

  const formatDate = (date) => {
    const formattedDate = `${
      date.getMonth() + 1
    }/${date.getDate()}/${date.getFullYear()}`;
    const isoDate = date.toISOString().substring(0, 10);
    return { formattedDate, isoDate };
  };

  const handleDownload = async (id) => {
    setLoading(true);
    try {
      const response = await Axios.get(`http://localhost:3001/files/${id}`, {
        responseType: "blob",
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "file.pdf");
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };
  return (
    <>
      <Grid item xs={6} mt={4}>
        <TextField
          id="date"
          label="Select date"
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={6} mt={4}>
          <Typography variant="h5" align="center" gutterBottom>
            INVENTORY-ADJUSTMENTS
          </Typography>
        </Grid>
        <Grid item xs={10}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ITEM ID</TableCell>
                  <TableCell>REFERENCE NUMBER</TableCell>
                  <TableCell>SELLING PRICE</TableCell>
                  <TableCell>REASON</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {items
                  .filter((item) => {
                    if (selectedDate) {
                      const date = new Date(item.date);
                      const { isoDate } = formatDate(date);
                      console.log(selectedDate)
                      console.log(isoDate)
                      return isoDate === selectedDate;
                    } else {
                      return true;
                    }
                  })
                  .map((item) => (
                    <TableRow key={item._id}>
                      <TableCell>{item.itemid}</TableCell>
                      <TableCell>{item.refno}</TableCell>
                      <TableCell>{item.values}</TableCell>
                      <TableCell>{item.reason}</TableCell>
                      <TableCell>
                        <Button
                          onClick={() => handleDownload(item._id)}
                          size="small"
                          color="primary"
                          disabled={loading}
                        >
                          {loading ? "Downloading..." : "Download File"}
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

export default ShowInventory;
