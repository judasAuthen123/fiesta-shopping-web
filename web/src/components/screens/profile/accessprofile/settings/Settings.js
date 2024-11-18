import React from 'react'
import Options from './options/Options'
import styles from './Settings.module.css'
import { useTranslation } from 'react-i18next'
export default function Settings() {
  const { t } = useTranslation()
  const dataLanguage = [
    {
      "name": "English",
      "value": "en"
    },
    {
      "name": "Vietnamese",
      "value": "vi"
    }
  ]
  const dataTheme = [
    {
      "name": "Light",
      "value": "Light"
    },
    {
      "name": "Dark",
      "value": "Dark"
    },
    {
      "name": "Device",
      "value": "Device"
    },
  ]
  return (
    <div className={styles.container}>
      <div>
        <Options
          label={t('Profile.Article.Settings.appearance.title')}
          contentHolder={t('Profile.Article.Settings.appearance.holder')}
          typeOption={'selector'}
          optionsData={dataTheme}
          typeData={'mode'}
        />
      </div>
      <div>
        <Options
          label={t('Profile.Article.Settings.language.title')}
          contentHolder={t('Profile.Article.Settings.language.holder')}
          typeOption={'selector'}
          optionsData={dataLanguage}
          typeData={'language'} />
      </div>
      <div>
        <Options
          label={t('Profile.Article.Settings.twoFactor.title')}
          contentHolder={t('Profile.Article.Settings.twoFactor.holder')}
          typeOption={'toggle'}
          typeData={'secureAccount'} />
      </div>
      <div>
        <Options
          label={t('Profile.Article.Settings.pushNotifications.title')}
          contentHolder={t('Profile.Article.Settings.pushNotifications.holder')}
          typeOption={'toggle'}
          typeData={'pushNotifications'} />
      </div>
      <div>
        <Options
          label={t('Profile.Article.Settings.desktopNotifications.title')}
          contentHolder={t('Profile.Article.Settings.desktopNotifications.holder')}
          typeOption={'toggle'}
          typeData={'desktopNotifications'} />
      </div>
      <div>
        <Options
          label={t('Profile.Article.Settings.emailNotifications.title')}
          contentHolder={t('Profile.Article.Settings.emailNotifications.holder')}
          typeOption={'toggle'}
          typeData={'emailNotifications'} />
      </div>
    </div>
  )
}
