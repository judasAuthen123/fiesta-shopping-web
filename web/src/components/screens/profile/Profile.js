import React, { useContext, useEffect, useState } from 'react'
import Header from '../../public/components/header/Header'
import Footer from '../../public/components/footer/Footer'
import styles from './Profile.module.css'
import { PiHandWavingFill } from "react-icons/pi";
import { CgMenuLeft, CgMenuRight } from "react-icons/cg";
import ProfileNav from './accessprofile/ProfileNav';
import ArticleProfile from './accessprofile/ArticleProfile';
import { useLocation } from 'react-router-dom';
import { AppContext } from '../../../util/AppContext';
import { defaultAvt } from '../../public/components/image/DefaultIAvt';
export default function Profile() {
  const { dataUser } = useContext(AppContext)
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const type = queryParams.get('type')
  const [sideAction, setSideAction] = useState(false)
  const [selectedId, setSelectedId] = useState(type ? parseInt(type, 10) : 1);
  const onChangeId = (id) => {
    setSelectedId(id)
  }
  useEffect(() => {
    setSideAction(false)
  }, [selectedId])
  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.box}>
        <div className={styles.title}>
          <CgMenuLeft
            className={styles.btnSidebar}
            onClick={() => setSideAction(prev => !prev)} /> My Profile
        </div>
      </div>
      <div className={styles.box}>
        <div className={styles.boxAccess}>
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
                  <div className={`${styles.item2} ${styles.item}`}>Hello</div> <PiHandWavingFill color='#f4b01e' />
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
