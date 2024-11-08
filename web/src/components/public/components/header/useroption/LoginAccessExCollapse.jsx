import React, { useContext } from 'react'
import { AppContext } from '../../../../../util/AppContext'
import styles from './LoginAccessExCollapse.module.css'
import { defaultAvt } from '../../image/DefaultIAvt'
import { Link } from 'react-router-dom'
import { SlLike } from "react-icons/sl";
import { FaRegUser } from "react-icons/fa6";
import { PiMoon } from "react-icons/pi";
import { TbCube } from "react-icons/tb";
import { GiWorld } from "react-icons/gi";
import { useTranslation } from 'react-i18next'
export default function LoginAccessExCollapse({ onCloseDrop }) {
    const { dataUser } = useContext(AppContext)
    const { t } = useTranslation()
    return (

        <div className={styles.container}>
            {
                dataUser ?
                    <div className={styles.boxUser}>
                        <div className={styles.userDetail}>
                            <img alt='' src={dataUser?.image?.id ? dataUser?.image?.url : defaultAvt} />
                            <div className={styles.info}>
                                <p>{dataUser?.name}</p>
                                <p>ID: 359484201457</p>
                            </div>
                        </div>
                        <div className={styles.boxOptions}>
                            <Link to='/profile?type=1' onClick={onCloseDrop}><FaRegUser /> {t('Header.profile')}</Link>
                            <Link to='/profile?type=6' onClick={onCloseDrop}><GiWorld /> {t('Header.language')}</Link>
                            <Link to='/profile?type=2' onClick={onCloseDrop}><TbCube /> {t('Header.orders')}</Link>
                            <Link to='/profile?type=6' onClick={onCloseDrop}><PiMoon /> {t('Header.appearance')}</Link>
                        </div>
                    </div> :
                    <div className={styles.boxLogin}>
                        <p>
                            Log in for the best experience
                            <SlLike />
                        </p>
                        <div className={styles.boxAccess}>
                            <Link to='/login' className={styles.linkLogin}>Sign in</Link>
                            <Link to='/register' className={styles.linkRegister}>You dont have an account? Click</Link>
                        </div>
                    </div>
            }


        </div>
    )
}
