import { configureStore } from "@reduxjs/toolkit";
import slideSlice from '../screens/shop/filters/slideSlice'
import filtersSlice from "../screens/shop/filters/filtersSlice";
const store = configureStore({
    reducer: {
        slide: slideSlice.reducer,
        filter: filtersSlice.reducer
    }
})
export default store;