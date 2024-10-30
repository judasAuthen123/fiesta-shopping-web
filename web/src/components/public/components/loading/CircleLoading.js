import React from 'react'
import styles from './CircleLoading.module.css'
export default function CircleLoading({boderColor, width, height}) {
    return (
        <div className={styles.viewCircleLoad} style={{borderColor: boderColor, width: width, height: height}}></div>
    )
}
