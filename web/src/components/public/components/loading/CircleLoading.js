import React from 'react'
import styles from './CircleLoading.module.css'
export default function CircleLoading({ borderColor, width, height }) {
    return (
        // <div className={styles.loader_1}>
        //     <div className={styles.ripple}></div>
        // </div>
        <div className={styles.box_2} style={{borderColor: borderColor, width: width, height: height}}>
			<div className={styles.loader_2}>
				<div className={styles.spin}></div>
			</div>
		</div>
    )
}
