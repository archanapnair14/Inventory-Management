const express = require("express");
// const connectDB = require("./config/db");
const cors = require("cors");
const Mongoose = require("mongoose");
const BodyParser = require("body-parser");
const { userModel } = require("./model/users");
const { AllItems } = require("./model/itemSchema");
const { ItemGroup } = require("./model/itemGroup");
const upload = require("./middleware/upload");
const { inventory } = require("./model/inventoryAdjustement");
const fs = require("fs");
const path = require("path");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { customerModel } = require("./model/customer");
const Salesorders = require("./model/salesSchema");

const app = express();
app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));
app.use(cors());

// Connect Database
Mongoose.connect(
  "mongodb+srv://Archana:Archana@cluster0.d5wvbdh.mongodb.net/Inventory_db?retryWrites=true&w=majority",
  { useNewUrlParser: true }
);

// ADD ITEMS
app.post("/additems", upload.single("files"), async (req, res) => {
  const {
    itemName,
    unit,
    sellingPrice,
    costPrice,
    dimension,
    weight,
    manufacturer,
    brand,
    description,
    openingStock,
    reorderPoint,
    preferredvendor,
    category,
    estatus,
  } = req.body; // Fetching data entered into field variables
  try {
    const item = new AllItems({
      itemName,
      unit,
      sellingPrice,
      costPrice,
      dimension,
      weight,
      manufacturer,
      brand,
      description,
      openingStock,
      reorderPoint,
      preferredvendor,
      category,
      estatus,
    }); // Creating new user
    if (req.file) {
      item.files = req.file.path;
    }
    const itemRegister = await item.save();
    if (itemRegister) {
      res.status(201).json({ message: "Item registered" });
    } else {
      res.status(500).json({ error: "Failed to register item" });
    }
  } catch (err) {
    console.log(err);
  }
});

//ADD ItemGroup
app.post("/addgroup", upload.single("files"), async (req, res) => {
  const { category, description } = req.body; // Fetching data entered into field variables
  try {
    const item = new ItemGroup({
      category,
      description,
    }); // Creating new user
    if (req.file) {
      item.files = req.file.path;
    }
    const itemRegister = await item.save();
    if (itemRegister) {
      res.status(201).json({ message: "Item Group registered" });
    } else {
      res.status(500).json({ error: "Failed to register item group" });
    }
  } catch (err) {
    console.log(err);
  }
});

// GET ALL ITEMS
app.get("/allitems", async (req, res) => {
  try {
    const Items = await AllItems.find();
    res.json(Items);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//FETCH CATEGORY
app.get("/category", async (req, res) => {
  try {
    const category = await ItemGroup.find();
    res.json(category);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//ADD INVENTORYADJUSTMENT
app.post("/inventory", upload.single("files"), async (req, res) => {
  const { mode, refno, itemid, Quantity, values, date, reason, description } =
    req.body; // Fetching data entered into field variables
  try {
    const inventroyitem = new inventory({
      mode,
      refno,
      itemid,
      Quantity,
      values,
      date,
      reason,
      description,
    }); // Creating new user
    if (req.file) {
      inventroyitem.files = req.file.path;
    }
    const itemRegister = await inventroyitem.save();
    if (itemRegister) {
      res.status(201).json({ message: "Inventroy adjustment added" });
    } else {
      res.status(500).json({ error: "Failed to  add Inventroy adjustment" });
    }
  } catch (err) {
    console.log(err);
  }
});

//UPDATE ITEMS FIELD
app.put("/updateItem/:id", upload.single("files"), async (req, res) => {
  const { unit, sellingPrice } = req.body; // Fetching updated values
  try {
    const item = await AllItems.findById(req.params.id); // Finding the item to update
    if (item) {
      // Update the unit and sellingPrice values only
      item.unit = unit || item.unit;
      item.sellingPrice = sellingPrice || item.sellingPrice;
      // Check if a new file was uploaded and update the files property
      if (req.file) {
        item.files = req.file.path;
      }
      const updatedItem = await item.save(); // Save the updated item
      // Update the estatus field separately
      updatedItem.estatus = "edited";
      await updatedItem.save();
      res.status(200).json({ message: "Item updated", item: updatedItem });
    } else {
      res.status(404).json({ error: "Item not found" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to update item" });
  }
});

//FETCH INVENTORY
app.get("/inventory", async (req, res) => {
  try {
    const invent = await inventory.find();
    res.json(invent);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//FETCH BY ID
app.get("/allitems/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const items = await AllItems.findById({ _id: id });
    res.json(items);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

//File Download API
app.get("/files/:_id", async (req, res) => {
  const fileId = req.params._id;
  try {
    console.log("fileId:", fileId); // Log the fileId variable
    const file = await inventory.findById(fileId);
    if (!file) {
      return res.status(404).send("File not found");
    }
    const filePath = file.files;

    console.log("filePath:", filePath); // Log the filePath variable

    if (fs.existsSync(filePath)) {
      const file = fs.readFileSync(filePath);
      res.contentType("application/pdf");
      res.send(file);
    } else {
      res.status(404).send("File not found");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal server error");
  }
});

//Signup API

app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "Please enter all fields" });
  }

  try {
    const user = await userModel.findOne({ email });
    if (user) throw Error("User already exists");

    const salt = await bcrypt.genSalt(10);
    if (!salt) throw Error("Something went wrong with bcrypt");

    const hash = await bcrypt.hash(password, salt);
    if (!hash) throw Error("Something went wrong hashing the password");

    console.log(req.body);
    console.log(req.body);
    let data = new userModel({
      name: req.body.name,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 10),
    });
    console.log(data);
    await data.save();

    res.json({ status: "success", data: data });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

//SignIn API

app.post("/signin", async (req, res) => {
  var getEmail = req.body.email;
  var password = req.body.password;

  try {
    let data = await userModel.findOne({ email: getEmail });
    if (data) {
      const passwordValidator = bcrypt.compareSync(password, data.password);
      if (passwordValidator) {
        jwt.sign(
          { email: getEmail, id: data._id },
          "Inventory",
          { expiresIn: "1d" },
          (err, token) => {
            if (err) {
              res.json({ status: "error", error: err });
            } else {
              res.json({ status: "success", data: data, token: token });
            }
          }
        );
      } else {
        res.json({ status: "failed", data: "invalid password" });
      }
    } else {
      res.json({ status: "failed", data: "invalid email id" });
    }
  } catch (error) {
    res.json({ status: "error", error: error });
  }
});

//ADD CUSTOMER
app.post("/customer", async (req, res) => {
  const { name, email, address } = req.body;

  if (!name || !email || !address) {
    return res.status(400).json({ message: "Please enter all fields" });
  }

  try {
    const user = await customerModel.findOne({ email });
    if (user) throw Error("User already exists");

    console.log(req.body);
    console.log(req.body);
    let data = new customerModel({
      name: req.body.name,
      email: req.body.email,
      address: req.body.address,
    });
    console.log(data);
    await data.save();

    res.json({ status: "success", data: data });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

// FETCH CUSTOMERS
app.get("/allcustomers", async (req, res) => {
  try {
    const Items = await customerModel.find();
    res.json(Items);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// DELETE CUSTOMER
app.delete("/customer/:_id", async (req, res) => {
  try {
    var id = req.params._id;
    var data = req.body;
    const result = await customerModel.findOneAndDelete({ _id: id }, data);
    res.send(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// FETCH CUSTOMERS BY ID
app.get("/customer/:id", async (req, res) => {
  try {
    var id = req.params.id;
    var data = req.body;
    const result = await customerModel.findById({ _id: id }, data);
    res.send(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// EDIT CUSTOMERS
app.put("/editcustomers/:id", async (req, res) => {
  const id = req.params.id;
  const { name, email, address } = req.body;

  try {
    const customer = await customerModel.findByIdAndUpdate(
      id,
      {
        name: name,
        email: email,
        address: address,
      },
      { new: true }
    );

    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    res.json(customer);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

//SALES ORDER

app.post("/newsalesorder", async (req, res) => {
  const { customername, itemname, squantity, shipcost, sodate, status } =
    req.body;

  try {
    const cdetails = await customerModel.findOne({ name: customername });
    const idetails = await AllItems.findOne({ itemName: itemname });

    if (!idetails) {
      throw new Error(`Item '${itemname}' not found`);
    }

    const sq = parseInt(squantity);

    if (!Number.isInteger(sq)) {
      throw new Error(`Invalid quantity '${squantity}'`);
    }

    const quant = idetails.unit - sq;

    await AllItems.updateOne(
      {
        itemName: itemname,
      },
      {
        $set: {
          unit: quant,
        },
      }
    );

    const address = cdetails.address;
    const cid = cdetails._id;
    const sc = parseInt(shipcost);
    const amount = idetails.sellingPrice * sq + sc;
    const pamount = amount;

    const salesorder = new Salesorders({
      customername,
      address,
      cid,
      itemname,
      squantity,
      shipcost,
      amount,
      pamount,
      sodate,
      status,
    });

    const soRegister = await salesorder.save();
    if (soRegister) {
      res.status(201).json({ message: "Sales order registered" });
    } else {
      res.status(500).json({ error: "Failed to register" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Server running on port ${port}`));
