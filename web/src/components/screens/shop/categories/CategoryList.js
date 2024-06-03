import React from 'react'
import { TiPlus } from "react-icons/ti";
import styles from './CategoryList.module.css'
import ItemCategory from './ItemCategory';
export default function CategoryList({categories}) {
  return (
    <>
      {
        categories && categories.length > 0 ?
          categories.map(item =>
            <div key={item.id} className={styles.container}>
              <div className={styles.boxLabel}>
                <ItemCategory id={item.id} name={item.name}/>
              </div>
            </div>
          ) : <div />
      }
    </>
  )
}