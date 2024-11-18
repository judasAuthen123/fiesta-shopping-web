import { useState, useEffect } from 'react';
import styles from './SubCategoryList.module.css'
import { useTranslation } from 'react-i18next';
import ItemSubCategory from './ItemSubCategory';
import AxiosInstance from '../../../../util/AxiosInstance';
import { FaChevronRight } from 'react-icons/fa';
export default function SubCategory() {
  const [categoryList, setCategoryList] = useState([])
  const { t } = useTranslation()
  
  useEffect(() => {
    const getCategories = async () => {
      try {
        const response = await AxiosInstance.get(`/category/getCategory`)
        
        if (response.result === true && response.data) {
          setCategoryList(response.data)
        }
      } catch (error) {
        console.log(error);
      }
    }
    getCategories()
  }, [])
  const ctgStyleName = t('MongoTranslator.nameCtg')

  // const toggleExpanded = (id) => {
  //   setExpanded((prevExpanded) => {
  //     const updatedExpanded = { ...prevExpanded };

  //       updatedExpanded[id] = !prevExpanded[id];

  //     return updatedExpanded;
  //   });
  // };
  // // Update parent height when any sub-category expands or collapses
  // useEffect(() => {
  //   Object.keys(expanded).forEach(id => {
  //     const scrollHeight = boxCategoryRefs.current[id]?.scrollHeight || 0;
  //     if (expanded[id]) {
  //       boxCategoryRefs.current[id].style.maxHeight = `${scrollHeight}px`;
  //     } else {
  //       boxCategoryRefs.current[id].style.maxHeight = '0px';
  //     }
  //   });
  // }, [expanded, currentMainCategory]);


  // const getCategoriesForSubCategory = (subCategoryId) => {
  //   return category.filter(category => category.idSubCategory.includes(subCategoryId));
  // };


  return (
    <div className={styles.container}>
      {
        categoryList && categoryList.length > 0 ?
          categoryList.map(item => {
            return (
              <div key={item._id} className={styles.subCategoryView}>
                <div className={styles.viewSubCategory}>
                  <div className={styles.boxLabel}>
                    <ItemSubCategory id={item._id} name={item.name[ctgStyleName]} />
                  </div>
                  <div className={styles.iconView}>
                    <FaChevronRight size={10} />
                  </div>
                </div>
                {/* <div className={styles.viewCategory} ref={el => boxCategoryRefs.current[item._id] = el}>
                <CategoryList categories={item.subCategory} mainCategoryID={item._id}/>
              </div> */}
              </div>
            )
          }) : <div />
      }
    </div>
  )
}
