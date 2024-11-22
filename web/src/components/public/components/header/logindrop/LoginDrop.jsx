import React from 'react'
import styles from './LoginDrop.module.css'
import { CiUser } from "react-icons/ci";
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
export default function LoginDrop() {
    const { t } = useTranslation()
    const navigate = useNavigate()
    const arrAccess = [
        {
            label: t('Header.button.buttonLogin'),
            path: '/login'
        },
        {
            label: t('Header.button.buttonSignup'),
            path: '/register'
        }
    ]
    return (
        <div className={styles.container}>
            <div className={styles.image}> <CiUser size={20} /> </div>
            <div className={styles.viewDrop}>
                <div className={styles.dropdown_menu}>
                    {
                        arrAccess.map(item =>
                            <div
                                onClick={() => navigate(item.path)}
                                key={item.path}>{item.label}</div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}
