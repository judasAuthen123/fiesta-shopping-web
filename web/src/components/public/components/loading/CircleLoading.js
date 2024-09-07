import React from 'react'
import styles from './CircleLoading.module.css'
export default function CircleLoading({boderColor}) {
    return (
        <div className={styles.viewCircleLoad} style={{borderColor: boderColor}}></div>
    )
}
