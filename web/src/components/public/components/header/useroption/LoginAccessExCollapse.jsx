import React, { useContext } from 'react'
import { AppContext } from '../../../../../util/AppContext'
import styles from './LoginAccessExCollapse.module.css'
import { defaultAvt } from '../../image/DefaultIAvt'
import { Link } from 'react-router-dom'
import { SlLike } from "react-icons/sl";
export default function LoginAccessExCollapse() {
    const { dataUser } = useContext(AppContext)
    return (

        <div className={styles.container}>
            {
                dataUser ?
                    <div className={styles.boxUser}>
                        <img alt='' src={dataUser?.image?.id ? dataUser?.image?.url : defaultAvt} />
                        <div className={styles.info}>
                            <p>{dataUser?.name}</p>
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
