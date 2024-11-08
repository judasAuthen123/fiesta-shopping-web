import React, { useContext } from 'react'
import { AppContext } from './../../../../../util/AppContext';
import { IoNotifications } from "react-icons/io5";
import { SlArrowDown } from "react-icons/sl";
import { FaBagShopping } from "react-icons/fa6";
import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";
import styles from './LoginAccess.module.css'
import { useNavigate } from 'react-router-dom';
import { defaultAvt } from '../../image/DefaultIAvt';
import { useTranslation } from 'react-i18next';
export default function LoginAccess() {
    const { dataUser } = useContext(AppContext)
    const { t } = useTranslation()
    const navigate = useNavigate()
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
                    <div className={styles.title}>
                        <p>
                            Seeking premium fashion?
                        </p>
                        <p>
                            Shop now <MdOutlineKeyboardDoubleArrowRight />
                        </p>
                    </div>
                    <div style={{ width: 0.5, height: 30, backgroundColor: '#85858556', marginRight: 15, marginLeft: 15 }} />
                    <div className={styles.boxFalse}>
                        <button onClick={() => navigate('/register')}>
                            {t('Header.buttonSignup')}
                        </button>
                        <button onClick={() => navigate('/login')}>
                        {t('Header.buttonLogin')}
                        </button>
                    </div>
                </div>
            }
        </div>
    )
}
