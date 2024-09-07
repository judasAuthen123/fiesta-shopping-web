import React, { useState } from 'react'
import styles from './Payment.module.css'
import BoxPayment from './methodbox/BoxPayment'
import { GrFormPrevious } from 'react-icons/gr';
import { paymentMethods } from './methodbox/paymentmethod';
export default function Payment({ stepSubmit, onChangeMethod }) {
    const [selectedValue, setSelectedValue] = useState('');

    const handleChange = (event) => {
        setSelectedValue(event.target.value);
        onChangeMethod(event.target.value);    
    };
    return (
        <div className={styles.viewPaymentMethod}>
            <div className={styles.viewTitle}>
                <label>
                    Payment Method
                </label>
                <button onClick={() => stepSubmit('backToShipping')}>
                    <GrFormPrevious /> Back
                </button>
            </div>
            <div className={styles.viewBoxPayment}>
                <BoxPayment
                    paymentMethod={paymentMethods.CASH_ON_DELIVERY}
                    label={'Cash on Delivery'}
                    name={'radioPayment'}
                    value={paymentMethods.CASH_ON_DELIVERY}
                    checked={selectedValue === 'Cash on Delivery'}
                    onChange={handleChange} />
                <div className={styles.line} />
                <BoxPayment
                    paymentMethod={paymentMethods.DEBIT_CREDIT_CARD}
                    label={'Debit/Credit Card'}
                    name={'radioPayment'}
                    value={paymentMethods.DEBIT_CREDIT_CARD}
                    checked={selectedValue === 'Debit/Credit Card'}
                    onChange={handleChange} />
                {/* <BoxPayment
                    paymentMothod={''}
                    label={'Google Pay'}
                    name={'radioPayment'}
                    value={'payment2'}
                    checked={selectedValue === 'payment2'}
                    onChange={handleChange} />
                <div className={styles.line} />
                <BoxPayment
                    paymentMothod={''}
                    label={'Paybal'}
                    name={'radioPayment'}
                    value={'payment3'}
                    checked={selectedValue === 'payment3'}
                    onChange={handleChange} /> */}
            </div>
        </div>
    )
}