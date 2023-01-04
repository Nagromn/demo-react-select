import styles from "./App.module.css";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import ProductMaker from "./components/ProductMaker/ProductMaker";
import Navbar from "./components/Navbar/Navbar";

export default function App() {
  return (
    <div className={styles.main}>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/produit" element={<ProductMaker />}></Route>
      </Routes>
    </div>
  );
}
