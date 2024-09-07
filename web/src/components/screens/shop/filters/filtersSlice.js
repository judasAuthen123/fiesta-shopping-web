import { createSlice } from "@reduxjs/toolkit";
const loadState = () => {
    try {
        const serializedState = localStorage.getItem('filters');
        if (serializedState === null) {
            return undefined;
        } else if (serializedState.category?.mainCategory) {
            return {
                name: "",
                priceRange: {
                    min: "0", max: "2000"
                },
                category: {
                    mainCategory: serializedState.category.mainCategory,
                    subCategory: []
                },
                sortBy: "",
                sortOrder: "",
                page: 1,
                limit: 3
            }
        } else {
            return JSON.parse(serializedState)
        }
    } catch (err) {
        console.error("Could not load state", err);
        return undefined;
    }
};

// Hàm để lưu state vào localStorage
const saveState = (state) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('filters', serializedState);
    } catch (err) {
        console.error("Could not save state", err);
    }
};
const initialState = loadState() || {
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
        limit: 3
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
        limit: 3
    }
};
export const filtersSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        onChangeName: (state, action) => {
            state.searchFields.name = action.payload;
            state.currentSearchFields.name = action.payload;
        },
        onPageChange: (state, action) => {
            state.searchFields.page = action.payload;
            state.currentSearchFields.page = action.payload;
        },
        onChangeCurrentName: (state, action) => {
            state.currentSearchFields.name = action.payload;
        },
        onChangeCurrentPriceRange: (state, action) => {
            state.currentSearchFields.priceRange = action.payload;
        },
        onMainCategoryCurrentChange: (state, action) => {
            state.searchFields.category.mainCategory = action.payload;
            state.currentSearchFields.category.mainCategory = action.payload;
        },
        onSubCategoryCurrentChange: (state, action) => {
            const subCategoryId = action.payload;
            const index = state.currentSearchFields.category.subCategory.indexOf(subCategoryId);
            if (index === -1) {
                // Nếu subCategory chưa có trong mảng, thêm nó vào
                state.currentSearchFields.category.subCategory.push(subCategoryId);
            } else {
                // Nếu subCategory đã có trong mảng, loại bỏ nó
                state.currentSearchFields.category.subCategory.splice(index, 1);
            }
        },
        onPageCurrentChange: (state, action) => {
            state.currentSearchFields.page = action.payload;
        },
        onApplySearchFields: (state) => {
            state.searchFields = state.currentSearchFields;
        },
        resetFilters: (state, action) => {
            state.searchFields = {
                name: "",
                priceRange: {
                    min: "0", max: "2000"
                },
                category: {
                    mainCategory: action.payload,
                    subCategory: []
                },
                sortBy: "",
                sortOrder: "",
                page: 1,
                limit: 3
            };
            state.currentSearchFields = state.searchFields;
            saveState(state)
        }
    }
})
export default filtersSlice