import React, { } from 'react'
import styles from './Header.module.css'
import { CiSearch } from "react-icons/ci";
import { AiOutlineClose } from "react-icons/ai";
import MenuDrop from './menudrop/MenuDrop';
import { Link } from 'react-router-dom';
import LoginAccess from './useroption/LoginAccess';
function Header() {
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
      </div>
    </header>
  )
}
export default React.memo(Header)
