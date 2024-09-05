import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import ProductManager from "./Components/productManager/productManager";
import ProductCard from "./Components/product/product";


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProductManager />}/>
      </Routes>
    </BrowserRouter>
  );
}

