import React, { useEffect, useState } from 'react'
import styles from './PaymentSubmit.module.css'
import CircleLoading from '../../../public/components/loading/CircleLoading'
import AxiosInstance from '../../../../util/AxiosInstance'
import { formatDate } from './date'
import { useSelector } from 'react-redux'
import { defaultCardId } from '../../../redux/selector'
import { SiVisa } from "react-icons/si";
const numOnCardDisplay = (num) => {
    return `•••• ${num}`
}
export default function PaymentSubmit({
    isVisible, onCancel, products, userId, amount, address, onOpenOrderSuccess }) {
    const [cardData, setCardData] = useState(null)
    const defaultId = useSelector(defaultCardId)
    const [loading, setLoading] = useState(false)
    const date = new Date()
    useEffect(() => {
        try {
            const getDefaultCard = async () => {
                const response = await AxiosInstance.get(`/payment/get-default-card/${userId}`)
                if (response.statusCode === 200 && response.result) {
                    setCardData(response.data)
                }
            }
            getDefaultCard()
        } catch (error) {
            console.log(error);
        }

    }, [defaultId, userId])
    const submit = async () => {
        setLoading(true)
        const request = await AxiosInstance.post('/payment/intent', {
            userId: userId,
            products: products,
            paymentMethod: cardData?.brand
        })
        if (request.statusCode === 200) {
            const response = await AxiosInstance.post('order/createOrder', {
                userId: userId,
                payments: {
                    method: cardData?.brand,
                    amount: amount,
                    TransactionId: request.paymentIntentId
                },
                shipping: address,
                products: products
            })
            if(response.statusCode === 200) {
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
                <label>Confirm Payment</label>
                <p>Quickly and secure, free transactions</p>
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
                            Date
                        </div>
                        <div>
                            {formatDate(date).formattedDate}
                        </div>
                    </div>
                    <div className={styles.detailTitle}>
                        <div>
                            Payment Method
                        </div>
                        <div>
                            {cardData?.brand}
                        </div>
                    </div>
                    <div className={styles.detailTitle}>
                        <div>
                            Card Number
                        </div>
                        <div>
                            {numOnCardDisplay(cardData.last4 ? cardData.last4 : null)}
                        </div>
                    </div>
                    <div className={styles.detailTitle}>
                        <div>
                            Cardholder Name
                        </div>
                        <div>
                            {cardData?.name}
                        </div>
                    </div>
                    <div className={styles.viewTotal}>
                        <div>
                            Total amount
                        </div>
                        <div>
                            ${amount}
                        </div>
                    </div>
                </div>
                <div className={styles.viewButton}>
                    <button onClick={() => onCancel(false)}>
                        Cancel
                    </button>
                    <button onClick={submit}>
                        {
                            loading === true ? <CircleLoading boderColor={'white'}/> : 'Confirm'
                        }
                    </button>
                </div>
            </div>
        </div>
    )
}
