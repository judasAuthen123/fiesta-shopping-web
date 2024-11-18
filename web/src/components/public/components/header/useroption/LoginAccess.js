import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from './../../../../../util/AppContext';
import { IoNotifications } from "react-icons/io5";
import { SlArrowDown } from "react-icons/sl";
import { FaBagShopping } from "react-icons/fa6";
import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";
import styles from './LoginAccess.module.css'
import VietnamFlag from '../../../../assets/images/vn-circle-01.png'
import UsFlag from '../../../../assets/images/us-circle-01.png'
import { useNavigate } from 'react-router-dom';
import { defaultAvt } from '../../image/DefaultIAvt';
import { useTranslation } from 'react-i18next';
import i18next from 'i18next';
export default function LoginAccess() {
    const { dataUser } = useContext(AppContext)
    const { t } = useTranslation()
    const navigate = useNavigate()
    const [currentLanguage, setCurrentLanguage] = useState(null)

    useEffect(() => {
        const curLng = JSON.parse(localStorage.getItem('language'))
        setCurrentLanguage(() => {
            return curLng ? curLng?.value : null
        })
    }, [])

    const dataLanguage = [
        {
            "name": "English",
            "value": "en"
        },
        {
            "name": "Vietnamese",
            "value": "vi"
        }
    ]
    const changeLngToEn = () => {
        i18next.changeLanguage('en')
        setCurrentLanguage('en')
        localStorage.setItem('language', JSON.stringify(dataLanguage[0]))
    }
    const changeLngToVi = () => {
        i18next.changeLanguage('vi')
        setCurrentLanguage('vn')
        localStorage.setItem('language', JSON.stringify(dataLanguage[1]))
    }
    return (
        <div>
            {dataUser ?
                <div className={styles.boxTrue}>
                    <div className={styles.title}>
                        <p>
                            {t('Header.question')}
                        </p>
                        <p>
                            {t('Header.shopnow')} <MdOutlineKeyboardDoubleArrowRight />
                        </p>
                    </div>
                    <div style={{ width: 0.5, height: 30, backgroundColor: '#85858556', marginRight: 15, marginLeft: 15 }} />
                    <div className={styles.boxOption}>
                        <div className={styles.iconView}><IoNotifications className={styles.icon} /> </div>

                        <div onClick={() => navigate('/cart')} className={styles.iconView}><FaBagShopping className={styles.icon} /> </div>

                        <div onClick={() => navigate('/profile')} className={styles.userView}> <img alt='' src={dataUser.image?.id ? dataUser.image.url : defaultAvt} />  < SlArrowDown className={styles.icon} /> </div>
                    </div>
                </div> :
                <div className={styles.boxTrue}>
                    {
                        !currentLanguage ||  currentLanguage === 'en' ?
                            <img src={UsFlag}
                                onClick={changeLngToVi}
                                style={{ width: 35, height: 35, borderRadius: '50%', objectFit: 'cover', cursor: 'pointer', border: '1px solid #f5f5f5' }} />
                            : <img src={VietnamFlag}
                                onClick={changeLngToEn}
                                style={{ width: 35, height: 35, borderRadius: '50%', objectFit: 'cover', cursor: 'pointer', border: '1px solid #f5f5f5' }} />
                    }

                    <div style={{ width: 0.5, height: 30, backgroundColor: '#85858556', marginRight: 15, marginLeft: 15 }} />
                    <div className={styles.boxFalse}>
                        <button onClick={() => navigate('/login')}>
                            {t('Header.button.buttonLogin')} / {t('Header.button.buttonSignup')}
                        </button>
                    </div>
                </div>
            }
        </div>
    )
}
