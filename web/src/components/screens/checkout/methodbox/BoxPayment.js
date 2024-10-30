import React, { useRef, useEffect } from 'react'
import styles from './BoxPayment.module.css'
import Card from '../credit_debit/Card';
import { paymentMethods } from './paymentmethod';
export default function BoxPayment({ name, value, checked, onChange, label, paymentMethod }) {
    const boxPaymentRef = useRef(null)
    useEffect(() => {
        if (checked) {

            boxPaymentRef.current.style.height = `max-content`
        } else {
            boxPaymentRef.current.style.height = `0px`
        }
    }, [checked]);
    let paymentComponent;
    switch (paymentMethod) {
        case paymentMethods.DEBIT_CREDIT_CARD:
            paymentComponent = <Card isShowNote={true}/>;
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
