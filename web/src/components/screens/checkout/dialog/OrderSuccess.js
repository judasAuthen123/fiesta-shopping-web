import React, { useEffect, useState } from 'react'
import styles from './OrderSuccess.module.css'
import { useTranslation } from 'react-i18next'
export default function OrderSuccess({ isVisible, onClose, completeCheckout }) {
    const { t } = useTranslation()
    const [seconds, setSeconds] = useState(5)
    useEffect(() => {
        let timer;
        if (isVisible) {
            setSeconds(5); // Reset số giây mỗi khi dialog mở lại

            timer = setInterval(() => {
                setSeconds(prevSeconds => {
                    if (prevSeconds > 1) {
                        return prevSeconds - 1;
                    } else {
                        clearInterval(timer); // Dừng interval
                        onClose(false); // Đóng dialog khi đếm ngược đến 0
                        completeCheckout('done')
                        return 0;
                    }
                });
            }, 1000);
        }

        // Cleanup interval khi dialog đóng hoặc component unmount
        return () => clearInterval(timer);
    }, [isVisible, onClose, completeCheckout])

    if (!isVisible) return null
    return (
        <div className={styles.container}>
            <div className={styles.body}>
                <div className={styles.title}>
                    <p>
                        {t('Checkout.doneCheckout.dialogTitle.string1')}
                    </p>
                    <p>
                        {t('Checkout.doneCheckout.dialogTitle.string2')}
                    </p>
                </div>
                <div className={styles.viewButton}>
                    <button onClick={() => {
                        onClose(false)
                        completeCheckout('done')
                    }
                    }>
                        OK ({seconds}s)
                    </button>
                </div>
            </div>
        </div>
    )
}