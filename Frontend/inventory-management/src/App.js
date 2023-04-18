import logo from "./logo.svg";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import CreateItem from "./Components/NewItem";
import CreateItemGroup from "./Components/ItemGroup";
import Home from "./Components/Home";

function App() {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/AddItem" element={<CreateItem/>} />
        <Route exact path="/ItemGroup" element={<CreateItemGroup />} />
      </Routes>
    </>
  );
}

export default App;
