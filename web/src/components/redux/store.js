import { configureStore } from "@reduxjs/toolkit";
import filtersSlice from "../screens/shop/filters/filtersSlice";
import productsSlice from "../public/components/product/productsSlice";
import cardSlice from "../screens/checkout/credit_debit/cardSlice";
import { cartSlice } from "../public/components/header/cartdrop/cartSlice";
const store = configureStore({
    reducer: {
        filter: filtersSlice.reducer,
        productList: productsSlice.reducer,
        card: cardSlice.reducer,
        cart: cartSlice.reducer
    }
})
export default store;