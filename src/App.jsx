import { Route, Routes } from "react-router-dom";
import "./App.css";
import HomeLanding from "./pages/(buyer)/home-landing/HomeLanding";
import ProductDetail from "./pages/(buyer)/product-detail/ProductDetail";
import Cart from "./pages/(buyer)/cart/Cart";
import ProductList from "./pages/(seller)/product-list/ProductList";
import AddProduct from "./pages/(seller)/add-product/AddProduct";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomeLanding />} />
      <Route path="/:id" element={<ProductDetail />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/product-list" element={<ProductList />} />
      <Route path="/add-product" element={<AddProduct />} />
    </Routes>
  );
}

export default App;
