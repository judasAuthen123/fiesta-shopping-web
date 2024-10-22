import React, { useContext, useEffect, useState } from 'react'
import CardForm from '../../../public/components/card/CardForm'
import styles from './Card.module.css'
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import AxiosInstance from '../../../../util/AxiosInstance';
import CardItem from './CardItem';
import { AppContext } from '../../../../util/AppContext';
const stripePromise = loadStripe(`${process.env.REACT_APP_STRIPE_KEY}`)
export default function Card() {
  const [cardFromVisible, setCardFromVisible] = useState(false)
  const [cardList, setCardList] = useState([])
  const [defaultCard, setDefaultCard] = useState('')
  const { dataUser } = useContext(AppContext)

  const onCallbackCardFormClose = (state) => {
    setCardFromVisible(state)
  }


  const getDefaultCard = async () => {
    const response = await AxiosInstance.get(`/payment/get-default-card/${dataUser?._id}`)
    if (response.data) {
      setDefaultCard(response.data.defaultCard ? response.data.defaultCard : null)
    }
  }

  const getCardList = async () => {
    const response = await AxiosInstance.get(`/payment/get-card-list/${dataUser?._id}`)
    if (response.statusCode === 200) {
      setCardList(response.data)
    }
  }

  useEffect(() => {
    getCardList()
    getDefaultCard()
  }, [dataUser?._id])


  // const chooseDefaultCard = async () => {
  //   setIsLoading(true)
  //   if (idCardToChange) {
  //     const request = await AxiosInstance.post(`/payment/choose-default-card?userId=${dataUser?._id}&paymentMethodId=` + idCardToChange)
  //     if (request.result && request.statusCode === 200) {
  //       setDefaultCard(request.cardId)
  //       dispatch(cardSlice.actions.onChangeDefaultId(request.cardId))
  //       setIdCardToChange('')
  //       setIsLoading(false)
  //     }
  //   }
  // }


  return (
    <Elements stripe={stripePromise}>
      <div>


        <CardForm 
        isVisible={cardFromVisible} 
        onClose={onCallbackCardFormClose} 
        onRefreshCardData={getCardList} />


        <p style={{ fontSize: 12 }}>Your default card will be used for payment!</p>
        <div className={styles.viewListCard}>
          {
            cardList.length > 0 ?
              cardList.map(card =>
                <CardItem
                  data={card}
                  key={card.id}
                  isDefault={card.id === defaultCard}/>
              ) : <div style={{ fontSize: 12 }}>
                Your card list is empty
              </div>
          }
        </div>
        <div
          onClick={() => setCardFromVisible(prev => !prev)}
          className={styles.viewOpenFormCard}>
          + add new card
        </div>
      </div>
    </Elements>
  )
}

