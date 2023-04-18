const express = require("express");
const connectDB = require('./config/db')
const cors = require("cors");
const BodyParser = require("body-parser");

const app = express();
app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));
app.use(cors());

// Connect Database
connectDB();


const port = process.env.PORT || 3001;

app.listen(port, () => console.log(`Server running on port ${port}`));
