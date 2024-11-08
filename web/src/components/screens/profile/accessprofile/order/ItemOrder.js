import React, { useState } from 'react'
import styles from './ItemOrder.module.css'
import { formatDate } from '../../../checkout/dialog/date'
import { GrFormNext } from "react-icons/gr";
import { useNavigate } from 'react-router-dom';
import { MdOutlinePayments } from "react-icons/md";
import { IoPricetagsOutline } from "react-icons/io5";
import { HiOutlineStatusOnline } from "react-icons/hi";
import { useTranslation } from 'react-i18next';
export default function ItemOrder({ status, data }) {
    const {t} = useTranslation()
    const navigate = useNavigate()
    return (
        <div className={styles.container}>
            <div className={styles.viewDetails}>
                <p>
                    {t('Profile.Article.Orders.orderItem.orderDate')}: {formatDate(data?.modifiedOn).formattedDate}
                </p>
                <p>
                {t('Profile.Article.Orders.orderItem.to')}: {data.shipping.name}
                </p>
            </div>
            <div style={{ rowGap: 10, display: 'flex', flexDirection: 'column' }}>
                <div className={styles.viewContentOrder}>
                    <p>
                    {t('Profile.Article.Orders.orderItem.orderId')} {data.orderId}
                    </p>
                    <p>
                        <MdOutlinePayments /> {t('Profile.Article.Orders.orderItem.paymentMethod')}: {data.payments.method}
                    </p>
                    <p>
                        <IoPricetagsOutline /> {t('Profile.Article.Orders.orderItem.amount')}: <span style={{ fontWeight: 550 }}>{data.payments.amount}$</span>
                    </p>
                    <p>
                        <HiOutlineStatusOnline /> {t('Profile.Article.Orders.orderItem.status')}: {data.status}
                    </p>
                    {
                        data.payments.TransactionId ?
                            <p style={{marginTop:5}}>
                                <span style={{ color: '#07f507b7' }}>{t('Profile.Article.Orders.orderItem.purchased')}</span>
                            </p> : null
                    }

                </div>
            </div>
            <button className={styles.buttonViewDetails} onClick={() => navigate('/order-detail', { state: { _id: data?._id } })}>{t('Profile.Article.Orders.orderItem.details')} <GrFormNext /></button>
        </div>
    )
}

