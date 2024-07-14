import React, { useState } from 'react'
import styles from './Header.module.css'
import { CiSearch, CiHeart } from "react-icons/ci";
import { PiBagThin } from "react-icons/pi";
import { AiOutlineClose } from "react-icons/ai";
import MenuDrop from './menudrop/MenuDrop';
import { useDispatch } from 'react-redux';
import filtersSlice from '../../../screens/shop/filters/filtersSlice';
import { Link } from 'react-router-dom';
function Header() {
  const dispatch = useDispatch()
  const [isShowSearchView, setisShowSearchView] = useState(false);
  const openSearchView = () => {
    setisShowSearchView(!isShowSearchView);
  }
  const searchNameHandler = (e) => {
    dispatch(filtersSlice.actions.onChangeName(e.target.value))
  }
  return (
    <header className={styles.container}>
      <div className={styles.boxContent}>
        <div className={styles.boxTitle}>
          <h3>Fashion Fiesta</h3>
        </div>
        <nav className={styles.boxHeader}>
          <Link to='/home'>Home</Link>
          <MenuDrop />
          <Link href='#'>Out Story</Link>
          <Link href='#'>Blog</Link>
          <Link href='#'>Contact Us</Link>
        </nav>
        <div className={styles.boxOption}>
          <div className={styles.boxIcon}>
            <div>
              <CiSearch className={styles.icon} onClick={openSearchView} />
            </div>
            <div>
              <CiHeart className={styles.icon} />
            </div>
            <div >
              <PiBagThin className={styles.icon} />
            </div>
          </div>
          <button>Login</button>
        </div>
      </div>
      <div className={styles.viewSearch} style={isShowSearchView ? { top: 80 } : { top: 0 }}>
        <input className={styles.inputSearchName} placeholder='Search in store...' onChange={searchNameHandler} />
        <button><CiSearch className={styles.icon} />Tìm kiếm</button>
        <div className={styles.viewClose}><AiOutlineClose /></div>
      </div>
    </header>
  )
}
export default React.memo(Header)
