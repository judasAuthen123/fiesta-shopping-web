import { useState, useRef, useEffect } from 'react';
import { TiPlus, TiMinus } from "react-icons/ti";
import styles from './SubCategoryList.module.css'
import CategoryList from './CategoryList';
import ItemSubCategory from './ItemSubCategory';
import AxiosInstance from '../../../../util/AxiosInstance';
import { useSelector } from 'react-redux';
import { currentMainCategoryFilterSelected } from '../../../redux/selector';
export default function SubCategory() {
  const [expanded, setExpanded] = useState({});
  const boxCategoryRefs = useRef({});
  const [categoryList, setCategoryList] = useState([])
  const currentMainCategory = useSelector(currentMainCategoryFilterSelected)
  useEffect(() => {
    const getCategories = async () => {
      const response = await AxiosInstance.get(`/category/getCategory`)
      if (response.result === true && response.data) {
        setCategoryList(response.data)
      }
    }
    getCategories()
  }, [])
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
      if (expanded[id]) {
        boxCategoryRefs.current[id].style.maxHeight = `${scrollHeight}px`;
        console.log(id);
        console.log(currentMainCategory);
      } else {
        boxCategoryRefs.current[id].style.maxHeight = '0px';
      }
    });
  }, [expanded, currentMainCategory]);


  // const getCategoriesForSubCategory = (subCategoryId) => {
  //   return category.filter(category => category.idSubCategory.includes(subCategoryId));
  // };


  return (
    <>
      {
        categoryList && categoryList.length > 0 ?
          categoryList.map(item =>
            <div key={item._id} className={styles.container}>
              <div className={styles.viewSubCategory}>
                <div className={styles.boxLabel}>
                  <ItemSubCategory id={item._id} name={item.name}/>
                </div>
                <div className={styles.iconView} onClick={() => toggleExpanded(item._id)}>
                  {expanded[item._id] === true ? <TiMinus /> : <TiPlus />}
                </div>
              </div>
              <div className={styles.viewCategory} ref={el => boxCategoryRefs.current[item._id] = el}>
                <CategoryList categories={item.subCategory} mainCategoryID={item._id}/>
              </div>
            </div>
          ) : <div />
      }
    </>
  )
}
