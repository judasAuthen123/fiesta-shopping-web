import React from 'react'
import Card from '../../../checkout/credit_debit/Card'
import { useTranslation } from 'react-i18next'

export default function SavedCards() {
  const {t} = useTranslation()
  return (
    <div>
      <div>
        <p style={{fontWeight:500}}>{t('Profile.Article.Cards.title')}</p>
      </div>
      <Card />
    </div>
  )
}
