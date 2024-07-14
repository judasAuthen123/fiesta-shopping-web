import React from 'react'
import styles from './CategoryList.module.css'
import ItemCategory from './ItemCategory';
export default function CategoryList({categories, mainCategoryID}) {
  return (
    <>
      {
        categories && categories.length > 0 ?
          categories.map(item =>
            <div key={item._id} className={styles.container}>
              <div className={styles.boxLabel}>
                <ItemCategory id={item._id} name={item.name} mainCategoryID={mainCategoryID}/>
              </div>
            </div>
          ) : <div />
      }
    </>
  )
}