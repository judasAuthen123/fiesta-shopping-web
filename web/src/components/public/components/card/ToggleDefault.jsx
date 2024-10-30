import React from 'react'
import styles from './ToggleDefault.module.css'
export default function ToggleDefault({ result }) {
    return (
        <div className={`${styles.container2} ${result ? styles.on : styles.off}`}>
            <div className={styles.dot}>

            </div>
        </div>
    )
}