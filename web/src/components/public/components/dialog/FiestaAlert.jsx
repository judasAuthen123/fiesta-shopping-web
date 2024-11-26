import React from 'react'
import styles from './FiestaAlert.module.css'
import { TbAlertTriangleFilled } from "react-icons/tb";
import { useTranslation } from 'react-i18next';
export default function FiestaAlert({ label, isVisible, onClose }) {
    const {t} = useTranslation()
    if (!isVisible) return null
    return (
        <div className={styles.container}>
            <div className={styles.body}>
                <TbAlertTriangleFilled className={styles.iconAlert} color='white' size={27}/>
                <p className={styles.title}>{t('Components.alert.alert')}</p>
                <p className={styles.content}>{label}</p>
                <button onClick={() => onClose(false)}>OK</button>
            </div>
        </div>
    )
}
