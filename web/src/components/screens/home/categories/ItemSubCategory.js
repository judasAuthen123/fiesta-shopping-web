import React from 'react'
import styles from './ItemSubCategory.module.css'
export default function ItemSubCategory({name}) {
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <text>
            {name}
        </text>
      </div>
    </div>
  )
}
