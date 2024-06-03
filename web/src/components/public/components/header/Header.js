import React, { useState, useEffect } from 'react'
import styles from './Header.module.css'
import { CiSearch, CiHeart } from "react-icons/ci";
import { PiBagThin } from "react-icons/pi";
import { AiOutlineClose } from "react-icons/ai";
import MenuDrop from './menudrop/MenuDrop';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import filtersSlice from '../../../screens/shop/filters/filtersSlice';
import { filterSelected } from '../../../redux/selector';
export default function Header() {
  const dispatch = useDispatch()
  const selector = useSelector(filterSelected)
  const [name, setName] = useState('')
  const searchNameHandler = (e) => {
    dispatch(filtersSlice.actions.onChangeName(e.target.value))
  }
  useEffect(() => {
    console.log(selector.searchFields);
    return () => {
    }
  }, [selector.searchFields])
  
  return (
    <header className={styles.container}>
      <div className={styles.boxContent}>
        <div className={styles.boxTitle}>
          <h3>Fashion Fiesta</h3>
        </div>
        <nav className={styles.boxHeader}>
          <a href='#'>Home</a>
          <MenuDrop />
          <a href='#'>Out Story</a>
          <a href='#'>Blog</a>
          <a href='#'>Contact Us</a>
        </nav>
        <div className={styles.boxOption}>
          <CiSearch className={styles.icon} />
          <CiHeart className={styles.icon} />
          <PiBagThin className={styles.icon} />
          <button>Login</button>
        </div>
      </div>
      <div className={styles.viewSearch}>
        <input className={styles.inputSearchName} placeholder='Search in store...' onChange={searchNameHandler}/>
        <button><CiSearch className={styles.icon}/>Tìm kiếm</button>
        <div className={styles.viewClose}><AiOutlineClose/></div>
      </div>
    </header>
  )
}
