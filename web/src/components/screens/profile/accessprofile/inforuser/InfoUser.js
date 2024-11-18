import React, { useContext, useEffect, useState, useRef } from 'react'
import styles from './InfoUser.module.css'
import { TbEdit } from 'react-icons/tb'
import ImageForm from './uploadimage/ImageForm'
import { AppContext } from '../../../../../util/AppContext'
import { defaultAvt } from '../../../../public/components/image/DefaultIAvt'
import Dialog from '../../../../public/components/dialog/Dialog'
import { SHA256 } from 'crypto-js'
import { MdDone } from 'react-icons/md'
import AxiosInstance from '../../../../../util/AxiosInstance'
import EmailForm from './emailsubmit/EmailForm'
import { useTranslation } from 'react-i18next'
export default function InfoUser() {
  const [modelInput, setModelInput] = useState(true)
  const [imgFromVisible, setImgFormVisible] = useState(false)
  const [isVisbile, setIsVisbile] = useState(false)
  const [emailFormVisible, setEmailFormVisible] = useState(false)
  const [hashId, setHashId] = useState(null)
  const { dataUser, setDataUser } = useContext(AppContext)
  const [editNameStatus, setEditNameStatus] = useState(true)
  const [name, setName] = useState(null)
  const {t} = useTranslation()
  useEffect(() => {
    setName(dataUser?.name)
    const hash = SHA256(dataUser._id).toString()
    const numericHash = parseInt(hash.slice(0, 10), 16).toString();
    setHashId(numericHash)
  }, [dataUser?._id])

  useEffect(() => {
    setName(dataUser?.name)
  }, [editNameStatus, dataUser?.name])
  useEffect(() => {
    if (isVisbile) {
      const timer = setTimeout(() => {
        setIsVisbile(false);
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [isVisbile]);

  const viewInputRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (viewInputRef.current && !viewInputRef.current.contains(event.target)) {
        setEditNameStatus(true); // Ngừng chỉnh sửa khi click ra ngoài
        setName(null)
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const updateName = async () => {
    try {
      const data = new FormData()
      data.append('updateFields', JSON.stringify({ name: name }))
      const request = await AxiosInstance.post(`userApi/updateUser/${dataUser?._id}`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token'))}`
        },
      })
      if (request.result) {
        const user = JSON.parse(localStorage.getItem('user'))
        user.name = name
        localStorage.setItem('user', JSON.stringify(user))
        setDataUser(user)
        setIsVisbile(true)
        setEditNameStatus(true)
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className={styles.container}>
      <ImageForm isVisible={imgFromVisible} onClose={setImgFormVisible} onOpenSuccessDialog={setIsVisbile} />
      <Dialog isVisible={isVisbile} status={t('Profile.Article.Information.titleDialog')} />
      <EmailForm isVisible={emailFormVisible} onClose={setEmailFormVisible} onOpenSuccessDialog={setIsVisbile} />
      <div className={`${styles.view} ${styles.view1}`}>
        <div className={styles.viewImg} onClick={() => setImgFormVisible(true)}>
          <img alt='' src={dataUser.image?.id ? dataUser.image.url : defaultAvt} />
          <TbEdit className={styles.icon} />
        </div>
        <div className={styles.viewId}>
          ID: {hashId}
        </div>
      </div>
      <div className={styles.viewInformation}>
        <div className={styles.viewInput} ref={viewInputRef}>
          <label>
            {t('Profile.Article.Information.name')}
          </label>
          <input
            readOnly={editNameStatus}
            id='inputName'
            value={name}
            style={{ border: editNameStatus ? '1px solid black' : '1px solid #00ffff' }}
            onChange={(e) => setName(e.target.value)} />
          <div className={styles.viewEdit}>
            {
              editNameStatus ? (
                <button onClick={() => setEditNameStatus(false)}>
                  <label htmlFor='inputName'>
                    <TbEdit /> {t('Profile.Article.Information.edit')}
                  </label>
                </button>
              ) : (
                <button onClick={updateName} style={{ backgroundColor: 'cyan', width:80 }} className={styles.buttonSave}>
                  <label htmlFor='inputName'>
                    <MdDone /> {t('Profile.Article.Information.save')}
                  </label>
                </button>
              )
            }
          </div>
        </div>
        <div className={styles.viewInput}>
          <label>
          {t('Profile.Article.Information.gender')}
          </label>
          <input readOnly={modelInput} value={dataUser?.gender} />
          <div className={styles.viewEdit}>
            <button>
              <TbEdit /> {t('Profile.Article.Information.edit')}
            </button>
          </div>
        </div>
        <div className={styles.viewInput}>
          <label>
          {t('Profile.Article.Information.phoneNumber')}
          </label>
          <input readOnly={modelInput} value={'+(84) 0358856753'} />
          <div className={styles.viewEdit}>
            <button>
              <TbEdit /> {t('Profile.Article.Information.edit')}
            </button>
          </div>
        </div>
        <div className={styles.viewInput}>
          <label>
          {t('Profile.Article.Information.emailAddress')}
          </label>
          <input readOnly={modelInput} value={dataUser?.email} />
          <div className={styles.viewEdit}>
            <button onClick={() => setEmailFormVisible(true)}>
              <TbEdit /> {t('Profile.Article.Information.edit')}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
