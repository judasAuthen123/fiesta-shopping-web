import React, { useContext, useEffect, useState } from 'react'
import styles from './MyCheckout.module.css'
import image from '../../assets/images/th.png'
import AxiosInstance from '../../../util/AxiosInstance'
import { GrFormNext } from "react-icons/gr";
import { AppContext } from '../../../util/AppContext';
import { useTranslation } from 'react-i18next';
export default function MyCheckout({ data, stepSubmit }) {
    const [checkoutList, setCheckoutList] = useState([])
    // const [cartInfor, setCartInfo] = useState([])
    // const [cartMap, setCartMap] = useState([])
    const { t } = useTranslation()
    const { dataUser } = useContext(AppContext)
    const [subTotalPrice, setSubTotalPrice] = useState(0)
    useEffect(() => {
        const getCartByIds = async () => {
            try {
                if (data) {
                    const response = await AxiosInstance.get('/cart/getCartByIds', {
                        params: {
                            userId: dataUser?._id,
                            getFields: data
                        }
                    })

                    if (response.result === true && response.statusCode === 200) {
                        if (response.data) {
                            setCheckoutList(response.data)
                        }
                    }
                }
            } catch (error) {
                console.log(error);
            }
        }
        getCartByIds()
    }, [data])
    useEffect(() => {
        if (checkoutList && checkoutList.length > 0) {
            const subTotalPrice = checkoutList.filter(cart => cart.products).map(cart => {
                const variation = cart.products.variations ? cart.products.variations[0] : cart.products
                return variation.price * cart.quantity
            }).reduce((acc, curr) => acc + curr, 0);
            setSubTotalPrice(subTotalPrice)
        }
    }, [checkoutList])
    const totalPrice = (cart) => {
        const variation = cart.products.variations ? cart.products.variations[0] : cart.products
        const price = variation.price
        const totalPrice = variation.price * cart.quantity
        const _size_color__ = cart.products.variations ? Object.values(cart.products.variations[0].dimension).join(', ') : null
        return {
            price, totalPrice, _size_color__
        }
    }

    // const map = new Map(cartInfor.map(item =>
    //     [item.id,
    //     {
    //         totalPrice: item.totalPrice,
    //         price: item.price,
    //         variations: item.variations
    //     }]));


    return (

        <div className={styles.viewMyCheckout}>
            <div className={styles.viewTitle}>
                <label>
                    {t('Checkout.myCheckout.title')}
                </label>
                <button onClick={() => stepSubmit('orderSubmit')}>
                    {t('Checkout.accessBtn.next')} <GrFormNext />
                </button>
            </div>

            <div className={styles.productsView}>
                {
                    checkoutList && data?.length > 0 ?
                        checkoutList.map(item => {
                            const priceInfo = totalPrice(item)
                            let avatar;
                            if (Array.isArray(item.products.images)) {
                                avatar = item.products.images[0].url
                            }
                            return (
                                <div key={item._id} className={styles.productItem}>
                                    <img alt='' src={avatar ? avatar : image} />
                                    <div className={styles.productInfo}>
                                        <p>
                                            {item.products.name}
                                        </p>
                                        <p>
                                            ${priceInfo.price}
                                        </p>
                                        <p>
                                            {t('Checkout.myCheckout.variation')}: {priceInfo._size_color__}
                                        </p>
                                        <p>
                                            {t('Checkout.myCheckout.count')}: {item.quantity}
                                        </p>
                                    </div>
                                    <div className={styles.viewTotal}>
                                        <p>
                                            {t('Checkout.myCheckout.total')}: ${priceInfo.totalPrice}
                                        </p>
                                    </div>
                                </div>
                            )
                        }

                        ) : null
                }
            </div>
            <div className={styles.viewSubTotal}>
                <p>
                    {t('Checkout.myCheckout.orderTotal')} ({checkoutList.length}): ${subTotalPrice}
                </p>
            </div>
        </div>
    )
}
