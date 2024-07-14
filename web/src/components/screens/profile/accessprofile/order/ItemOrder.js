import React, { useState } from 'react'
import styles from './ItemOrder.module.css'
import image from '../../../../assets/images/th.png'
export default function ItemOrder({status}) {
    return (
        <div className={styles.container}>

            <div className={styles.boxOrder}>
                <div className={styles.image}>
                    <img alt='T-shirt' loading='lazy' src={image} />
                </div>
                <div className={styles.boxInfo}>
                    <p>
                        Girls Pink Moana Printed Dress
                    </p>
                    <p>
                        Size: S
                    </p>
                    <p>
                        Count: 5
                    </p>
                </div>
                <div>
                    <p>$80.00</p>
                </div>
                <div className={styles.viewBtn}>
                    <button className={`${styles.btn} ${styles.btnViewOrder}`}>View Order</button>
                    {
                        status === 'delivered' ? <button className={`${styles.btn} ${styles.btnReview}`}>Write A Review</button> :
                            <button className={`${styles.btn} ${styles.btnCancel}`}>Cancel Order</button>
                    }
                </div>
            </div>
            <div>
                {
                    status === 'delivered' ?
                        <div className={`${styles.viewStatus} ${styles.delivered}`}>
                            <div>Delivered</div>
                            <div>Your product has been delivered</div>
                        </div> :
                        <div className={`${styles.viewStatus} ${styles.inprocess}`}>
                            <div>Inprocess</div>
                            <div>Your product has been Inprocess</div>
                        </div>
                }
            </div>
        </div>
    )
}
export const orders = [
    {
        "id": 1,
        "status": "delivered"
    },
    {
        "id": 2,
        "status": "inprocess"
    }
]
