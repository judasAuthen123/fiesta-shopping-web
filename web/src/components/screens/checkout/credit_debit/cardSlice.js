import { createSlice } from "@reduxjs/toolkit";
const cardSlice = createSlice({
    name: 'card',
    initialState: {
        defaultId: '',
        cardInfo: {}
    },
    reducers: {
        onChangeDefaultId: (state, action) => {
            state.defaultId = action.payload
        },
        onChangeCardInfo: (state, action) => {
            state.cardInfo = action.payload
        }
    }
})
export default cardSlice