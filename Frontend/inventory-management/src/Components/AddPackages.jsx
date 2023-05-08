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

const AddPackages = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    trigger,
  } = useForm();

  const [cdetails, setcdetails] = useState([]);
  const [idetails, setidetails] = useState();
  const [sales, setSales] = useState();
  const [selectedSalesId, setSelectedSalesId] = useState("");
  const [currentDate, setCurrentDate] = useState(new Date());
  const cdate = currentDate.toLocaleString();

  useEffect(() => {
    Axios.get("http://localhost:3001/confirmeditems").then((response) => {
      setcdetails(response.data);
    });
  }, []);

  const handleSalesIdChange = (salesId) => {
    setSelectedSalesId(salesId);
    console.log(salesId);
    Axios.get(`http://localhost:3001/sales/${salesId}`).then((response) => {
      setSales(response.data);
      const itemname = response.data.itemname;

      Axios.get(`http://localhost:3001/items/${itemname}`).then((response) => {
        setidetails(response.data);
      });
    });
  };

  const onSubmit = async (data) => {
    await trigger();

    console.log(data);
    fetch("http://localhost:3001/shipment", {
      method: "POST",
      body: JSON.stringify({
        salesid: data.salesid,
        trackingno: data.trackingno,
        tamount: data.tamount,
        sdate: cdate,
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
            <span className="fontfamabout">N E W - P A C K A G E S</span>
          </Typography>
          <Grid item xs={12} sm={6}>
            <InputLabel>Select salesId</InputLabel>
            <Select
              {...register("salesid", {
                required: "slaesid is required",
              })}
              variant="outlined"
              fullWidth
              label="Sales Id"
              error={Boolean(errors.salesid)}
              helperText={errors.salesid?.message}
              value={selectedSalesId}
              onChange={(e) => handleSalesIdChange(e.target.value)}
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
            <InputLabel>Quantity</InputLabel>
            <TextField
              id="quantity"
              type="number"
              name="quantity"
              readOnly={true}
              value={sales?.squantity}
              {...register("quantity", { required: true })}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <InputLabel>Shipping Cost</InputLabel>
            <TextField
              id="shipcost"
              type="shipcost"
              name="shipcost"
              value={sales?.shipcost}
              {...register("shipcost", { required: true })}
              readOnly
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <InputLabel>Total Amount</InputLabel>

            <TextField
              sx={{ mt: 3 }}
              variant="outlined"
              name="tamount"
              value={sales?.amount}
              fullWidth
              autoComplete="cmnt"
              autoFocus
              {...register("tamount", {
                required: "Required field",
              })}
              error={!!errors?.cmnt}
              helperText={errors?.cmnt ? errors.cmnt.message : null}
              readOnly
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="trackingno"
              label="Tracking Number"
              type="text"
              {...register("trackingno", { required: true })}
            />
          </Grid>

          <Button
            sx={{ mt: 6, ml: 3, width: "70%" }}
            type="submit"
            variant="contained"
            color="primary"
          >
            Ship Item
          </Button>
        </Grid>
      </form>
    </Container>
  );
};

export default AddPackages;
