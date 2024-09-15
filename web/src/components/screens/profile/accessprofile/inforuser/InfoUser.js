import React, { useContext, useEffect, useState } from 'react'
import styles from './InfoUser.module.css'
import { TbEdit } from 'react-icons/tb'
import ImageForm from './uploadimage/ImageForm'
import { AppContext } from '../../../../../util/AppContext'
import { defaultAvt } from '../../../../public/components/image/DefaultIAvt'
import Dialog from '../../../../public/components/dialog/Dialog'
export default function InfoUser() {
  const [modelInput, setModelInput] = useState(true)
  const [imgFromVisible, setImgFormVisible] = useState(false)
  const [isVisbile, setIsVisbile] = useState(false)
  const {dataUser} = useContext(AppContext)

  const changeMode = () => {
    setModelInput(!modelInput)
  }
  useEffect(() => {
    if (isVisbile) {
        const timer = setTimeout(() => {
            setIsVisbile(false);
        }, 2500);
        return () => clearTimeout(timer);
    }
}, [isVisbile]);
  return (
    <div className={styles.container}>
      <ImageForm isVisible={imgFromVisible} onClose={setImgFormVisible} onOpenSuccessDialog={setIsVisbile}/>
      <Dialog isVisible={isVisbile} status={'Update avatar successful!'} />
      <div className={`${styles.view} ${styles.view1}`}>
        <div className={styles.viewImg} onClick={() => setImgFormVisible(true)}>
          <img alt='' src={dataUser.image?.id ? dataUser.image.url : defaultAvt} />
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
