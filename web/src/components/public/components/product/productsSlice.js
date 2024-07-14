import { createSlice } from "@reduxjs/toolkit";
const productsSlice = createSlice({
    name: 'products',
    initialState: {
        data: []
    },
    reducers: {
        onChangeProductList: (state, action) => {
            state.data = action.payload
        }
    }
})
export default productsSlice;