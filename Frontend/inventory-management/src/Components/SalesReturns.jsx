import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import {
  Container,
  Typography,
  TextField,
  FormControl,
  Select,
  MenuItem,
  Button,
  InputLabel,
  Grid,
} from "@mui/material";
import Axios from "axios";
import { useForm } from "react-hook-form";

const SalesReturns = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    trigger,
  } = useForm();

  const [cdetails, setcdetails] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const cdate = currentDate.toLocaleString();
  const [SalesId, setSelectedSalesId] = useState("");
  const [idetails, setidetails] = useState();
  const [sales, setSales] = useState();

  useEffect(() => {
    Axios.get("http://localhost:3001/saleslists").then((response) => {
      setcdetails(response.data);
      console.log(response.data);
    });
  }, []);

  const handleSalesChange = (SalesId) => {
    console.log(SalesId);
    Axios.get(`http://localhost:3001/sales/${SalesId}`).then((response) => {
      setSales(response.data);
      const itemname = response.data.itemname;
      //   console.log(itemname);

      Axios.get(`http://localhost:3001/items/${itemname}`).then((response) => {
        setidetails(response.data);
        // console.log(response.data);
      });
    });
  };

  const onSubmit = async (data) => {
    console.log(data);

    fetch("http://localhost:3001/salesreturn", {
      method: "POST",
      body: JSON.stringify({
        salesid: data.salesid,
        date: cdate,
        reason: data.reason,
        status: "Returned",
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    reset();
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 3 }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Typography variant="h4" align="center" gutterBottom>
            <span className="fontfamabout">SALES - RETURN</span>
          </Typography>
          <Grid item xs={12} sm={6}>
            <InputLabel>SELECT SALES ID</InputLabel>
            <Select
              {...register("salesid", {
                required: "Sales Id is required",
              })}
              variant="outlined"
              fullWidth
              label="Sales ID"
              error={Boolean(errors.salesid)}
              helperText={errors.salesid?.message}
              defaultValue={SalesId}
              onChange={(e) => handleSalesChange(e.target.value)}
            >
              <MenuItem value="">Select</MenuItem>
              {cdetails.map((val, key) => (
                <MenuItem key={key} value={val._id}>
                  {val._id}
                </MenuItem>
              ))}
            </Select>
          </Grid>
          <Grid item xs={12} sm={6}>
            <InputLabel>ITEM NAME</InputLabel>

            <TextField
              id="itemname"
              value={idetails?.itemName}
              type="text"
              {...register("itemname", { required: true })}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="reason"
              label="Reason"
              type="text"
              {...register("reason", { required: true })}
            />
          </Grid>
          <Button
            sx={{ mt: 6, ml: 3, width: "70%" }}
            type="submit"
            variant="contained"
            color="primary"
          >
            sales return{" "}
          </Button>
        </Grid>
      </form>
    </Container>
  );
};

export default SalesReturns;
