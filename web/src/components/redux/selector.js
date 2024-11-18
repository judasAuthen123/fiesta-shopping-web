import { createSelector } from "@reduxjs/toolkit"
export const slideSelected = (state) => state.slide
export const filterSelectedForShopByCategory = (state) => state.filter.searchFields
export const filterSelectedForShop = createSelector(
    filterSelectedForShopByCategory, (searchFields) => {
        const { category, ...rest } = searchFields
    })
export const currentFilterSelectedForShopByCategory = (state) => state.filter.currentSearchFields
export const currentFilterSelectedForShop = createSelector(
    currentFilterSelectedForShopByCategory, (searchFields) => {
        const { category, ...rest } = searchFields
    }
)
export const isResetFilterSelected = (state) => state.filter.searchFields.isResetFilter
export const priceRangeSelected = (state) => state.filter.searchFields.priceRange
export const pageSelected = (state) => state.filter.searchFields.page
export const currentMainCategoryFilterSelected = (state) => state.filter.currentSearchFields.category.mainCategory
export const productListSelected = (state) => state.productList.data
export const currentSubCategorySelected = (state) => state.filter.currentSearchFields.category.subCategory
export const defaultCardId = (state) => state.card.defaultId