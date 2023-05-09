import logo from "./logo.svg";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import CreateItemGroup from "./Components/ItemGroup";
import Home from "./Components/Home";
import AddItem from "./Components/NewItem";
import Editsdash from "./Components/ItemDash";
import AddInventoryAdjustment from "./Components/AddInventoryAdjustment";
import ShowInventory from "./Components/ShowInventory";
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
import AddDeliveryChallan from "./Components/AddDeliveryChallan";
import DeliveryChallanDetails from "./Components/DeliveryChallanDetails";
import AllInvoices from "./Components/AllInvoices";
import PaymentsRecievded from "./Components/PaymentsRecievded";
import SalesReturns from "./Components/SalesReturns";
import ViewsalesReturns from "./Components/ViewsalesReturns";
import AddCreditNote from "./Components/AddCreditNote";

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
        <Route exact path="/customer" element={<AddCustomer />} />
        <Route exact path="/customers" element={<TotalCustomers />} />
        <Route exact path="/editcustomer/:id" element={<EditCustomer />} />
        <Route exact path="/sales" element={<NewSalesOrder />} />
        <Route exact path="/shipment" element={<AddPackages />} />
        <Route exact path="/challans" element={<DeliveryChallans />} />
        <Route exact path="/addvendor" element={<AddVendor />} />
        <Route exact path="/allvendors" element={<Allvendors />} />
        <Route exact path="/purchase" element={<AddPurchase />} />
        <Route exact path="/payments" element={<VendorPay />} />
        <Route exact path="/allpayments" element={<Payments />} />
        <Route
          exact
          path="/challan_generate/:id"
          element={<AddDeliveryChallan />}
        />
        <Route exact path="/vendors/:id" element={<Editvendor />} />
        <Route
          exact
          path="/deliverychallans"
          element={<DeliveryChallanDetails />}
        />
        <Route exact path="/allinvoice" element={<AllInvoices />} />
        <Route exact path="/pay" element={<PaymentsRecievded />} />
        <Route exact path="/salereturn" element={<SalesReturns />} />
        <Route exact path="/viewsale" element={<ViewsalesReturns />} />
        <Route exact path="/addcredit" element={<AddCreditNote />} />
      </Routes>
    </>
  );
}

export default App;
