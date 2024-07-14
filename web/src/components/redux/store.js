import { configureStore } from "@reduxjs/toolkit";
import filtersSlice from "../screens/shop/filters/filtersSlice";
import productsSlice from "../public/components/product/productsSlice";
const store = configureStore({
    reducer: {
        filter: filtersSlice.reducer,
        productList: productsSlice.reducer
    }
})
export default store;