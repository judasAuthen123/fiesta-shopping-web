import React from 'react';
import styles from './BoxFilter.module.css'
import SubCategoryList from '../categories/SubCategoryList';
import PriceRanged from '../price/PriceRanged';
function BoxFilter({ label, filterMethod }) {
  // const [expanded, setExpanded] = useState(false);
  // const boxFilterRef = useRef(null);
  // const toggleExpanded = () => {
  //   setExpanded(prevExpanded => !prevExpanded);
  // };
  // useEffect(() => {
  //   if (expanded) {
  //     const scrollHeight = boxFilterRef.current.scrollHeight
  //     boxFilterRef.current.style.maxHeight = `${scrollHeight}px`;
  //   } else {
  //     boxFilterRef.current.style.maxHeight = `0px`;
  //   }
  // }, [expanded]);
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
      <div className={styles.title}>
        <p>{label}</p>
      </div>
      <div className={styles.boxFilter}>
        {filterComponent}
      </div>
    </div>
  )
}
export default React.memo(BoxFilter)
