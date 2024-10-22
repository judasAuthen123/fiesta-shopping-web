import React, { useContext, useEffect, useState } from 'react'
import styles from './CardForm.module.css'
import { SiVisa } from "react-icons/si";
import { IoShieldCheckmarkOutline } from "react-icons/io5";
import { useStripe, useElements, CardNumberElement, CardExpiryElement, CardCvcElement } from '@stripe/react-stripe-js';
import AxiosInstance from '../../../../util/AxiosInstance';
import { AppContext } from '../../../../util/AppContext';


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


export default function CardForm({ isVisible, onClose, onRefreshCardData }) {
  const stripe = useStripe()
  const elements = useElements()
  const { dataUser } = useContext(AppContext)
  const [cardType, setCardType] = useState('')
  const [name, setName] = useState('')
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
  
  const stripeSubmit = async (event) => {
    event.preventDefault()
    try {
      if (cardType === 'visa' || cardType === 'mastercard') {
        if (!stripe || !elements) {
          return
        }
        const cardNumberElement = elements.getElement(CardNumberElement)
        const { token, error } = await stripe.createToken(cardNumberElement, { name })
        if (error) {
          setErrorValid(true)
          console.log('error stripe: ' + error.message);
        } else {
          setLoading(true)
          const response = await AxiosInstance.post(`/payment/save-card?userId=${dataUser?._id}&token=${token.id}&isDefault=${true}`)
          if(response.statusCode === 200) {
            onRefreshCardData()
            onChangeModalOpen()
          }
        }
      } else {
        setErrorValid(true)
      }
    } catch (error) {
      console.log(error);

    }

  }


  const onChangeModalOpen = () => {
    onClose(false)
    setLoading(false)
  }
  if (isVisible === false) return null

  return (
    <div className={styles.container}>
      <form onSubmit={stripeSubmit}>
        <p style={{ fontSize: 20, color: '#4c4c4c' }}>
          Add Card
        </p>
        <div className={styles.viewProtect}>
          <IoShieldCheckmarkOutline className={styles.icon} size={45} />
          <div>
            <p>
              Your card details are protected.
            </p>
            <p>
              We partner with the third party to ensure that your card details are kept safe and secure. Fashion Fiesta will not have access to your card info.
            </p>
          </div>
        </div>
        <div className={styles.viewCardDetails}>
          <div style={{ color: '#828282' }}>
            New Card Details
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
              Card Number
            </label>
          </div>
          <div className={styles.viewInput}>
            <input id='name' className={styles.inputField} placeholder=' ' onChange={onChangeName} style={{ fontSize: 16, color: '#1b1b1bff' }} />
            <label htmlFor='name' className={styles.labelField}>
              Name on Card
            </label>
          </div>
          <div className={styles.viewForm1}>
            <div className={styles.viewInput}>
              <CardExpiryElement id='exDta' className={styles.inputField} options={elementOptions} />
              <label htmlFor='exDta' className={styles.labelField}>
                Expiry Date (MM/YY)
              </label>
            </div>
            <div className={styles.viewInput}>
              <CardCvcElement type='password' id='CCV' className={styles.inputField} options={elementOptions} />
              <label htmlFor='CCV' className={styles.labelField}>
                CCV
              </label>
            </div>
          </div>
          {
            errorValid && (
              <div style={{ fontSize: 13, color: '#ff0000c2' }}>
                <p>
                  !Something went wrong or card information doesn't valid
                </p>
                <p>
                  Note: Only support Visa and MasterCard
                </p>
              </div>
            )
          }
          <div className={styles.viewButton}>
            <button onClick={onChangeModalOpen}>Cancel</button>
            <button type='submit' disabled={!stripe}>Submit</button>
          </div>
        </div>
      </form>
    </div>
  )
}

