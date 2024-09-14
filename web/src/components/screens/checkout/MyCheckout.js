import React, { useEffect, useState } from 'react'
import styles from './MyCheckout.module.css'
import image from '../../assets/images/th.png'
import AxiosInstance from '../../../util/AxiosInstance'
import { GrFormNext } from "react-icons/gr";
export default function MyCheckout({ data, stepSubmit }) {
    const [checkoutList, setCheckoutList] = useState([])
    // const [cartInfor, setCartInfo] = useState([])
    // const [cartMap, setCartMap] = useState([])

    const [subTotalPrice, setSubTotalPrice] = useState(0)
    useEffect(() => {
        try {
            if (data) {
                const getCartByIds = async () => {
                    const response = await AxiosInstance.get('/cart/getCartByIds', {
                        params: {
                            userId: '662b71f75c040536cfe27d65',
                            getFields: data
                        }
                    })

                    if (response.result === true && response.statusCode === 200) {
                        if (response.data) {
                            setCheckoutList(response.data)
                        }
                    }
                }
                getCartByIds()
            }
        } catch (error) {
            console.log(error);

        }

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
                    Your Orders
                </label>
                <button onClick={() => stepSubmit('orderSubmit')}>
                    Next <GrFormNext />
                </button>
            </div>

            <div className={styles.productsView}>
                {
                    checkoutList && data?.length > 0 ?
                        checkoutList.map(item => {
                            const priceInfo = totalPrice(item)
                            return (
                                <div key={item._id} className={styles.productItem}>
                                    <img alt='' src={image} />
                                    <div className={styles.productInfo}>
                                        <p>
                                            {item.products.name}
                                        </p>
                                        <p>
                                            ${priceInfo.price}
                                        </p>
                                        <p>
                                            variations: {priceInfo._size_color__}
                                        </p>
                                        <p>
                                            count: {item.quantity}
                                        </p>
                                    </div>
                                    <div className={styles.viewTotal}>
                                        <p>
                                            Total: ${priceInfo.totalPrice}
                                        </p>
                                    </div>
                                </div>
                            )
                        }

                        ) : <div>there are not have product</div>
                }
            </div>
            <div className={styles.viewSubTotal}>
                <p>
                    Order Total ({checkoutList.length} items): ${subTotalPrice}
                </p>
            </div>
        </div>
    )
}
