import React, { useEffect, useRef, useState } from 'react'
import styles from './ItemSubCategory.module.css'
import { useNavigate } from 'react-router-dom'
export default function ItemSubCategory({ name, image, id }) {
  const navigate = useNavigate()
  const [isScrollTo, setIsScrollTo] = useState(false)
  const ref = useRef(null)
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsScrollTo(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []);
  return (
    <div className={styles.container} onClick={() => navigate('/shop-category', { state: { id } })}>
      <div ref={ref} 
      className={`${styles.background} ${isScrollTo ? styles.scrollTo : styles.not_scrollTo}`} 
      style={{
        background: `url(${image?.url}) center center / cover no-repeat`,
        backgroundPosition: 'center', height: '100%', width: '100%', zIndex: -1, position: 'absolute', top: 0, left: 0,
      }}>

      </div>
      <div className={styles.title}>
        <div>
          {name}
        </div>
      </div>
    </div>
  )
}
