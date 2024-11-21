import React from 'react'
import styles from './DottedLoading.module.css'
export default function DottedLoading() {
  return (
    <div className={styles.container}>
        <div className={styles.pulse}></div>
        <div className={styles.pulse}></div>
        <div className={styles.pulse}></div>
    </div>
  )
}
