import React from 'react'
import styles from './DottedLoading.module.css'
export default function DottedLoading({ dotSize, dotColor, gap }) {
  return (
    <div className={styles.container} style={{gap: gap}}>
      <div className={styles.pulse} style={{ height: dotSize, background: dotColor, width: dotSize }}></div>
      <div className={styles.pulse} style={{ height: dotSize, background: dotColor, width: dotSize }}></div>
      <div className={styles.pulse} style={{ height: dotSize, background: dotColor, width: dotSize }}></div>
    </div>
  )
}
