import { createSlice } from "@reduxjs/toolkit";

const defaultFilters = {
    name: "",
    priceRange: { min: 0, max: 200 },
    category: { mainCategory: "", subCategory: [] },
    sortBy: "",
    sortOrder: "",
    page: 1,
    limit: 12
};


const initialState = {
    isResetFilter: false,
    searchFields: { ...defaultFilters },
    currentSearchFields: { ...defaultFilters }
};

export const filtersSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        onChangeField: (state, { payload }) => {
            const { field, value, isCurrent, reloadPage } = payload;
            if (isCurrent) {
                state.currentSearchFields[field] = value;
                state.searchFields[field] = value;
            }
            if (reloadPage) {
                state.currentSearchFields.page = 1
                state.searchFields.page = 1
            }
            else state.currentSearchFields[field] = value;
        },
        onChangeCurrentPriceRange: (state, { payload }) => {
            state.currentSearchFields.priceRange = payload;
        },
        onChangeSort: (state, { payload: { sortBy, sortOrder } }) => {
            state.searchFields.sortBy = sortBy;
            state.searchFields.sortOrder = sortOrder;
            state.currentSearchFields.sortBy = sortBy;
            state.currentSearchFields.sortOrder = sortOrder;
            state.currentSearchFields.page = 1
            state.searchFields.page = 1
        },
        toggleSubCategory: (state, { payload }) => {
            const subCategory = state.currentSearchFields.category.subCategory;
            const index = subCategory.indexOf(payload);
            index === -1 ? subCategory.push(payload) : subCategory.splice(index, 1);
        },
        onApplySearchFields: (state) => {
            state.searchFields = { ...state.currentSearchFields };
            state.searchFields.page = 1
            state.currentSearchFields.page = 1
        },
        resetFilters: (state, { payload: mainCategory }) => {
            state.searchFields = { ...defaultFilters, category: { mainCategory, subCategory: [] } };
            state.currentSearchFields = { ...state.searchFields };
            state.isResetFilter = true;
        },
        completeResetFilters: (state) => {
            state.isResetFilter = false;
        }
    }
});

export default filtersSlice;