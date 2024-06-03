import { useState, useRef, useEffect } from 'react';
import { subCategory, category } from '../../../public/components/header/menudrop/MenuDrop'
import { TiPlus, TiMinus } from "react-icons/ti";
import styles from './SubCategoryList.module.css'
import CategoryList from './CategoryList';
import ItemSubCategory from './ItemSubCategory';
export default function SubCategory() {
  const [isChecked, setIsChecked] = useState(false)
  const [expanded, setExpanded] = useState({});
  const boxCategoryRefs = useRef({});
  let totalHeight = 0
  const toggleExpanded = (id) => {
    setExpanded((prevExpanded) => {
      const updatedExpanded = { ...prevExpanded };
      updatedExpanded[id] = !prevExpanded[id];
      return updatedExpanded;
    });
  };
  // Update parent height when any sub-category expands or collapses
  useEffect(() => {
    Object.keys(expanded).forEach(id => {
      const scrollHeight = boxCategoryRefs.current[id]?.scrollHeight || 0;
      console.log('scrollHeight: ' + scrollHeight);
      if (expanded[id]) {
        boxCategoryRefs.current[id].style.maxHeight = `${scrollHeight}px`;
      } else {
        boxCategoryRefs.current[id].style.maxHeight = '0px';
      }
    });
  }, [expanded]);


  const getCategoriesForSubCategory = (subCategoryId) => {
    return category.filter(category => category.idSubCategory.includes(subCategoryId));
  };

  
  return (
    <>
      {
        subCategory && subCategory.length > 0 ?
          subCategory.map(item =>
            <div key={item.id} className={styles.container}>
              <div className={styles.viewSubCategory}>
                <div className={styles.boxLabel}>
                  <ItemSubCategory id={item.id} name={item.name}/>
                </div>
                <div className={styles.iconView} onClick={() => toggleExpanded(item.id)}>
                  {expanded[item.id] === true ? <TiMinus /> : <TiPlus />}
                </div>
              </div>
              <div className={styles.viewCategory} ref={el => boxCategoryRefs.current[item.id] = el}>
                <CategoryList categories={getCategoriesForSubCategory(item.id)} />
              </div>
            </div>
          ) : <div />
      }
    </>
  )
}
