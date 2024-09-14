import React, { useContext } from 'react'
import styles from './Exit.module.css'
import { AppContext } from '../../../../../util/AppContext'
export default function Exit() {
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
                Are you sure you want to exit?
            </p>
            <button 
            onClick={signOut}
            className={styles.signOutButton}>
                Sign out
            </button>
        </div>
    )
}
