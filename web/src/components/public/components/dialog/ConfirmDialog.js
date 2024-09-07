import React, { } from 'react'
import styles from './ConfirmDialog.module.css'
import CircleLoading from '../loading/CircleLoading'
export default function ConfirmDialog({ isVisible, onCancel, onConfirm, loading }) {
    const closeModal = () => {
        onCancel(false, '')
    }
    const confirmChangeDafault = () => onConfirm(true)
    if (!isVisible) return null
    return (
        <div className={styles.container}>
            <div className={styles.body}>
                <div className={styles.title}>Use this card as your default card?</div>
                <div className={styles.viewButton}>
                    <button onClick={closeModal}>
                        Cancel
                    </button>
                    <button onClick={confirmChangeDafault}>
                        {
                            loading === true ? <CircleLoading boderColor='black'/> : 'Confirm'
                        }
                    </button>
                </div>
            </div>
        </div>
    )
}
