import React from 'react'
import styles from './ItemAddress.module.css'
import { FiEdit, FiPhoneCall } from 'react-icons/fi'
import { RiDeleteBin6Line } from 'react-icons/ri'
export default function ItemAddress() {
    return (
        <div className={styles.container}>
            <div className={styles.boxAddress}>
                <p>
                    Robert Fox
                </p>
                <p>
                    4517 Washington Ave. Manchester, Kentucky 39495
                </p>
                <p>
                    <FiPhoneCall /> 0358856753
                </p>
            </div>
            <div className={styles.buttonView}>
                <button className={styles.btnEdit}>
                    <FiEdit className={styles.icon} />
                    <div className={styles.text}>
                        Edit
                    </div>
                </button>
                <button className={styles.btnDelete}>
                    <RiDeleteBin6Line className={styles.icon} />
                    <div className={styles.text}>
                        Delete
                    </div>
                </button>
            </div>
        </div>
    )
}
