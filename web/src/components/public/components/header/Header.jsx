import React, { useEffect, useState } from 'react'
import styles from './Header.module.css'
import { HiOutlineMenu } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import { Link } from 'react-router-dom';
import LoginAccess from './useroption/LoginAccess';
import AccessExCollapse from './AccessExCollapse';
import { useTranslation } from 'react-i18next';
function Header() {


  const [isVisible, setIsVisible] = useState(false)
  const { t } = useTranslation()
  function debounce(func, deley) {
    let timer;
    return function () {
      clearTimeout(timer)
      timer = setTimeout(() => func(), deley)
    }
  }

  useEffect(() => {
    const handlerExCollapse = debounce(() => {
      if (window.innerWidth > 1050) {
        setIsVisible(false)
      }
    }, 20)
    window.addEventListener('resize', handlerExCollapse)
    return () => window.removeEventListener('resize', handlerExCollapse)
  }, [])


  return (
    <header className={styles.container}>
      {isVisible ? <div className={styles.containerExpanded} onClick={() => setIsVisible(false)}> </div> : null}
      <div className={styles.boxContent}>
        <div className={styles.boxTitle}>
          <h3>Fashion Fiesta</h3>
        </div>
        <nav className={styles.boxHeader}>
          <Link to='/home'>{t('Header.home')}</Link>
          <Link to='/shop'>{t('Header.shop')}</Link>
          <Link>{t('Header.ourStory')}</Link>
          <Link>{t('Header.blog')}</Link>
          <Link>{t('Header.contactUs')}</Link>
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
          {isVisible ? <IoClose size={24} className={styles.iconMenu} onClick={() => setIsVisible(prev => !prev)} /> :
            <HiOutlineMenu size={24} className={styles.iconMenu} onClick={() => setIsVisible(prev => !prev)} />}

        </div>
      </div>
      <AccessExCollapse isExpanded={isVisible} onCloseDrop={() => setIsVisible(false)} />
    </header>
  )
}
export default React.memo(Header)