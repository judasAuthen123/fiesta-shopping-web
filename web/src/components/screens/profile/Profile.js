import React, {useState} from 'react'
import Header from '../../public/components/header/Header'
import Footer from '../../public/components/footer/Footer'
import styles from './Profile.module.css'
import { PiHandWavingFill } from "react-icons/pi";
import ProfileNav from './accessprofile/ProfileNav';
import ArticleProfile from './accessprofile/ArticleProfile';
export default function Profile() {
  const imgUrl = 'http://scontent.fsgn8-3.fna.fbcdn.net/v/t39.30808-1/250994442_869319317289922_2551880571191379996_n.jpg?stp=dst-jpg_p200x200&_nc_cat=110&ccb=1-7&_nc_sid=0ecb9b&_nc_ohc=uY56iNhsJWQQ7kNvgEu2aNY&_nc_ht=scontent.fsgn8-3.fna&gid=ARKFolf-NPpNeGgI_iiTuHh&oh=00_AYClQ83dCfjK6P9RhP6F1BzkpIC9OdpP5YgOuNfYl4zwyA&oe=668ACE0A'
  const [selectedId, setselectedId] = useState(1);
  const onChangeId = (id) => {
    setselectedId(id)
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
            <ProfileNav onChange={onChangeId}/>
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
