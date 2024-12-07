import React, { useContext } from 'react'
import styles from './Exit.module.css'
import { AppContext } from '../../../../../util/AppContext'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import { cartSlice } from '../../../../public/components/header/cartdrop/cartSlice'
export default function Exit() {
    const  {t} = useTranslation()
    const dispatch = useDispatch()
    const {setToken, setDataUser} = useContext(AppContext)
    const signOut = () => {
        localStorage.removeItem('user')
        localStorage.removeItem('token')
        setToken(null)
        setDataUser(null)
        dispatch(cartSlice.actions.onResetDataCart())
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
