import React, { useContext, useEffect, useState } from 'react'
import CardForm from '../../../public/components/card/CardForm'
import styles from './Card.module.css'
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import AxiosInstance from '../../../../util/AxiosInstance';
import CardItem from './CardItem';
import { AppContext } from '../../../../util/AppContext';
import Dialog from './../../../public/components/dialog/Dialog';
import { useDispatch, useSelector } from 'react-redux';
import cardSlice from './cardSlice';
import CircleLoading from '../../../public/components/loading/CircleLoading';
import { defaultCardId } from '../../../redux/selector';
import { useTranslation } from 'react-i18next';
const stripePromise = loadStripe(`${process.env.REACT_APP_STRIPE_KEY}`)
export default function Card({ isShowNote }) {
  const {t} = useTranslation()
  const [cardFromVisible, setCardFromVisible] = useState(false)
  const [cardList, setCardList] = useState([])
  const [defaultCard, setDefaultCard] = useState('')
  const defaultIdCardRedux = useSelector(defaultCardId)
  const [isVisible, setIsVisible] = useState(false)
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const [loadingDataCard, setLoadingDataCard] = useState(false)
  const { dataUser } = useContext(AppContext)
  const onCallbackCardFormClose = (state) => {
    setCardFromVisible(state)
  }


  const getDefaultCard = async () => {
    const response = await AxiosInstance.get(`/payment/get-default-card/${dataUser?._id}`)
    if (response.data) {
      setDefaultCard(response.data.defaultCard)
      dispatch(cardSlice.actions.onChangeDefaultId(response.data.defaultCard))
    }
  }

  const addNewCardData = (data) => {
    getDefaultCard()
    setCardList(prev => [...prev, data])
  }
  const removeCardItem = (id) => {
    setCardList(() => {
      return cardList.filter(item => item.id !== id)
    })
  }
  const getCardList = async () => {
    setLoadingDataCard(true)
    const response = await AxiosInstance.get(`/payment/get-card-list/${dataUser?._id}`)
    if (response.statusCode === 200) {
      setCardList(response.data)
      setLoadingDataCard(false)
    }
  }

  useEffect(() => {
    getDefaultCard()
    getCardList()
  }, [dataUser?._id])

  useEffect(() => {

    if (isVisible) {
      const timer = setTimeout(() => {
        setIsVisible(false)
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [isVisible])

  useEffect(() => {
    if (defaultIdCardRedux !== defaultCard) {
      setDefaultCard(defaultIdCardRedux)
    }
  }, [defaultIdCardRedux, defaultCard])


  const chooseDefaultCard = async (idCardToChange) => {
    setLoading(true)
    try {
      const request = await AxiosInstance.post(`/payment/choose-default-card?userId=${dataUser?._id}&paymentMethodId=` + idCardToChange)
      if (request.result && request.statusCode === 200) {
        setDefaultCard(request.cardId)
        setLoading(false)
        dispatch(cardSlice.actions.onChangeDefaultId(request.cardId))
      }
    } catch (error) {
      console.log(error)
    }

  }


  return (
    <Elements stripe={stripePromise}>
      <Dialog isVisible={isVisible} status={t('Profile.Article.Cards.dialogUpdate')} />
      <div>


        <CardForm
          isVisible={cardFromVisible}
          onClose={onCallbackCardFormClose}
          onRefreshCardData={addNewCardData}
          onOpenSuccessDialog={setIsVisible} 
          isObligatory={cardList?.length === 0}/>

        {
          isShowNote && <p style={{ fontSize: 13 }}>{t('Components.card.noteUsing')}</p>
        }

        {
          loadingDataCard ? <div style={{ display: 'flex', alignItems: 'center', columnGap: 8 }}><CircleLoading width={15} height={15} boderColor={'black'} /> {t('Loading.title')} </div> :
            <div className={styles.viewListCard}>
              {
                cardList.length > 0 ?
                  cardList.map(card =>
                    <CardItem
                      onChangeDefaultCard={chooseDefaultCard}
                      loading={loading}
                      data={card}
                      key={card.id}
                      onOpenSuccessDialog={setIsVisible}
                      onRemoveCard={removeCardItem}
                      isDefault={card.id === defaultCard} />
                  ) : <div style={{ fontSize: 12 }}>
                    {t('Components.card.listEmpty')}
                  </div>
              }
            </div>
        }

        <div
          onClick={() => setCardFromVisible(prev => !prev)}
          className={styles.viewOpenFormCard}>
          + {t('Profile.Article.Cards.add')}
        </div>
      </div>
    </Elements>
  )
}

