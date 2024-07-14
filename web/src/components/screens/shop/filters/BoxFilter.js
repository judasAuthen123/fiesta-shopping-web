import React, { useState, useEffect, useRef } from 'react';
import styles from './BoxFilter.module.css'
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import SubCategoryList from '../categories/SubCategoryList';
import PriceRanged from '../price/PriceRanged';
function BoxFilter({ label, filterMethod }) {
  const [expanded, setExpanded] = useState(false);
  const boxFilterRef = useRef(null);
  const toggleExpanded = () => {
    setExpanded(prevExpanded => !prevExpanded);
  };
  useEffect(() => {
    if (expanded) {
      // const scrollHeight = boxFilterRef.current.scrollHeight
      boxFilterRef.current.style.maxHeight = `400px`;
    } else {
      boxFilterRef.current.style.maxHeight = `0px`;
    }
  }, [expanded]);

  let filterComponent;
  switch (filterMethod) {
    case 'categories':
      filterComponent = <SubCategoryList />;
      break;
    case 'color':
      filterComponent = null;
      break;
    case 'price':
      filterComponent = <PriceRanged />;
      break;
    default:
      filterComponent = null;
  }
  return (
    <div
      className={styles.container}>
      <div className={styles.title} onClick={toggleExpanded}>
        <h5>{label}</h5> {expanded === true ? <IoIosArrowDown /> : <IoIosArrowUp />}
      </div>
      <div className={styles.boxFilter} ref={boxFilterRef}>
        {filterComponent}
      </div>
    </div>
  )
}
export default React.memo(BoxFilter)
