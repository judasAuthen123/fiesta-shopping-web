import React, { useContext, useEffect, useState } from 'react'
import CardForm from '../../../public/components/card/CardForm'
import styles from './Card.module.css'
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import AxiosInstance from '../../../../util/AxiosInstance';
import CardItem from './CardItem';
import ConfirmDialog from '../../../public/components/dialog/ConfirmDialog';
import { useDispatch, useSelector } from 'react-redux';
import { defaultCardId } from '../../../redux/selector';
import cardSlice from './cardSlice';
import { AppContext } from '../../../../util/AppContext';
const stripePromise = loadStripe('pk_test_51PV6nVJbQzxhdXgcHCR0K31WwdRTSbmDj0maTMY17gI2poV6dhE4nDpLkX5uaBnx3HIHAR5pFqizb8jTtYXCOBIe002Y6VC1aA')
export default function Card() {
  const [cardFromVisible, setCardFromVisible] = useState(false)
  const [confirmModalVisible, setConfirmModalVisible] = useState(false)
  const [cardList, setCardList] = useState([])
  const [defaultCard, setDefaultCard] = useState('')
  const [refreshDefaultCard, setRefreshDefaultCard] = useState(false)
  const [idCardToChange, setIdCardToChange] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const {dataUser} = useContext(AppContext)
  const dispatch = useDispatch()
  const onCallbackCardFormClose = (state) => {
    setCardFromVisible(state)
  }


  const onChangeConfirmModalOpen = () => {
    setConfirmModalVisible(prev => !prev)
  }


  const onCallbackConfirmModalClose = (state, idCard) => {
    setConfirmModalVisible(state)
    setIdCardToChange(idCard)
  }



  const onRefeshDefaultCard = (state) => {
    setRefreshDefaultCard(state)
  }

  useEffect(() => {
    const getCardList = async () => {
      const response = await AxiosInstance.get(`/payment/get-card-list/${dataUser?._id}`)
      if (response.statusCode === 200) {
        setCardList(response.data)
        
      }
    }
    getCardList()
  }, [])
  useEffect(() => {
    const getDefaultCard = async () => {
      const response = await AxiosInstance.get(`/payment/get-default-card/${dataUser?._id}`)
      if (response.data) {
        setDefaultCard(response.data.defaultCard ? response.data.defaultCard : null)
        
      }
    }
    getDefaultCard()
  }, [])

  useEffect(() => {
    if (refreshDefaultCard && idCardToChange) {
      const chooseDefaultCare = async () => {
        setIsLoading(true)
        const request = await AxiosInstance.post(`/payment/choose-default-card?userId=${dataUser?._id}&paymentMethodId=` + idCardToChange)
        if (request.result && request.statusCode === 200) {
          setDefaultCard(request.cardId)
          dispatch(cardSlice.actions.onChangeDefaultId(request.cardId))
          setIdCardToChange('')
          setRefreshDefaultCard(false)
          setConfirmModalVisible(false)
          setIsLoading(false)
        }
      }
      chooseDefaultCare()
    }
  }, [refreshDefaultCard, idCardToChange])

  return (
    <Elements stripe={stripePromise}>
      <div>
        <CardForm isVisible={cardFromVisible} onClose={onCallbackCardFormClose} />
        <ConfirmDialog
          isVisible={confirmModalVisible}
          onCancel={onCallbackConfirmModalClose}
          onConfirm={onRefeshDefaultCard}
          loading={isLoading}
        />
        <p style={{ fontSize: 12 }}>Your default card will be used for payment!</p>
        <div className={styles.viewListCard}>
          {
            cardList.length > 0 ?
              cardList.map(card =>
                <CardItem
                  data={card}
                  key={card.id}
                  isDefault={card.id === defaultCard}
                  onOpen={onChangeConfirmModalOpen}
                  onCardIdHandler={setIdCardToChange} />
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

