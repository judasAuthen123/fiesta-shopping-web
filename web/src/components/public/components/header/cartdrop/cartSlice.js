import { createSlice } from '@reduxjs/toolkit';
export const cartSlice = createSlice({
    name: "cart",
    initialState: {
        arrId: []
    },
    reducers: {
        onApplyDataCart: (state, action) => {
            const { arrId } = action.payload
            state.arrId = arrId
        },
        onChangeDataCart: (state, action) => {
            const { updateType, _id, variationId } = action.payload
            if (updateType === "remove") {
                state.arrId = state.arrId.filter(item => item._id !== _id)
            } else if (updateType === "add") {
                const exists = state.arrId.some(item => item._id === _id && item.variationId === variationId);
                if (!exists) {
                    state.arrId.push({ _id, variationId });
                }
            }
        }
    }
})