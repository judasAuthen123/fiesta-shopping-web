import { createSlice } from "@reduxjs/toolkit";
export const filtersSlice = createSlice({
    name: 'filter',
    initialState: {
        searchFields: {
            name: "",
            priceRange: {
                min: "0", max: "2000"
            },
            category: {
                mainCategory: "",
                subCategory: []
            },
            sortBy: "",
            sortOrder: "",
            page: 1,
            limit: 16
        },
        currentSearchFields: {
            name: "",
            priceRange: {
                min: "0", max: "2000"
            },
            category: {
                mainCategory: "",
                subCategory: []
            },
            sortBy: "",
            sortOrder: "",
            page: 1,
            limit: 16
        }

    },
    reducers: {
        onChangeName: (state, action) => {
            state.searchFields.name = action.payload
        },
        onPageChange: (state, action) => {
            state.searchFields.page = action.payload
        },
        onChangeCurrentName: (state, action) => {
            state.currentSearchFields.name = action.payload
        },
        onChangeCurrentPriceRange: (state, action) => {
            state.currentSearchFields.priceRange = action.payload
        },
        onMainCategoryCurrentChange: (state, action) => {
            state.currentSearchFields.category.mainCategory = action.payload
        },
        onPageCurrentChange: (state, action) => {
            state.currentSearchFields.page = action.payload
        },
        onApplySearchFields: (state) => {
            state.searchFields = state.currentSearchFields;
        }
    }
})
export default filtersSlice