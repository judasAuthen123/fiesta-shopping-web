import React, { useContext, useEffect, useRef } from 'react'
import styles from './AccessExCollapse.module.css'
import { FaChevronRight } from "react-icons/fa";
import { defaultAvt } from '../../components/image/DefaultIAvt'
import { Link } from 'react-router-dom'
import { AppContext } from '../../../../util/AppContext';
export default function AccessExCollapse({ isExpanded }) {
  const { dataUser } = useContext(AppContext)
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
          <div className={styles.boxUser}>
            <img alt='' src={dataUser.image?.id ? dataUser.image.url : defaultAvt} />
            <div className={styles.info}>
              <p>{dataUser.name}</p>
            </div>
          </div>
          <nav>
            <Link to='/home'>Home <FaChevronRight className={styles.iconAccess} /></Link>
            <Link to='/shop'>Shop <FaChevronRight className={styles.iconAccess} /></Link>
            <Link>Our Story <FaChevronRight className={styles.iconAccess} /></Link>
            <Link>Blog <FaChevronRight className={styles.iconAccess} /></Link>
            <Link>Contact Us <FaChevronRight className={styles.iconAccess} /></Link>
          </nav>
        </div>
      </div>
    </div>
  )
}
