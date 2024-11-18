import React from 'react'
import { useTranslation } from 'react-i18next';
import styles from './ItemProductOrder.module.css'
const variationsDisplay = (dimension) => {
    if (!dimension || Object.keys(dimension).length === 0) {
        return '';
    }
    const values = Object.values(dimension);
    const result = values.join(', ');
    return result;
}
export default function ItemProductOrder({ data }) {
    const { productInfo, quantity } = data
    const {t} = useTranslation()
    const avatarProduct = productInfo.images && Array.isArray(productInfo.images) ? productInfo.images[0].url : null
    return (
        <div className={styles.container}>
            <img src={avatarProduct} style={{ width: 240, height: 300, objectFit: 'cover' }} />
            <div style={{ marginTop: 30, fontSize: 15 }}>
            <p style={{ fontWeight: 550, fontSize:16, marginBottom: 15 }}>
                    {productInfo.Brand}
                </p>
                <p>
                    {productInfo.name}
                </p>
                <p>
                {t('Cart.quantity')}: {quantity}
                </p>
                <p>
                {t('Cart.variation')}: {variationsDisplay(productInfo.variation.dimension)}
                </p>
                <p>
                {t('Cart.unitPrice')}: {productInfo.price}$
                </p>
                <p>
                {t('Cart.total')}: {productInfo.price * quantity}$
                </p>
            </div>
        </div>
    )
}
