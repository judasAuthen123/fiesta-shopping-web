import React from 'react'
import styles from './ShineOrderLoading.module.css'
export default function ShineOrderLoading() {
  const arrItem = [
    1, 2, 3
  ]
  return (
    <div className={styles.container}>
      <div className={styles.body}>
        {
          arrItem.map(item =>
            <div className={styles.itemOrder} key={item}>
              <div className={styles.boxLeft}>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>
              <div className={styles.boxRight}>
                <div></div>
                <div></div>
              </div>
            </div>
          )
        }

      </div>
    </div>
  )
}


