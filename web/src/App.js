import React from "react";
import Home from "./components/screens/home/Home";
import Shop from "./components/screens/shop/Shop";
import ProductDetail from "./components/screens/productdetail/ProductDetail";
import { Routes, Route, Navigate } from "react-router-dom";
import Checkout from "./components/screens/checkout/Checkout";
import ShippingAddress from "./components/screens/shipping/ShippingAddress";
import Payment from "./components/screens/payment/Payment";
import Profile from "./components/screens/profile/Profile";
function App() {
  return (
    <div>
      <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/productDetail/:id" element={<ProductDetail />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/shippingAddress" element={<ShippingAddress />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
    </div>
  )
}

export default App;
