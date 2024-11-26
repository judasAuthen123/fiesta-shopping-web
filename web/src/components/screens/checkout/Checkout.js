import React, { useContext, useEffect, useState } from 'react'
import styles from './Checkout.module.css'
import Header from '../../public/components/header/Header'
import Footer from '../../public/components/footer/Footer'
import { useLocation } from 'react-router-dom'
import ArticleCheckout from './ArticleCheckout'
import StepCheckout from './step/StepOrder'
import PolicyFooter from '../../public/components/footer/PolicyFooter'
import { SlLocationPin } from "react-icons/sl";
import { MdOutlinePayments } from "react-icons/md";
import { FaGifts } from "react-icons/fa";
import AxiosInstance from '../../../util/AxiosInstance'
import { AppContext } from '../../../util/AppContext'
import { paymentMethods } from './methodbox/paymentmethod'
import PaymentSubmit from './dialog/PaymentSubmit'
import CircleLoading from '../../public/components/loading/CircleLoading'
import OrderSuccess from './dialog/OrderSuccess'
import { useTranslation } from 'react-i18next'
import EmptyCheckoutDialog from '../../public/components/dialog/EmptyCheckoutDialog'
export default function Checkout() {
    const { t } = useTranslation()
    const location = useLocation()
    const { dataUser } = useContext(AppContext)
    const [stateCheckout, setStateCheckout] = useState('order')
    const [address, setAddress] = useState(null)
    const [paymentMethod, setPaymentMethod] = useState(null)
    const { selectedItems, productTotal, total, totalItem } = location.state || {}
    const [cartData, setCartData] = useState([])
    const [formattedCartData, setFormattedCartDatta] = useState([])
    const [loading, setLoading] = useState(false)
    const [paymentSubmitVisible, setPaymentSubmitVisible] = useState(false)
    const [orderSuccessVisbilem, setOrderSuccessVisible] = useState(false)
    const [isVisbileCheckout, setIsVisbleCheckout] = useState(false)


    useEffect(() => {
        const getCartByIds = async () => {
            try {
                if (dataUser && selectedItems) {
                    const response = await AxiosInstance.get('/cart/getCartByIds', {
                        params: {
                            getFields: selectedItems,
                            userId: dataUser?._id
                        }
                    })                
                    if (response.statusCode === 200) {
                        setCartData(response.data)
                    }
                }
            } catch (error) {
                console.log(error);
            }
        }
        getCartByIds()
    }, [selectedItems, dataUser?._id, dataUser])

    useEffect(() => {
        if(!selectedItems || selectedItems.length === 0) {
            setIsVisbleCheckout(true)
        }
    }, [selectedItems])

    useEffect(() => {
        if (cartData.length > 0) {
            const newData = cartData.map(item => {
                let newItem = { ...item, productId: item.products._id }
                delete newItem.products
                return newItem
            })
            setFormattedCartDatta(newData)
        }
    }, [cartData])

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'auto'
        })
    }, [stateCheckout])

    const placeOrder = async () => {
        setLoading(true)
        if (paymentMethod === paymentMethods.DEBIT_CREDIT_CARD) {
            setPaymentSubmitVisible(true)
            setLoading(false)
        } else if (paymentMethod === paymentMethods.CASH_ON_DELIVERY) {
            const response = await AxiosInstance.post('order/createOrder', {
                userId: dataUser?._id,
                payments: {
                    method: paymentMethods.CASH_ON_DELIVERY,
                    amount: total,
                    TransactionId: null,
                    paymentStatus: 'Awaiting Payment'
                },
                shipping: address,
                products: formattedCartData,
            })
            if (response.statusCode === 200) {
                setLoading(false)
                setOrderSuccessVisible(true)
            }
        }
    }
    return (
        <div>
            <EmptyCheckoutDialog isVisible={isVisbileCheckout}/>
            <Header />
            <PaymentSubmit
                isVisible={paymentSubmitVisible}
                onCancel={setPaymentSubmitVisible}
                userId={dataUser?._id}
                amount={total}
                products={formattedCartData}
                address={address}
                onOpenOrderSuccess={setOrderSuccessVisible} />
            <OrderSuccess
                isVisible={orderSuccessVisbilem}
                onClose={setOrderSuccessVisible}
                completeCheckout={setStateCheckout}
            />
            <div className={styles.box}>
                <div className={styles.title}>
                    {t('Checkout.title')}
                </div>
            </div>
            <div className={styles.box}>
                <div className={styles.layoutContent}>
                    <div className={styles.layoutDetailCheckout}>
                        <StepCheckout state={stateCheckout} />
                        <ArticleCheckout
                            keyrender={stateCheckout}
                            data={selectedItems}
                            nextStep={setStateCheckout}
                            onChangeAddress={setAddress}
                            onChangeMethod={setPaymentMethod} 
                            currentAddress={address}
                            currentPaymentMethod={paymentMethod}/>
                    </div>
                    <div className={styles.viewFromCheckout}>
                        <div className={styles.viewSubtotal}>
                            <p>
                                {t('Checkout.checkoutDetails.title')}
                            </p>
                        </div>
                        <div className={styles.viewSubtotal}>
                            <p style={{ fontWeight: 400 }}>
                                {t('Checkout.checkoutDetails.productsQuantity')}: {productTotal}
                            </p>
                            <p style={{ fontWeight: 400 }}>
                                {t('Checkout.checkoutDetails.totalItems')}: {totalItem}
                            </p>
                        </div>
                        <div className={styles.viewSubtotal}>
                            <p style={{ display: 'flex', alignItems: 'center', columnGap: 10 }}>
                                <SlLocationPin size={15} /> {t('Checkout.checkoutDetails.address')}
                            </p>
                            <div style={{ fontWeight: 400 }}>
                                {
                                    address ? <div>
                                        <p>{address?.name} | (84+) {address.phoneNumber}</p>
                                        <p>{address?.street}</p>
                                        <p>{address?.ward}, {address?.district}, {address?.city}</p>
                                    </div> : <div>({t('Checkout.checkoutDetails.notfilled')})</div>
                                }
                            </div>
                        </div>
                        <div className={styles.viewSubtotal}>
                            <p style={{ display: 'flex', alignItems: 'center', columnGap: 10 }}>
                                <MdOutlinePayments size={15} /> {t('Checkout.checkoutDetails.paymentMethod')}
                            </p>
                            <div style={{ fontWeight: 400 }}>
                                {
                                    paymentMethod ? <div> {paymentMethod} </div> : <div>({t('Checkout.checkoutDetails.notfilled')})</div>
                                }
                            </div>
                        </div>
                        <div className={styles.viewSubtotal} style={{ borderBottomWidth: 0 }}>
                            <p>
                                {t('Checkout.checkoutDetails.grandTotal')}
                            </p>
                            <p style={{ fontWeight: 400, fontSize: 16 }}>
                                ${total ? total : 'N/A'}
                            </p>
                        </div>
                        {
                            address && paymentMethod && stateCheckout !== 'done' ? <button onClick={placeOrder}>{
                                loading ? <CircleLoading boderColor={'white'} /> : <>{t('Checkout.checkoutDetails.placeOrder')} <FaGifts size={16} /></>
                            }</button> : null
                        }

                    </div>
                </div>
            </div>
            <PolicyFooter />
            <Footer />
        </div>
    )
}
