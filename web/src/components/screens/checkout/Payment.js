import React, { } from 'react'
import styles from './Payment.module.css'
import BoxPayment from './methodbox/BoxPayment'
import { GrFormPrevious } from 'react-icons/gr';
import { paymentMethods } from './methodbox/paymentmethod';
import { useTranslation } from 'react-i18next';
export default function Payment({ stepSubmit, onChangeMethod, currentPaymentMethod }) {
    const { t } = useTranslation()
    const handleChange = (event) => {
        onChangeMethod(event.target.value);
    };
    return (
        <div className={styles.viewPaymentMethod}>
            <div className={styles.viewTitle}>
                <label>
                {t('Checkout.paymentMethod.title')}
                </label>
                <button onClick={() => stepSubmit('backToShipping')}>
                    <GrFormPrevious /> {t('Checkout.accessBtn.back')}
                </button>
            </div>
            <div className={styles.viewBoxPayment}>
                <BoxPayment
                    paymentMethod={paymentMethods.CASH_ON_DELIVERY}
                    label={t('Checkout.paymentMethod.typeOf.1')}
                    name={'radioPayment'}
                    value={'COD'}
                    checked={currentPaymentMethod === 'COD'}
                    onChange={handleChange} />
                <div className={styles.line} />
                <BoxPayment
                    paymentMethod={paymentMethods.DEBIT_CREDIT_CARD}
                    label={t('Checkout.paymentMethod.typeOf.2')}
                    name={'radioPayment'}
                    value={paymentMethods.DEBIT_CREDIT_CARD}
                    checked={currentPaymentMethod === 'Card'}
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