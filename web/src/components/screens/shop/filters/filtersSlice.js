import { createSlice } from "@reduxjs/toolkit";
export const filtersSlice = createSlice({
    name: 'filter',
    initialState: {
        searchFields: {
            name: '',
            priceRange: {
                min: '', max: ''
            },
            categoriesID: {
                subCategoryID: '',
                categoryID: ''
            }
        }

    },
    reducers: {
        onChangeName: (state, action) => {
            state.searchFields.name = action.payload
        },
        onChangePriceRange: (state, action) => {
            state.searchFields.priceRange = action.payload
        },
        onCategoriesChange: (state, action) => {
            state.searchFields.categoriesID = action.payload
        }
    }
})
export default filtersSlice