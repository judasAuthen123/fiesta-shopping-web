import React, { } from 'react'
import styles from './FlagDrop.module.css'
import VietnamFlag from '../../../../assets/images/vn-circle-01.png'
import UsFlag from '../../../../assets/images/us-circle-01.png'
import { useTranslation } from 'react-i18next'
import i18next from 'i18next'
export default function FlagDrop() {
    const { t } = useTranslation()
    const currentLng = i18next.language
    const dataLanguage = [
        {
            "name": t('Language.en') ,
            "value": "en"
        },
        {
            "name": t('Language.vi'),
            "value": "vi"
        }
    ]
    const changeLanguage = (data) => {
        const {value} = data
        i18next.changeLanguage(value)
        localStorage.setItem('language', JSON.stringify(data))
    }
    return (
        <div className={styles.container}>
            <img alt='' src={currentLng === 'en' ? UsFlag : VietnamFlag} />
            <div className={styles.viewDrop}>
                <div className={styles.dropdown_menu}>
                    {
                        dataLanguage.map(item =>
                            <div
                            onClick={() => changeLanguage(item)} 
                            key={item.value}>{item.name}</div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}
