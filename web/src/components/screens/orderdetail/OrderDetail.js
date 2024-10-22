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
export default function OrderDetail() {
    const location = useLocation()
    const navigate = useNavigate()
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
                    Order Detail
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
                                Cancel
                            </button>
                        </div>
                        <div>
                            <p>
                                Status Order: {dataOrder.status}
                            </p>
                            <button>
                                Contact Supports
                            </button>
                        </div>
                        <div>
                            <p>
                                Order Total
                            </p>
                            <p style={{ fontSize: 16 }}>
                                {dataOrder.payments?.amount}$
                            </p>
                        </div>
                        <div>
                            <p>
                                Type of Product
                            </p>
                            <p style={{ fontSize: 16 }}>
                                {dataOrder.products?.length}
                            </p>
                        </div>
                        <div>
                            <p>
                                Total Quantity
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
                        <p><SlLocationPin /> Delivery Address</p>
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
                            <MdOutlinePayments /> Payments
                        </p>
                        <div>
                            <div className={styles.detailAddress}>
                                <p>
                                    Method: {dataOrder.payments?.method}
                                </p>
                                {
                                    dataOrder.payments?.TransactionId ?
                                        <p>Purchase At: {dataOrder.payments?.datePurchase} </p> : null
                                }
                                <p>
                                    Payment Status: {dataOrder.payments?.paymentStatus}
                                </p>
                            </div>
                            <div>
                                {
                                    dataOrder.payments?.TransactionId ?
                                        <p style={{ fontSize: 15, fontWweight: 400 }}>
                                            Transaction ID: {dataOrder.payments?.TransactionId}
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
