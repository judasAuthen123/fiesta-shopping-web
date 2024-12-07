import React, { useEffect, useState } from 'react'
import styles from './ItemCart.module.css'
import { MdRemoveShoppingCart } from "react-icons/md";
import image from '../../assets/images/th.png'
import { useTranslation } from 'react-i18next'
import AxiosInstance from '../../../util/AxiosInstance'
import UpdateCartButton from './UpdateCartButton'
import CircleLoading from '../../public/components/loading/CircleLoading'
const TextLimit = ({ text }) => {
    if (text.length <= 26) {
        return text;
    } else {
        return text.substring(0, 28) + '...';
    }
}
const variationsDisplay = (dimension) => {
    if (!dimension || Object.keys(dimension).length === 0) {
        return '';
    }
    const values = Object.values(dimension);
    const result = values.join(', ');
    return result;
}
export default function ItemCart({ data, onDelete, onCheck, checkAll, onRefreshDataCheckout }) {
    const { t } = useTranslation()
    const [checked, setChecked] = useState(false)
    const [quantity, setQuantity] = useState(data?.quantity)
    const [loading, setLoading] = useState(false)
    const [total, setTotal] = useState(0)
    useEffect(() => {
        if (data.products.variations) {
            setTotal(data.products.variations[0].price * data.quantity)
        } else {
            setTotal(data.products.price * data.quantity)
        }
    }, [data])
    const deleteCart = (cartID) => {
        onDelete(cartID)
    }

    const [avatarCart, setAvatarCart] = useState('')

    useEffect(() => {
        if (data && Array.isArray(data.products.images)) {
            const avatar = data.products?.images[0].url
            setAvatarCart(() => {
                return avatar ? avatar : image
            })
        }
    }, [data])

    useEffect(() => {
        if (quantity !== data?.quantity) {
            const updateItemCart = async () => {
                setLoading(true)
                try {
                    const request = await AxiosInstance.post(`/cart/update?cartID=${data._id}`, {
                        updateFields: {
                            quantity: quantity
                        }
                    })
                    if (request.result && request.statusCode === 200) {
                        onRefreshDataCheckout(quantity, data._id)
                        setLoading(false)
                    }
                } catch (error) {
                    console.log(error);

                }
            }
            updateItemCart()
        }
    }, [quantity, data._id, data?.quantity])

    useEffect(() => {
        setChecked(checkAll)
    }, [checkAll])

    const onCheckBuy = () => {
        onCheck(data._id)
        setChecked(prev => !prev)
    }
    return (
        <div className={styles.container}>
            <div className={styles.viewTableProductTd}>
                <input type="checkbox" onChange={onCheckBuy} checked={checked} />
                <img className={styles.productImg} alt='' src={avatarCart} loading='lazy' />
                <div className={styles.viewInfoProduct}>
                    <p style={{ fontWeight: 600, fontSize: 14 }}><TextLimit text={data.products.name} /></p>
                    <div style={{ fontSize: 13}}>{t('Cart.variation')}: {variationsDisplay(data.products.variations[0].dimension)}</div>
                </div>
    
            </div>
            <div style={{ fontSize: 14}}>
                ${data.products.variations[0].price}
            </div>
            <div style={{ fontSize: 14 }}>
                <UpdateCartButton quantity={quantity} onChange={setQuantity} loading={loading} />
            </div>
            <div style={{ fontSize: 14 }}>
                {
                    loading ?
                        <div style={{ display: 'flex', alignItems: 'center', columnGap: 5 }}>
                            <CircleLoading height={19} width={19} />
                        </div> :
                        <>${total}</>
                }
            </div>
            <div>
                <MdRemoveShoppingCart color='red' size={22} onClick={() => deleteCart(data._id)} style={{ cursor: 'pointer' }} />
            </div>
        </div>
    )
}
