import React, { } from 'react'
import styles from './ErrorDialog.module.css'
import { useTranslation } from 'react-i18next'
export default function ErrorDialog({ isVisible, onClose }) {
    const {t} = useTranslation()
    const closeModal = () => {
        onClose(false)
    }
    if (!isVisible) return null
    return (
        <div className={styles.container}>
            <div className={styles.body}>
                <div className={styles.title}>{t('Cart.errorGoCheckout')}</div>
                <div className={styles.viewButton}>
                    <button onClick={closeModal}>
                        OK
                    </button>
                </div>
            </div>
        </div>
    )
}