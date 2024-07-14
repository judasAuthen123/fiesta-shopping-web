import React, { useState } from 'react'
import Header from '../../public/components/header/Header'
import Footer from '../../public/components/footer/Footer'
import styles from './Payment.module.css'
import StepOrder from '../shipping/step/StepOrder'
import BoxPayment from './methodbox/BoxPayment'
export default function Payment() {
    const [selectedValue, setSelectedValue] = useState('');

    const handleChange = (event) => {
        setSelectedValue(event.target.value);
    };
    return (
        <div>
            <Header />
            <div className={styles.box}>
                <div className={styles.title}>
                    Shipping Address
                </div>
            </div>
            <div className={styles.box}>
                <div className={styles.layoutContent}>
                    <div>
                        <StepOrder state={'payment'} />
                        <div className={styles.viewPaymentMethod}>
                            <label>
                                Select a payment method
                            </label>
                            <div className={styles.viewBoxPayment}>
                                <BoxPayment
                                    paymentMethod={'card'}
                                    label={'Debit/Credit Card'}
                                    name={'radioPayment'}
                                    value={'payment1'}
                                    checked={selectedValue === 'payment1'}
                                    onChange={handleChange} />
                                <div className={styles.line} />
                                <BoxPayment
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
                                    onChange={handleChange} />
                                <div className={styles.line} />
                                <BoxPayment
                                    paymentMothod={''}
                                    label={'Cash on Delivery'}
                                    name={'radioPayment'}
                                    value={'payment4'}
                                    checked={selectedValue === 'payment4'}
                                    onChange={handleChange} />
                            </div>
                        </div>
                    </div>
                    <div className={styles.viewFromCheckout}>
                        <div className={styles.viewSubtotal}>
                            <p>
                                Subtotal
                            </p>
                            <p>
                                $200.00
                            </p>
                        </div>
                        <div className={styles.viewCodeDiscout}>
                            <label>Enter discount code</label>
                            <div className={styles.enterCodeDiscout}>
                                <input />
                                <button>Apply</button>
                            </div>
                        </div>
                        <div className={styles.viewSubtotal} style={{ fontWeight: 'normal' }}>
                            <p>
                                Delivery charge
                            </p>
                            <p>
                                $5.00
                            </p>
                        </div>
                        <div className={styles.viewSubtotal} style={{ borderBottomWidth: 0 }}>
                            <p>
                                Grand Total
                            </p>
                            <p>
                                $205.00
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}