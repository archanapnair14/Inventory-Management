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
const { Shipment } = require("./model/ShipmentSchema");
const Vendors = require("./model/vendorSchema");
const Purchases = require("./model/purchaseSchema");
const DeliveryChallan = require("./model/deliveryChallans");
const { Invoice } = require("./model/invoiceModel");
const { salesReturns } = require("./model/salesReturn");
const { creditNote } = require("./model/creditNoteModel");

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
    const cdetails = await customerModel.findOne({ email: customername });
    const idetails = await AllItems.findOne({ _id: itemname });

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
        _id: itemname,
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
      itemname: idetails._id,
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

app.get("/confirmeditems", async (req, res) => {
  try {
    const confirmedItems = await Salesorders.find({ status: "confirmed" });

    if (confirmedItems.length === 0) {
      return res.status(404).json({ message: "No confirmed items found" });
    }

    res.status(200).json(confirmedItems);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

app.get("/sales/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const result = await Salesorders.findOne({ _id: id });
    res.send(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.get("/items/:itemname", async (req, res) => {
  try {
    const item = req.params.itemname;
    const result = await AllItems.findOne({ _id: item });
    res.send(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.get("/allitems/:_id", async (req, res) => {
  try {
    const item = req.params._id;
    const result = await AllItems.findOne({ _id: item });
    res.send(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.post("/shipment", async (req, res) => {
  try {
    // Extract the data from the request body
    const { salesid, trackingno, tamount, sdate } = req.body;

    // Create a new shipment object and save it to the database
    const newShipment = new Shipment({
      salesid,
      trackingno,
      tamount,
      sdate,
    });
    await newShipment.save();

    // Update the status field of the sales order to "shipped"
    const salesorder = await Salesorders.findOneAndUpdate(
      { _id: salesid },
      { status: "shipment created" },
      { new: true }
    );

    // Send a success response
    res
      .status(200)
      .json({ message: "Shipment created successfully", data: salesorder });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

app.get("/deliveryitems", async (req, res) => {
  try {
    const Items = await Salesorders.find({ status: "shipment created" });

    if (Items.length === 0) {
      return res.status(404).json({ message: "No items found" });
    }

    res.status(200).json(Items);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

app.post("/addvendor", async (req, res) => {
  const { vendorname, address, email, vphno } = req.body;

  if (!vendorname || !address || !email || !vphno) {
    return res.status(400).json({ message: "Please enter all fields" });
  }

  try {
    const user = await Vendors.findOne({ email });
    if (user) throw Error("User already exists");

    console.log(req.body);
    console.log(req.body);
    let data = new Vendors({
      vendorname: req.body.vendorname,
      address: req.body.address,
      email: req.body.email,
      vphno: req.body.vphno,
    });
    console.log(data);
    await data.save();

    res.json({ status: "success", data: data });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

// FETCH VENDORS
app.get("/allvendors", async (req, res) => {
  try {
    const Items = await Vendors.find();
    res.json(Items);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// FETCH VENDOR BY ID
app.get("/vendors/:id", async (req, res) => {
  try {
    var id = req.params.id;
    var data = req.body;
    const result = await Vendors.findById({ _id: id }, data);
    res.send(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// EDIT VENDORS
app.put("/editvendors/:id", async (req, res) => {
  const id = req.params.id;
  const { vendorname, address, email, vphno } = req.body;

  try {
    const vendor = await Vendors.findByIdAndUpdate(
      id,
      {
        vendorname: vendorname,
        address: address,
        email: email,
        vphno: vphno,
      },
      { new: true }
    );

    if (!vendor) {
      return res.status(404).json({ message: "Customer not found" });
    }

    res.json(vendor);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// ADD PURCHASE
app.post("/addpurchase", async (req, res) => {
  const { vendorname, itemname, quantity, amount, status } = req.body;
  try {
    const purchase = new Purchases({
      vendorname,
      itemname,
      quantity,
      amount,
      status,
    });
    const purchaseRegister = await purchase.save();
    if (purchaseRegister) {
      res.status(201).json({ message: "Purchase registered" });
    } else {
      res.status(500).json({ error: "Failed to register" });
    }
  } catch (err) {
    console.log(err);
  }
});

// PAYMENTS
app.get("/payments", async (req, res) => {
  try {
    const Items = await Purchases.find({ status: "payment pending" });

    if (Items.length === 0) {
      return res.status(404).json({ message: "No items found" });
    }

    res.status(200).json(Items);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

// Update payment status
app.put("/completed/:id", async (req, res) => {
  try {
    const payment = await Purchases.findById(req.params.id);
    if (!payment) {
      return res.status(404).json({ message: "Payment not found" });
    }
    payment.status = "payment completed";
    const updatedPayment = await payment.save();
    res.json(updatedPayment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get("/completedpay", async (req, res) => {
  try {
    const Items = await Purchases.find({ status: "payment completed" });

    if (Items.length === 0) {
      return res.status(404).json({ message: "No items found" });
    }

    res.status(200).json(Items);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

app.get("/items/:itemname/:id", async (req, res) => {
  try {
    const { itemname, id } = req.params;

    const item = await AllItems.findOne({ ItemName: itemname });
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    const sale = await Salesorders.findById(id);
    if (!sale) {
      return res.status(404).json({ message: "Sale not found" });
    }

    const data = {
      item: item,
      sale: sale,
    };

    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

app.get("/shipment/:salesId/trackingno", async (req, res) => {
  try {
    const id = req.params.salesId;
    const shipment = await Shipment.findOne({ salesid: id });
    if (!shipment) {
      return res.status(404).json({ message: "Shipment not found" });
    }
    const { trackingno } = shipment;
    res.json({ trackingno });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.post("/deliverychallan", async (req, res) => {
  const { refno, deliverydate, salesId } = req.body;

  try {
    // Store delivery challan data
    const deliveryChallan = await DeliveryChallan.create({
      refno,
      deliverydate,
      salesId,
    });

    // Update status of sales schema to "shipped"
    const sales = await Salesorders.findOneAndUpdate(
      { _id: salesId },
      { status: "shipped" },
      { new: true }
    );

    res.status(200).json({ deliveryChallan, sales });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message:
        "Error occurred while storing delivery challan and updating sales status.",
    });
  }
});

// FETCH DELIVERYCHALLANS
app.get("/deliverychallan", async (req, res) => {
  try {
    const Items = await DeliveryChallan.find();
    res.json(Items);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

app.get("/sales", async (req, res) => {
  try {
    const Items = await Salesorders.find({ status: "shipped" });

    if (Items.length === 0) {
      return res.status(404).json({ message: "No items found" });
    }

    res.status(200).json(Items);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

app.get("/saleslist", async (req, res) => {
  try {
    const Items = await Salesorders.find({ status: "delivered" });

    if (Items.length === 0) {
      return res.status(404).json({ message: "No items found" });
    }

    res.status(200).json(Items);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

app.get("/saleslists", async (req, res) => {
  try {
    const salesOrders = await Salesorders.find({ status: "delivered" });

    if (salesOrders.length === 0) {
      return res.status(404).json({ message: "No sales orders found" });
    }

    const salesReturnOrders = await salesReturns.find({});
    const salesReturnIds = salesReturnOrders.map((order) => order.salesid);

    const filteredSalesOrders = salesOrders.filter(
      (order) => !salesReturnIds.includes(order._id.toString())
    );

    res.status(200).json(filteredSalesOrders);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

//INVOICE
app.post("/invoice", (req, res) => {
  const { invoiceDate, customerId, itemName, quantity, salesId, amount } =
    req.body;

  const newInvoice = new Invoice({
    invoiceDate,
    customerId,
    itemName,
    quantity,
    salesId,
    amount,
  });

  newInvoice
    .save()
    .then(() => {
      Salesorders.findByIdAndUpdate(salesId, { status: "delivered" })
        .then(() => {
          // console.log("Sales order status updated to delivered");
          res.status(200).send("Invoice added successfully!");
        })
        .catch((err) => {
          console.log(err);
          res.status(500).send(err);
        });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send(err);
    });
});

// RETURN SALES

app.post("/salesreturn", async (req, res) => {
  const { salesid, date, reason, status } = req.body;

  try {
    const newSalesReturn = new salesReturns({
      salesid,
      date,
      reason,
      status,
    });

    const savedSalesReturn = await newSalesReturn.save();
    console.log(savedSalesReturn);
    res.status(200).send("Sales return record added successfully!");
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

// SALES RETURN LIST
app.get("/salesreturns", async (req, res) => {
  try {
    const Items = await salesReturns.find({ status: "Returned" });
    res.json(Items);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

app.put("/salesreturns/:id", async (req, res) => {
  try {
    const salesReturn = await salesReturns.findById(req.params.id);

    if (!salesReturn) {
      return res.status(404).json({ message: "Sales return not found" });
    }

    salesReturn.status = "approved";
    await salesReturn.save();

    res.status(200).json(salesReturn);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

// SALES RETURN LIST
app.get("/salesreturns", async (req, res) => {
  try {
    const Items = await salesReturns.find({ status: "Returned" });
    res.json(Items);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

app.put("/salesreturns/:id", async (req, res) => {
  try {
    const salesReturn = await salesReturns.findById(req.params.id);

    if (!salesReturn) {
      return res.status(404).json({ message: "Sales return not found" });
    }

    salesReturn.status = "approved";
    await salesReturn.save();

    res.status(200).json(salesReturn);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

// SALES RETURN LIST
app.get("/salesreturns", async (req, res) => {
  try {
    const Items = await salesReturns.find({ status: "Returned" });
    res.json(Items);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

app.put("/salesreturns/:id", async (req, res) => {
  try {
    const salesReturn = await salesReturns.findById(req.params.id);

    if (!salesReturn) {
      return res.status(404).json({ message: "Sales return not found" });
    }

    salesReturn.status = "approved";
    await salesReturn.save();

    res.status(200).json(salesReturn);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

// SALES CREDIT LIST
app.get("/salesreturn", async (req, res) => {
  try {
    const Items = await salesReturns.find({ status: "approved" });
    res.json(Items);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// create a new credit note
app.post("/credit", async (req, res) => {
  try {
    const { CreditID, reason, creditNoteDate } = req.body;

    // Save the credit note to the CreditNotes collection
    const credit = new creditNote({
      CreditID,
      reason,
      creditNoteDate,
    });
    const savedCredit = await credit.save();

    // Update the SalesReturns document to mark it as credited
    const salesReturn = await salesReturns.findOneAndUpdate(
      { salesid: CreditID },
      { status: "credited" },
      { new: true }
    );

    res.status(200).json(savedCredit);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Server running on port ${port}`));
