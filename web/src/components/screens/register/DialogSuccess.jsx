import React from 'react'
import styles from './DialogSuccess.module.css'
import { FaCircleCheck } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next';
export default function DialogSuccess({ isVisible, onClose }) {
    const {t} = useTranslation()
    const navigate = useNavigate()
    const onCloseAndMovePage = () => {
        onClose(false)
        navigate('/login')
    }
    if (!isVisible) return null
    return (
        <div className={styles.container}>
            <div className={styles.body}>
                <p>{t('Login_Register.dialog.title')}</p>
                <p>{t('Login_Register.dialog.note')}</p>
                <button className={styles.btnMove} onClick={onCloseAndMovePage}>{t('Login_Register.dialog.back')}</button>
                <FaCircleCheck className={styles.circleCheck}/>
            </div>
        </div>
    )
}
