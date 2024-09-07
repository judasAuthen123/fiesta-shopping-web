import React, { useState } from 'react'
import styles from './InfoUser.module.css'
import { TbEdit } from 'react-icons/tb'
export default function InfoUser() {
  const [modelInput, setModelInput] = useState(true)
  const changeMode = () => {
    setModelInput(!modelInput)
  }
  const imgUrl = 'https://scontent.fsgn8-1.fna.fbcdn.net/v/t39.30808-6/250994442_869319317289922_2551880571191379996_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeGFSfwq0EAqWxr2NYGofnwRNwS7zghzlYI3BLvOCHOVgqkq93Kazbd2Dl2mwf-rJB34UzILbJow3Oz4APMIW2gx&_nc_ohc=_gckPQlK5noQ7kNvgFtOPOd&_nc_ht=scontent.fsgn8-1.fna&oh=00_AYDiqVq3Ag9uFqTeoyp4rt5KZwg93qavii8y5PGChv4KPA&oe=66DC7DD0'
  return (
    <div className={styles.container}>
      <div className={`${styles.view} ${styles.view1}`}>
        <div className={styles.viewImg}>
          <img alt='' src={imgUrl} />
          <TbEdit className={styles.icon} />
        </div>
        <button onClick={changeMode}><TbEdit className={styles.icon} />Edit Profile</button>
      </div>
      <form>
        <div className={styles.viewInput}>
          <label>
            First Name
          </label>
          <input readOnly={modelInput} value={'Tin'}/>
        </div>
        <div className={styles.viewInput}>
          <label>
            Last Name
          </label>
          <input readOnly={modelInput} value={'Nguyễn'}/>
        </div>
        <div className={styles.viewInput}>
          <label>
            Phone Number
          </label>
          <input readOnly={modelInput} value={'+(84) 0358856753'}/>
        </div>
        <div className={styles.viewInput}>
          <label>
            Email Address
          </label>
          <input readOnly={modelInput} value={'tinn50474@gmail.com'}/>
        </div>
        <div className={styles.viewInput}>
          <label>
          Address
          </label>
          <input readOnly={modelInput} value={'38 Nguyễn Oanh, phường 7 Gò Vấp, Tp.HCM'}/>
        </div>
      </form>
    </div>
  )
}
