import React from 'react'
import { useTranslation } from 'react-i18next'

export default function Notifications() {
  const { t } = useTranslation()
  return (
    <div>
      <p style={{ fontSize: 20, fontWeight: 500, marginBottom: 10 }}>{t('Profile.Article.Notifications.title')}</p>
      <p style={{ fontSize: 15 }}>{t('Profile.Article.Notifications.listEmpty')}</p>
    </div>
  )
}
