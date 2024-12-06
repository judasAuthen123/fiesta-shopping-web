export const validateAddToCart = (fields) => {
    const { sizeSelected, colorSelected, sizeList, colorList, selectedVariation, variation } = fields;

    let errors = {};
    if (variation) {
        if ((sizeList.length > 0 && (!sizeSelected || sizeSelected.trim() === "")) ||
            (colorList.length > 0 && (!colorSelected || colorSelected.trim() === ""))) {
            errors.selectedVariation = {
                errorType: "emptyErr",
                message: {
                    viName: "Vui lòng chọn đầy đủ thông tin",
                    enName: "Please select all required options"
                }
            };
        } else if (!selectedVariation) {
            errors.selectedVariation = {
                errorType: "invalidErr",
                message: { viName: "Không có loại hàng này", enName: "This variation is not available" }
            };
        } else if (selectedVariation.stock <= 0) {
            errors.selectedVariation = {
                errorType: "stockErr",
                message: { viName: "Loại hàng này đã hết", enName: "Product is out of stock" }
            };
        }
    }

    console.log(errors);   
    return Object.keys(errors).length > 0 ? errors : null;
}