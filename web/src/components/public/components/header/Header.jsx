import React, { useContext, useEffect, useState } from 'react'
import styles from './Header.module.css'
import { HiOutlineMenu } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import { Link } from 'react-router-dom';
import LoginAccess from './useroption/LoginAccess';
import AccessExCollapse from './AccessExCollapse';
import { useTranslation } from 'react-i18next';
import CartDrop from './cartdrop/CartDrop';
import { AppContext } from '../../../../util/AppContext';
import FlagDrop from './flagdrop/FlagDrop';
function Header() {
  const {dataUser, token} = useContext(AppContext) 

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
        </div>
        <div className={styles.boxCollapse}>
          {
            token && dataUser ? <CartDrop /> : <FlagDrop />
          }
          
          {isVisible ? <IoClose size={24} className={styles.iconMenu} onClick={() => setIsVisible(prev => !prev)} /> :
            <HiOutlineMenu size={24} className={styles.iconMenu} onClick={() => setIsVisible(prev => !prev)} />}

        </div>
      </div>
      <AccessExCollapse isExpanded={isVisible} onCloseDrop={() => setIsVisible(false)} />
    </header>
  )
}
export default React.memo(Header)
