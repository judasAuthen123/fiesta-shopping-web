import React, { useContext } from 'react'
import styles from './Exit.module.css'
import { AppContext } from '../../../../../util/AppContext'
import { useTranslation } from 'react-i18next'
export default function Exit() {
    const  {t} = useTranslation()
    const {setToken, setDataUser} = useContext(AppContext)
    const signOut = () => {
        localStorage.removeItem('user')
        localStorage.removeItem('token')
        setToken(null)
        setDataUser(null)
    }
    return (
        <div className={styles.container}>
            <p>
                {t('Profile.Article.SignOut.confirm')}
            </p>
            <button 
            onClick={signOut}
            className={styles.signOutButton}>
                {t('Profile.Article.SignOut.title')}
            </button>
        </div>
    )
}
