import React from 'react'
const variationsDisplay = (dimension) => {
    if (!dimension || Object.keys(dimension).length === 0) {
        return '';
    }
    const values = Object.values(dimension);
    const result = values.join(', ');
    return `Variation: ${result}`;
}
export default function ItemProductOrder({ data }) {
    const { productInfo, quantity } = data
    const avatarProduct = productInfo.images && Array.isArray(productInfo.images) ? productInfo.images[0].url : null
    return (
        <div style={{ display: 'flex', columnGap: 30, border: '1px solid #8181815d', borderRadius: 5 }}>
            <img src={avatarProduct} style={{ width: 240, height: 300, objectFit: 'cover' }} />
            <div style={{ marginTop: 30, fontSize: 15 }}>
            <p style={{ fontWeight: 550, fontSize:16, marginBottom: 15 }}>
                    {productInfo.Brand}
                </p>
                <p>
                    {productInfo.name}
                </p>
                <p>
                    Quantity: {quantity}
                </p>
                <p>
                    {variationsDisplay(productInfo.variation.dimension)}
                </p>
                <p>
                    Unit price: {productInfo.price}$
                </p>
                <p>
                    Total: {productInfo.price * quantity}$
                </p>
            </div>
        </div>
    )
}
