import { useState, useEffect, useRef } from 'react';
import styles from './BoxFilter.module.css'
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import SubCategoryList from '../categories/SubCategoryList';
import { useDispatch, useSelector } from 'react-redux';
import { slideSelected } from '../../../redux/selector';
import slideSlice from './slideSlice';
import PriceRanged from '../price/PriceRanged';
export default function BoxFilter({ label, filterMethod }) {
  const dispatch = useDispatch();
  const selecter = useSelector(slideSelected);
  const [expanded, setExpanded] = useState(false);
  const boxFilterRef = useRef(null);

  // kiểm tra trạng thái đóng mở của slide
  const toggleExpanded = () => {
    setExpanded(prevExpanded => !prevExpanded);
  };

  // hàm sửa đổi giá trị chiều cao cho slide trên redux store
  const slideHandler = (height) => {
    dispatch(slideSlice.actions.onHeightChange(height))
  }

  // sử dụng ref để truy cập đến các phần tử DOM, gọi ra giá trị chiều cao thanh cuộn
  useEffect(() => {
    if (expanded) {
      const scrollHeight = boxFilterRef.current.scrollHeight;
      boxFilterRef.current.style.maxHeight = `700px`
      slideHandler(scrollHeight)
    } else {
      boxFilterRef.current.style.maxHeight = `0px`
      slideHandler(0)
    }
  }, [expanded]);

  // sửa chiều cao cho slide với giá trị trên redux store
  // useEffect(() => {
  //     boxFilterRef.current.style.maxHeight = `${selecter.height}px`;
  // }, [selecter.height]);

  let filterComponent;
  switch (filterMethod) {
    case 'categories':
      filterComponent = <SubCategoryList />;
      break;
    case 'color':
      filterComponent = null;
      break;
    case 'price':
      filterComponent = <PriceRanged/>;
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
