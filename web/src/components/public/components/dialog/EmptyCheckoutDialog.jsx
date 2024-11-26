import React, { } from 'react'
import styles from './EmptyCheckoutDialog.module.css'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
export default function EmptyCheckoutDialog({ isVisible }) {
    const { t } = useTranslation()
    const navigate = useNavigate()
    const closeModal = () => {
        navigate('/cart')
    }
    if (!isVisible) return null
    return (
        <div className={styles.container}>
            <div className={styles.body}>
                <div className={styles.title}>{t('Checkout.listEmpty.string1')}</div>
                <div className={styles.title}>{t('Checkout.listEmpty.string2')}</div>
                <button onClick={closeModal}>
                    {t('Checkout.listEmpty.string3')}
                </button>
            </div>
        </div>
    )
}