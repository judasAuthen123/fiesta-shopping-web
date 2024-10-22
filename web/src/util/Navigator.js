import React, { useContext } from "react";
import Home from "../components/screens/home/Home";
import Shop from "../components/screens/shop/Shop";
import ProductDetail from "../components/screens/productdetail/ProductDetail";
import { Routes, Route, Navigate } from "react-router-dom";
import Cart from "../components/screens/cart/Cart";
import Profile from "../components/screens/profile/Profile";
import ShopByCategories from "../components/screens/shop/ShopByCategories";
import Login from '../components/screens/login/Login';
import Register from '../components/screens/register/Register';
import Checkout from "../components/screens/checkout/Checkout";
import OrderDetail from "../components/screens/orderdetail/OrderDetail";
import { AppContext } from "./AppContext";
function AppNavigator() {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="/home" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/productDetail/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<AuthRoute><Cart /></AuthRoute>} />
            <Route path="/checkout" element={<AuthRoute><Checkout /></AuthRoute>} />
            <Route path="/profile" element={<AuthRoute><Profile /></AuthRoute>} />
            <Route path="/order-detail" element={<AuthRoute><OrderDetail /></AuthRoute>} />
            <Route path="/shop/:id" element={<ShopByCategories />} />
            <Route path="/login" element={<AuthLogin><Login /></AuthLogin>} />
            <Route path="/register" element={<AuthLogin><Register /></AuthLogin>} />
        </Routes>
    )
}
function AuthRoute({ children }) {
    const { dataUser, token } = useContext(AppContext)
    return (
        <>
            {
                dataUser && token ? children : <Navigate to={'/login'} />
            }
        </>
    )
}
function AuthLogin({ children }) {
    const { dataUser, token } = useContext(AppContext)
    return (
        <>
            {
                !dataUser || !token ? children : <Navigate to={'/'} />
            }
        </>
    )
}
export default AppNavigator;