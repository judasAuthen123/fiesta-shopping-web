import React, { } from 'react'
import styles from './ErrorDialog.module.css'
export default function ErrorDialog({ isVisible, onClose }) {
    const closeModal = () => {
        onClose(false)
    }
    if (!isVisible) return null
    return (
        <div className={styles.container}>
            <div className={styles.body}>
                <div className={styles.title}>You have not selected any items for checkout!</div>
                <div className={styles.viewButton}>
                    <button onClick={closeModal}>
                        OK
                    </button>
                </div>
            </div>
        </div>
    )
}