import React, { useState } from 'react'
import styles from './ItemOrder.module.css'
import { formatDate } from '../../../checkout/dialog/date'
import { GrFormNext } from "react-icons/gr";
import { useNavigate } from 'react-router-dom';
import { MdOutlinePayments } from "react-icons/md";
import { IoPricetagsOutline } from "react-icons/io5";
import { HiOutlineStatusOnline } from "react-icons/hi";
export default function ItemOrder({ status, data }) {
    const navigate = useNavigate()
    return (
        <div className={styles.container}>
            <div className={styles.viewDetails}>
                <p>
                    Order Date: {formatDate(data?.modifiedOn).formattedDate}
                </p>
                <p>
                    To: {data.shipping.name}
                </p>
            </div>
            <div style={{ rowGap: 10, display: 'flex', flexDirection: 'column' }}>
                <div className={styles.viewContentOrder}>
                    <p>
                        Order ID: {data.orderId}
                    </p>
                    <p>
                        <MdOutlinePayments /> Payment method: {data.payments.method}
                    </p>
                    <p>
                        <IoPricetagsOutline /> Amount: <span style={{ fontWeight: 550 }}>{data.payments.amount}$</span>
                    </p>
                    <p>
                        <HiOutlineStatusOnline /> Status: {data.status}
                    </p>
                    {
                        data.payments.TransactionId ?
                            <p style={{marginTop:5}}>
                                <span style={{ color: '#07f507b7' }}>Purchased</span>
                            </p> : null
                    }

                </div>
            </div>
            <button className={styles.buttonViewDetails} onClick={() => navigate('/order-detail', { state: { _id: data?._id } })}>Details <GrFormNext /></button>
        </div>
    )
}

