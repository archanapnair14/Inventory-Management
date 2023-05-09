import React from "react";
import { Box } from "@mui/system";
import Sidemenus from "./Dashboard";

const Home = () => {
  return (
    <>
      <Box sx={{ display: "flex", backgroundColor: "beige", height: 900 }}>
        <Sidemenus />
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "fixed",
            width: "50%",
            left: "35%",
            top: "20%",
          }}
        >
          <img
            src="https://savedelete.com/wp-content/uploads/2020/09/Inventory-Management.jpg"
            alt="Your image" style={{ width: "100%" }}
          />
        </Box>
      </Box>
    </>
  );
};

export default Home;
