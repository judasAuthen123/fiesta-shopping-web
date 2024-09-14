import React, { useEffect, useRef } from 'react'
import styles from './ItemSubCategory.module.css'
export default function ItemSubCategory({name}) {
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <div>
            {name}
        </div>
      </div>
    </div>
  )
}
