import React, { useEffect, useRef } from 'react'
import styles from './AccessExCollapse.module.css'
import { FaChevronRight } from "react-icons/fa";
import { Link } from 'react-router-dom'
import { IoHomeOutline } from "react-icons/io5";
import { MdOutlineShop2 } from "react-icons/md";
import { AiOutlineHistory } from "react-icons/ai";
import { IoLogoFoursquare } from "react-icons/io";
import { IoMdContacts } from "react-icons/io";
import LoginAccessExCollapse from './useroption/LoginAccessExCollapse';
import { useTranslation } from 'react-i18next';
export default function AccessExCollapse({ isExpanded, onCloseDrop }) {
  const { t } = useTranslation()
  const containerRef = useRef()
  useEffect(() => {
    if (isExpanded) {
      if (containerRef.current) {
        const maxWidth = containerRef.current.scrollHeight
        containerRef.current.style.height = `${maxWidth}px`
      }
    } else {
      containerRef.current.style.height = `0px`
    }
  }, [isExpanded])
  return (
    <div className={styles.container} ref={containerRef}>
      <div className={styles.body}>
        <div className={`${styles.boxContent} ${isExpanded ? styles.in : styles.out}`}>
          <LoginAccessExCollapse onCloseDrop={onCloseDrop} />
          <nav>
            <Link to='/home'><div className={styles.viewTitleAccess}><IoHomeOutline size={16.5} />{t('Header.home')}</div><FaChevronRight className={styles.iconAccess} /></Link>
            <Link to='/shop'><div className={styles.viewTitleAccess}><MdOutlineShop2 size={16.5} />{t('Header.shop')}</div><FaChevronRight className={styles.iconAccess} /></Link>
            <Link><div className={styles.viewTitleAccess}><AiOutlineHistory size={16.5} />{t('Header.ourStory')}</div><FaChevronRight className={styles.iconAccess} /></Link>
            <Link><div className={styles.viewTitleAccess}><IoLogoFoursquare size={16.5} />{t('Header.blog')}</div><FaChevronRight className={styles.iconAccess} /></Link>
            <Link><div className={styles.viewTitleAccess}><IoMdContacts size={16.5} />{t('Header.contactUs')}</div><FaChevronRight className={styles.iconAccess} /></Link>
          </nav>
        </div>
      </div>
    </div>
  )
}
