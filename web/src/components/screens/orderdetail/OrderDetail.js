import React, { useEffect, useState } from 'react'
import Header from '../../public/components/header/Header'
import Footer from '../../public/components/footer/Footer'
import PolicyFooter from '../../public/components/footer/PolicyFooter'
import styles from './OrderDetail.module.css'
import { useLocation, useNavigate } from 'react-router-dom'
import { SlLocationPin } from "react-icons/sl";
import { MdOutlinePayments } from "react-icons/md";
import AxiosInstance from '../../../util/AxiosInstance'
import ItemProductOrder from './ItemProductOrder'
import { useTranslation } from 'react-i18next'
export default function OrderDetail() {
    const  {t} = useTranslation()
    const location = useLocation()
    const { _id } = location.state || {}
    const [dataOrder, setDataOrder] = useState({})
    const [totalQuantity, setTotalQuantity] = useState(null)
    useEffect(() => {
        const getOrderById = async () => {
            try {
                const response = await AxiosInstance.get(`/order/getOrderById?orderId=${_id}`)
                if (response.statusCode === 200 && response.result) {
                    setDataOrder(response.data)
                    const total = response.data.products?.reduce((sum, product) => {
                        return sum + product.quantity
                    }, 0)
                    setTotalQuantity(total)
                }
            } catch (error) {
                console.log(error);
            }
        }
        getOrderById()
    }, [_id])
    return (
        <div className={styles.container}>
            <Header />
            <div className={styles.box}>
                <div className={styles.title}>
                {t('OrderDetail.title')}
                </div>
            </div>
            <div className={styles.box}>
                <div className={styles.layoutContent}>
                    <div className={styles.headerDetail}>
                        <div>
                            <p>
                                Have a good day!
                            </p>
                            <button>
                                {t('OrderDetail.button.btnCancel')}
                            </button>
                        </div>
                        <div>
                            <p>
                            {t('OrderDetail.statusOrder')}: {dataOrder.status}
                            </p>
                            <button>
                            {t('OrderDetail.button.btnContactSupport')}
                            </button>
                        </div>
                        <div>
                            <p>
                            {t('OrderDetail.orderTotal')}
                            </p>
                            <p style={{ fontSize: 16 }}>
                                {dataOrder.payments?.amount}$
                            </p>
                        </div>
                        <div>
                            <p>
                            {t('OrderDetail.typeOfProduct')}
                            </p>
                            <p style={{ fontSize: 16 }}>
                                {dataOrder.products?.length}
                            </p>
                        </div>
                        <div>
                            <p>
                            {t('OrderDetail.totalQuantity')}
                            </p>
                            <p style={{ fontSize: 16 }}>
                                {totalQuantity}
                            </p>
                        </div>
                    </div>
                    <div className={styles.itemLayout}>
                        <div className={styles.products}>
                            {
                                dataOrder && Array.isArray(dataOrder.products) && dataOrder.products.map(item =>
                                    <ItemProductOrder data={item} key={item._id} />
                                )
                            }
                        </div>
                    </div>
                    <div className={styles.viewAddress}>
                        <p><SlLocationPin />{t('OrderDetail.deliveryAddress')}</p>
                        <div>
                            <div className={styles.detailAddress}>
                                <p>
                                    {dataOrder.shipping?.name}
                                </p>
                                <p>
                                    (+84) {dataOrder.shipping?.phoneNumber}
                                </p>
                                <p>
                                    {dataOrder.shipping?.street}, {dataOrder.shipping?.ward}, {dataOrder.shipping?.district}, {dataOrder.shipping?.city}
                                </p>
                            </div>
                            <div>
                                <p style={{ fontSize: 15, fontWweight: 400 }}>
                                    No Delivery Logistics Information.
                                </p>
                            </div>
                        </div>
                        <h4 style={{ position: 'absolute', top: 15, right: 30, color: '#c9c9c92c', fontSize: 25 }}>Fiesta Express</h4>
                    </div>
                    <div className={styles.viewAddress}>
                        <p>
                            <MdOutlinePayments /> {t('OrderDetail.payments.title')}
                        </p>
                        <div>
                            <div className={styles.detailAddress}>
                                <p>
                                {t('OrderDetail.payments.method')}: {dataOrder.payments?.method}
                                </p>
                                {
                                    dataOrder.payments?.TransactionId ?
                                        <p>{t('OrderDetail.payments.purchaseAt')}: {dataOrder.payments?.datePurchase} </p> : null
                                }
                                <p>
                                {t('OrderDetail.payments.paymentStatus')}: {dataOrder.payments?.paymentStatus}
                                </p>
                            </div>
                            <div>
                                {
                                    dataOrder.payments?.TransactionId ?
                                        <p style={{ fontSize: 15, fontWweight: 400 }}>
                                            {t('OrderDetail.payments.transactionId')}: {dataOrder.payments?.TransactionId}
                                        </p> : null
                                }

                            </div>
                        </div>
                    </div>
                </div>
            </div>




            <PolicyFooter />
            <Footer />
        </div>
    )
}
