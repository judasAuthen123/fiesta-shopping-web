import React from 'react'
import styles from './DoubleCircleLoading.module.css'
export default function DoubleCircleLoading({ width, height, spin1Color, spin2Color, spin1Width, spin1Height }) {
    return (
        <div className={styles.container} style={{ width: width, height: height }}>
            <div className={styles.dbl_spin_1}
                style={{
                    borderTopColor: spin1Color,
                    borderLeftColor: spin1Color,
                    width: spin1Width,
                    height: spin1Height
                }}></div>
            <div className={styles.dbl_spin_2} style={{ borderBottomColor: spin2Color, borderLeftColor: spin2Color }}></div>
        </div>
    )
}
