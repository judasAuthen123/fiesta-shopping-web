import React, {useEffect, useState} from 'react'
import Header from '../../public/components/header/Header'
import Footer from '../../public/components/footer/Footer'
import styles from './Profile.module.css'
import { PiHandWavingFill } from "react-icons/pi";
import ProfileNav from './accessprofile/ProfileNav';
import ArticleProfile from './accessprofile/ArticleProfile';
import { useLocation } from 'react-router-dom';
export default function Profile() {
  const imgUrl = 'https://scontent.fsgn8-1.fna.fbcdn.net/v/t39.30808-6/250994442_869319317289922_2551880571191379996_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeGFSfwq0EAqWxr2NYGofnwRNwS7zghzlYI3BLvOCHOVgqkq93Kazbd2Dl2mwf-rJB34UzILbJow3Oz4APMIW2gx&_nc_ohc=_gckPQlK5noQ7kNvgFtOPOd&_nc_ht=scontent.fsgn8-1.fna&oh=00_AYDiqVq3Ag9uFqTeoyp4rt5KZwg93qavii8y5PGChv4KPA&oe=66DC7DD0'
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const type = queryParams.get('type') 
  const [selectedId, setSelectedId] = useState(type ? parseInt(type, 10) : 1);
  const onChangeId = (id) => {
    setSelectedId(id)
  }
  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.box}>
        <div className={styles.title}>
          My Profile
        </div>
      </div>
      <div className={styles.box}>
        <div className={styles.boxAccess}>
          <div className={styles.boxUser}>
            <div className={styles.boxInfUser}>
              <div className={`${styles.item1} ${styles.item}`}>
                <img alt='' src={imgUrl} />
              </div>
              <div>
                <div className={styles.viewHello}>
                  <div className={`${styles.item2} ${styles.item}`}>Hello</div> <PiHandWavingFill color='#f4b01e' />
                </div>
                <div className={`${styles.item3} ${styles.item}`}>Tin Nguyễn</div>
              </div>
            </div>
            <ProfileNav onChange={onChangeId} keyRender={selectedId}/>
          </div>
          <div className={styles.layoutContent}>
            <ArticleProfile keyRender={selectedId}/>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
