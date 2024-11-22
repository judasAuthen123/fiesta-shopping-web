import React, { useEffect, useState } from 'react'
import styles from './PaymentSubmit.module.css'
import CircleLoading from '../../../public/components/loading/CircleLoading'
import AxiosInstance from '../../../../util/AxiosInstance'
import { formatDate } from './date'
import { useSelector } from 'react-redux'
import { defaultCardId } from '../../../redux/selector'
import { SiVisa } from "react-icons/si";
import { useTranslation } from 'react-i18next'
const numOnCardDisplay = (num) => {
    return `•••• ${num}`
}
export default function PaymentSubmit({
    isVisible, onCancel, products, userId, amount, address, onOpenOrderSuccess }) {
    const { t } = useTranslation()
    const [cardData, setCardData] = useState(null)
    const defaultId = useSelector(defaultCardId)
    const [loading, setLoading] = useState(false)
    const date = new Date()
    useEffect(() => {
        const getDefaultCard = async () => {
            try {
                const response = await AxiosInstance.get(`/payment/get-default-card/${userId}`)
                if (response.statusCode === 200 && response.result) {
                    setCardData(response.data)
                }
            } catch (error) {
                console.log(error);
            }
        }
        getDefaultCard()
    }, [defaultId, userId])
    const submit = async () => {
        setLoading(true)
        const request = await AxiosInstance.post('/payment/intent', {
            userId: userId,
            products: products,
            paymentMethod: cardData?.brand
        })
        if (request.statusCode === 200) {
            const format = formatDate(date)
            const response = await AxiosInstance.post('order/createOrder', {
                userId: userId,
                payments: {
                    method: cardData?.brand,
                    amount: amount,
                    TransactionId: request.paymentIntentId,
                    datePurchase: `${format.formattedDate}, ${format.formattedTime}`,
                    paymentStatus: 'Purchased'
                },
                shipping: address,
                products: products,
            })
            if (response.statusCode === 200) {
                setLoading(false)
                onOpenOrderSuccess(true)
                onCancel(false)
            }
        }
    }
    if (isVisible === false) return null
    return (
        <div className={styles.container}>
            <div className={styles.body}>
                <label>{t('Components.confirmPayment.title')}</label>
                <p>{t('Components.confirmPayment.quick')}</p>
                <div className={styles.detail} style={cardData && cardData?.brand === 'Visa' ? { backgroundColor: '#1032dc0c' } : { backgroundColor: '#0A2540', color: 'white' }}>
                    {
                        cardData && cardData?.brand === 'Visa' ? <SiVisa className={styles.iconVisa} size={45} color='#1434CB' /> :
                            <div className={styles.masterCardView}>
                                <div className={styles.masterCard1} />
                                <div className={styles.masterCard2} />
                            </div>
                    }
                    <p>
                        Detail
                    </p>
                    <div className={styles.detailTitle}>
                        <div>
                            {t('Components.confirmPayment.date')}
                        </div>
                        <div>
                            {formatDate(date).formattedDate}
                        </div>
                    </div>
                    <div className={styles.detailTitle}>
                        <div>
                            {t('Components.confirmPayment.object')}
                        </div>
                        <div>
                            {cardData?.brand}
                        </div>
                    </div>
                    <div className={styles.detailTitle}>
                        <div>
                            {t('Components.confirmPayment.cardNumber')}
                        </div>
                        <div style={{ letterSpacing: 1.3 }}>
                            {numOnCardDisplay(cardData?.last4 ? cardData?.last4 : null)}
                        </div>
                    </div>
                    <div className={styles.detailTitle}>
                        <div>
                            {t('Components.confirmPayment.cardName')}
                        </div>
                        <div>
                            {cardData?.name}
                        </div>
                    </div>
                    <div className={styles.viewTotal}>
                        <div>
                            {t('Components.confirmPayment.totalAmount')}
                        </div>
                        <div>
                            ${amount}
                        </div>
                    </div>
                </div>
                <div className={styles.viewButton}>
                    <button onClick={() => onCancel(false)}>
                        {t('Components.confirmPayment.button.buttonCancel')}
                    </button>
                    <button onClick={submit}>
                        {
                            loading === true ? <CircleLoading boderColor={'white'} /> : t('Components.confirmPayment.button.buttonConfirm')
                        }
                    </button>
                </div>
            </div>
        </div>
    )
}
