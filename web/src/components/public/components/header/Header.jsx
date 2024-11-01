import React, { useState } from 'react'
import styles from './Header.module.css'
import { HiOutlineMenu } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import { Link } from 'react-router-dom';
import LoginAccess from './useroption/LoginAccess';
import AccessExCollapse from './AccessExCollapse';
function Header() {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <header className={styles.container}>
      <div className={styles.boxContent}>
        <div className={styles.boxTitle}>
          <h3>Fashion Fiesta</h3>
        </div>
        <nav className={styles.boxHeader}>
          <Link to='/home'>Home</Link>
          <Link to='/shop'>Shop</Link>
          <Link>Out Story</Link>
          <Link>Blog</Link>
          <Link>Contact Us</Link>
        </nav>
        <div className={styles.boxOption}>
          <LoginAccess />
          {/* <div className={styles.boxIcon}>
            <div>
              <CiSearch className={styles.icon} onClick={openSearchView} />
            </div>
            <div>
              <CiHeart className={styles.icon} />
            </div>
            <Link to='/cart'>
              <PiBagThin className={styles.icon} />
            </Link>
          </div>
          <button onClick={() => navigate(`/login`)}>Login</button> */}
        </div>
        <div className={styles.boxCollapse}>
          {isExpanded ? <IoClose size={24} className={styles.iconMenu} onClick={() => setIsExpanded(prev => !prev)} /> :
            <HiOutlineMenu size={24} className={styles.iconMenu} onClick={() => setIsExpanded(prev => !prev)} />}

        </div>
      </div>
      <AccessExCollapse isExpanded={isExpanded} />
    </header>
  )
}
export default React.memo(Header)
