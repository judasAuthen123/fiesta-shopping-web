import React, { useContext, useEffect, useState } from 'react'
import styles from './CardForm.module.css'
import { SiVisa } from "react-icons/si";
import { IoClose } from "react-icons/io5";
import { IoShieldCheckmarkOutline } from "react-icons/io5";
import { useStripe, useElements, CardNumberElement, CardExpiryElement, CardCvcElement } from '@stripe/react-stripe-js';
import AxiosInstance from '../../../../util/AxiosInstance';
import { AppContext } from '../../../../util/AppContext';
import CircleLoading from './../loading/CircleLoading';
import { useTranslation } from 'react-i18next';

const elementOptions = {
  placeholder: ' ',
  style: {
    base: {
      fontSize: '16px',
      color: '#0d0d0dff'
    },
    invalid: {
      color: '#f11c1cff',
    },
  },
};


export default function CardForm({ isVisible, onClose, onRefreshCardData, onOpenSuccessDialog, isObligatory }) {
  const { t } = useTranslation()
  const stripe = useStripe()
  const elements = useElements()
  const { dataUser } = useContext(AppContext)
  const [cardType, setCardType] = useState('')
  const [name, setName] = useState('')
  const [isDefault, setIsDefault] = useState(isObligatory ? true : false)
  const [errorValid, setErrorValid] = useState(false)
  const [loading, setLoading] = useState(false)
  const onChangeName = (e) => {
    setName(e.target.value)
  }
  const onChangeNumber = (event) => {

    if (event) {
      setErrorValid(false)
      if (event.brand === 'visa') {
        setCardType(event.brand)
      } else if (event.brand === 'mastercard') {
        setCardType(event.brand)
      } else {
        setCardType('')
      }
    }
  }
  const errCardSubmit = {
    1: t('Components.card.error.string1'),
    2: t('Components.card.error.string2')
  }
  const stripeSubmit = async (event) => {
    event.preventDefault()
    try {
      if (cardType === 'visa' || cardType === 'mastercard') {
        if (!stripe || !elements) {
          return
        }
        setErrorValid(false)
        setLoading(true)
        const cardNumberElement = elements.getElement(CardNumberElement)
        const { token, error } = await stripe.createToken(cardNumberElement, { name })
        if (error) {
          setLoading(false)
          setErrorValid(true)
          console.log('error stripe: ' + error.message);
        } else {

          const response = await AxiosInstance.post(`/payment/save-card?userId=${dataUser?._id}&token=${token.id}&isDefault=${isDefault}`)
          if (response.statusCode === 200) {
            onRefreshCardData(response.data)
            onChangeModalOpen()
            onOpenSuccessDialog(true)
          }
        }
      } else {
        setLoading(false)
        setErrorValid(true)
      }
    } catch (error) {
      if (error) {
        setLoading(false)
        setErrorValid(true)
      }
    }

  }

  const onChangeModalOpen = () => {
    onClose(false)
    setErrorValid(false)
    setLoading(false)
  }
  if (isVisible === false) return null

  return (
    <div className={styles.container}>
      <form onSubmit={stripeSubmit}>
        <p style={{ fontSize: 20, color: '#4c4c4c' }}>
          {t('Components.card.title')}
        </p>
        <div className={styles.viewProtect}>
          <IoShieldCheckmarkOutline className={styles.icon} size={45} />
          <div>
            <p>
              {t('Components.card.policyTitle.string1')}
            </p>
            <p>
              {t('Components.card.policyTitle.string2')}
            </p>
          </div>
        </div>
        <div className={styles.viewCardDetails}>
          <div style={{ color: '#828282' }}>
            {t('Components.card.titleAddNew')}
          </div>
          <div style={{ flexDirection: 'row', display: 'flex', alignItems: 'center', columnGap: 15 }}>
            <SiVisa size={35} className={cardType === 'visa' ? styles.visaIconActive : styles.visaIconInActive} />
            <div className={styles.masterCardView}>
              <div className={cardType === 'mastercard' ? styles.masterCard1Active : styles.masterCard1InActive} />
              <div className={cardType === 'mastercard' ? styles.masterCard2Active : styles.masterCard2InActive} />
            </div>
          </div>
        </div>
        <div className={styles.boxInput}>
          <div className={styles.viewInput}>
            <CardNumberElement id='numOnCard' className={styles.inputField} options={elementOptions} onChange={onChangeNumber} />
            <label htmlFor='numOnCard' className={styles.labelField}>
              {t('Components.card.cardNumber')}
            </label>
          </div>
          <div className={styles.viewInput}>
            <input id='name' className={styles.inputField} placeholder=' ' onChange={onChangeName} style={{ fontSize: 16, color: '#1b1b1bff' }} />
            <label htmlFor='name' className={styles.labelField}>
              {t('Components.card.cardName')}
            </label>
          </div>
          <div className={styles.viewForm1}>
            <div className={styles.viewInput}>
              <CardExpiryElement id='exDta' className={styles.inputField} options={elementOptions} />
              <label htmlFor='exDta' className={styles.labelField}>
                {t('Components.card.expiryDate')}
              </label>
            </div>
            <div className={styles.viewInput}>
              <CardCvcElement type='password' id='CCV' className={styles.inputField} options={elementOptions} />
              <label htmlFor='CCV' className={styles.labelField}>
                {t('Components.card.cvc')}
              </label>
            </div>
          </div>
          {
            !isObligatory &&
            <div className={styles.viewDefault}>
              <input type='checkbox' onChange={(e) => setIsDefault(e.target.checked)} /> <label>{t('Components.card.useAsDefault')}</label>
            </div>
          }

          {
            errorValid && (
              <div style={{ fontSize: 13, color: '#ff0000c2' }}>
                <p style={{ display: 'flex', alignItems: 'center', columnGap: 4 }}>
                  <IoClose size={16} /> {errCardSubmit[1]}
                </p>
                <p>
                  {errCardSubmit[2]}
                </p>
              </div>
            )
          }
          <div className={styles.viewButton}>
            <button onClick={onChangeModalOpen}>{t('Components.card.button.buttonCancel')}</button>
            <button type='submit' disabled={!stripe}>{loading ? <CircleLoading boderColor={'white'} /> : t('Components.card.button.buttonSubmit')}</button>
          </div>
        </div>
      </form>
    </div>
  )
}

