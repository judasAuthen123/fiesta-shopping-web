import React from 'react'
import styles from './DottedLoading.module.css'
export default function DottedLoading({ dotSize, dot1Color, dot2Color, dot3Color, gap }) {
  return (
    <div className={styles.container} style={{gap: gap}}>
      <div className={styles.pulse} style={{ height: dotSize, background: dot1Color, width: dotSize }}></div>
      <div className={styles.pulse} style={{ height: dotSize, background: dot2Color, width: dotSize }}></div>
      <div className={styles.pulse} style={{ height: dotSize, background: dot3Color, width: dotSize }}></div>
    </div>
  )
}
