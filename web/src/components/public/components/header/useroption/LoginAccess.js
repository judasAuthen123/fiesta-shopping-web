import React, { useContext } from 'react'
import { AppContext } from './../../../../../util/AppContext';
import { SlArrowDown } from "react-icons/sl";
import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";
import styles from './LoginAccess.module.css'
import { HiOutlineUser } from "react-icons/hi2";
import { IoSettingsOutline } from "react-icons/io5";
import { RxExit } from "react-icons/rx";
import { useNavigate } from 'react-router-dom';
import defaultAvt from '../../../../assets/images/default-avatar-icon-of-social-media-user-vector.jpg';
import { useTranslation } from 'react-i18next';
import FlagDrop from '../flagdrop/FlagDrop';
import LoginDrop from '../logindrop/LoginDrop';
import CartDrop from '../cartdrop/CartDrop';
import { Link } from 'react-router-dom';
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

                        <div onClick={() => navigate('/profile')} className={styles.userView}> <img alt='' src={dataUser.image?.id ? dataUser.image.url : defaultAvt} /> 
                        {/* <div className={styles.userDrop}> 
                            <div className={styles.viewAccess}> 
                                <Link><HiOutlineUser />{t('Profile.title')}</Link>
                                <Link><IoSettingsOutline /> {t('Profile.Nav.settings')}</Link>
                                <Link><RxExit /> {t('Profile.Nav.signOut')}</Link>
                            </div>
                        </div> */}
                        </div>
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
