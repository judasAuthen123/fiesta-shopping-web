import React, { useContext } from 'react'
import { AppContext } from './../../../../../util/AppContext';
import { SlArrowDown } from "react-icons/sl";
import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";
import styles from './LoginAccess.module.css'
import { useNavigate } from 'react-router-dom';
import { defaultAvt } from '../../image/DefaultIAvt';
import { useTranslation } from 'react-i18next';
import FlagDrop from '../flagdrop/FlagDrop';
import LoginDrop from '../logindrop/LoginDrop';
import CartDrop from '../cartdrop/CartDrop';
export default function LoginAccess() {
    const { dataUser } = useContext(AppContext)
    const navigate = useNavigate()
    const { t } = useTranslation()
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
                        <FlagDrop />

                        <CartDrop />

                        <div onClick={() => navigate('/profile')} className={styles.userView}> <img alt='' src={dataUser.image?.id ? dataUser.image.url : defaultAvt} />  < SlArrowDown className={styles.icon} /> </div>
                    </div>
                </div> :
                <div className={styles.boxTrue}>
                    
                    <FlagDrop />
                    <div style={{ width: 0.5, height: 30, backgroundColor: '#85858556', marginRight: 20, marginLeft: 20 }} />
                    <LoginDrop />
                </div>
            }
        </div>
    )
}
