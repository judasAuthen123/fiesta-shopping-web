import React, { useRef, useEffect } from 'react'
import styles from './BoxPayment.module.css'
import Card from '../credit_debit/Card';
import { paymentMethods } from './paymentmethod';
export default function BoxPayment({ name, value, checked, onChange, label, paymentMethod }) {
    const boxPaymentRef = useRef(null)
    useEffect(() => {
        if (checked) {
            const scrollHeight = boxPaymentRef.current.scrollHeight;
            boxPaymentRef.current.style.maxHeight = `${scrollHeight}px`
        } else {
            boxPaymentRef.current.style.maxHeight = `0px`
        }
    }, [checked]);
    let paymentComponent;
    switch (paymentMethod) {
        case paymentMethods.DEBIT_CREDIT_CARD:
            paymentComponent = <Card />;
            break;
        default:
            paymentComponent = null;
    }
    return (
        <div className={styles.container}>
            <div className={styles.viewCheckbox}>
                <input
                    style={{ backgroundColor: 'black' }}
                    type="radio"
                    name={name}
                    value={value}
                    checked={checked}
                    onChange={onChange} />
                <label>
                    {label}
                </label>
            </div>
            <div className={styles.viewContent} ref={boxPaymentRef}>
                {paymentComponent}
            </div>
        </div>
    )
}
