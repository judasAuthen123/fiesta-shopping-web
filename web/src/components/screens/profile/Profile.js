import React, { useContext, useEffect, useState } from 'react'
import Header from '../../public/components/header/Header'
import styles from './Profile.module.css'
import { PiHandWavingFill } from "react-icons/pi";
import { CgMenuLeft, CgMenuRight } from "react-icons/cg";
import ProfileNav from './accessprofile/ProfileNav';
import ArticleProfile from './accessprofile/ArticleProfile';
import { useLocation } from 'react-router-dom';
import { AppContext } from '../../../util/AppContext';
import { defaultAvt } from '../../public/components/image/DefaultIAvt';
import { useTranslation } from 'react-i18next';
export default function Profile() {
  const { dataUser } = useContext(AppContext)
  const location = useLocation()
  const {t} = useTranslation()
  const queryParams = new URLSearchParams(location.search)
  const type = queryParams.get('type')
  const [sideAction, setSideAction] = useState(false)
  const [selectedId, setSelectedId] = useState(type ? parseInt(type, 10) : 1);
  const [sizeResponsive, setSizeResponsive] = useState(window.innerWidth <= 850)
  function debounce(func, delay) {
    let timer;
    return function () {
      clearTimeout(timer);
      timer = setTimeout(() => func(), delay);
    };
  }
  // function debounce(func, delay) {
  //   let timer;
  //   return function (...args) {
  //     clearTimeout(timer);
  //     timer = setTimeout(() => func.apply(this, args), delay);
  //   };
  // }
  useEffect(() => {
    const handlerSideAction = debounce(() => {
      if (window.innerWidth > 850) {
        setSideAction(false)
        setSizeResponsive(false)
      } else {
        setSizeResponsive(true)
      }
    }, 20)
    window.addEventListener('resize', handlerSideAction);
    return () => window.removeEventListener('resize', handlerSideAction);
  }, [])
  const onChangeId = (id) => {
    setSelectedId(id)
  }
  useEffect(() => {
    setSideAction(false)
  }, [selectedId])
  useEffect(() => {
    if(type && typeof parseInt(type, 10) === 'number' && parseInt(type, 10) <= 7 && parseInt(type, 10) >= 1) {
      setSelectedId(parseInt(type, 10))
    } else {
      setSelectedId(1)
    } 
  }, [type])
  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.box}>
        <div className={styles.title}>
          <CgMenuLeft
            className={styles.btnSidebar}
            onClick={() => setSideAction(prev => !prev)} /> {t('Profile.title')}
        </div>
      </div>
      <div className={styles.box}>
        <div className={styles.boxAccess}>
          {sideAction && sizeResponsive && <div className={styles.containerSidebar} onClick={() => setSideAction(false)}></div>}
          <div className={`${styles.boxUser} ${sideAction ? styles.show : ''}`}>
            <CgMenuRight
              className={styles.btnSidebarClose}
              onClick={() => setSideAction(prev => !prev)} />
            <div className={styles.boxInfUser}>
              <div className={`${styles.item1} ${styles.item}`}>
                <img alt='' src={dataUser.image?.id ? dataUser.image.url : defaultAvt} />
              </div>
              <div>
                <div className={styles.viewHello}>
                  <div className={`${styles.item2} ${styles.item}`}>{t('Profile.Nav.hello')}</div> <PiHandWavingFill color='#f4b01e' />
                </div>
                <div className={`${styles.item3} ${styles.item}`}>{dataUser?.name}</div>
              </div>
            </div>
            <ProfileNav onChange={onChangeId} keyRender={selectedId} />
          </div>
          <div className={styles.layoutContent}>
            <ArticleProfile keyRender={selectedId} />
          </div>
        </div>
      </div>
    </div>
  )
}
