import logo from "./logo.svg";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import CreateItemGroup from "./Components/ItemGroup";
import Home from "./Components/Home";
import AddItem from "./Components/NewItem";
import Editsdash from "./Components/ItemDash";
import AddInventoryAdjustment from "./Components/AddInventoryAdjustment";
import ShowInventory from "./Components/ShowInventory";
import SignUp from "./Components/SignUp";
import Login from "./Components/SignIn";
import Pages from "./Components/Pages";
import Page from "./Components/Page";
import AddCustomer from "./Components/AddCustomer";
import TotalCustomers from "./Components/TotalCustomers";
import EditCustomer from "./Components/EditCustomer";
import NewSalesOrder from "./Components/NewSalesOrder";
import AddPackages from "./Components/AddPackages";
import DeliveryChallans from "./Components/DeliveryChallans";
import AddVendor from "./Components/AddVendor";
import Allvendors from "./Components/AllVendors";
import Editvendor from "./Components/Editvendor";
import AddPurchase from "./Components/AddPurchase";
import VendorPay from "./Components/Vendorpay";
import Payments from "./Components/Payments";

function App() {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/AddItem" element={<AddItem />} />
        <Route exact path="/ItemGroup" element={<CreateItemGroup />} />
        <Route exact path="/ItemDash" element={<Editsdash />} />
        <Route
          exact
          path="/Inventory/:id"
          element={<AddInventoryAdjustment />}
        />
        <Route exact path="/InventoryList" element={<ShowInventory />} />
        <Route exact path="/signup" element={<SignUp />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/pages" element={<Pages />} />
        <Route exact path="/page" element={<Page />} />
        <Route exact path="/customer" element={<AddCustomer />} />
        <Route exact path="/customers" element={<TotalCustomers />} />
        <Route exact path="/editcustomer/:id" element={<EditCustomer />} />
        <Route exact path="/sales" element={<NewSalesOrder />} />
        <Route exact path="/shipment" element={<AddPackages />} />
        <Route exact path="/challans" element={<DeliveryChallans />} />
        <Route exact path="/addvendor" element={<AddVendor/>} />
        <Route exact path="/allvendors" element={<Allvendors/>} />
        <Route exact path="/purchase" element={<AddPurchase/>} />
        <Route exact path="/payments" element={<VendorPay/>} />
        <Route exact path="/allpayments" element={<Payments/>} />



        <Route
          exact
          path="/vendors/:id"
          element={<Editvendor/>}
        />

      </Routes>
    </>
  );
}

export default App;
