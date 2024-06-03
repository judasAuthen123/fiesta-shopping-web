import { createSlice } from "@reduxjs/toolkit";
const slideSlice = createSlice({
    name: 'slide',
    initialState: {
        height: 0
    },
    reducers: {
        onHeightChange: (state, action) => {
            state.height = action.payload;
        },
        onHeightIncrement: (state, action) => {
            state.height += action.payload
        },
        onHeightDecrement: (state, action) => {
            state.height -= action.payload
        }
    }
});
export default slideSlice;