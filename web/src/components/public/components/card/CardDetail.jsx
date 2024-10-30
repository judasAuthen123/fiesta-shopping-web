import React, { useContext, useEffect, useState } from 'react'
import styles from './CardDetail.module.css'
import { IoClose } from "react-icons/io5";
import { SiTrueup, SiVisa } from 'react-icons/si';
import ToggleDefault from './ToggleDefault';
import { BsCheckCircleFill } from "react-icons/bs";
import CircleLoading from '../loading/CircleLoading';
import AxiosInstance from '../../../../util/AxiosInstance';
import { AppContext } from '../../../../util/AppContext';
import { useDispatch } from 'react-redux';
import cardSlice from '../../../screens/checkout/credit_debit/cardSlice';
const numOnCardDisplay = (num) => {
  return `•••• ${num}`
}
export default function CardDetail({ isVisble, onClose, data, isDefault, onChangeDefaultCard, loading, onOpenSuccessDialog, onRemoveCard }) {
  const { name, brand, exp_month, exp_year, funding, id, object, last4 } = data
  const { dataUser } = useContext(AppContext)
  const [delLoading, setDelLoading] = useState(false)
  const [confirmDelete, setConfirmDelete] = useState(false)
  const dispatch = useDispatch()

  const changeDefault = () => {
    if (!isDefault) {
      onChangeDefaultCard(id)
    }
  }

  useEffect(() => {
    setConfirmDelete(false)
  }, [isVisble])

  const deleteCard = async () => {
    try {
      setDelLoading(true)
      const request = await AxiosInstance.post(`/payment/delete-card?userId=${dataUser?._id}&paymentMethodId=${id}`)
      if (request.result && request.statusCode === 200) {
        dispatch(cardSlice.actions.onChangeDefaultId(request.newDefaultId))
        setDelLoading(false)
        onClose(false)
        onRemoveCard(id)
        onOpenSuccessDialog(true)
      }
    } catch (error) {
      console.log(error);

    }
  }
  const onDeleteCard = () => {
    if (!confirmDelete) {
      setConfirmDelete(true)
    } else {
      deleteCard()
    }

  }
  if (!isVisble) return null

  return (
    <div className={styles.container}>
      <div className={styles.body}>
        <IoClose size={27} style={{ position: 'absolute', top: 10, right: 10, cursor: 'pointer' }}
          onClick={() => onClose(false)} />
        {
          brand === 'Visa' ? <SiVisa className={styles.iconVisa} size={60} color='#1434CB' /> :
            <div style={{ display: 'flex', columnGap: 10, alignItems: 'center' }}>
              <div className={styles.masterCardView}>
                <div className={styles.masterCard1} />
                <div className={styles.masterCard2} />
              </div>
              {brand}
            </div>

        }
        <div className={styles.infoCard}>
          <div className={styles.itemCardInfo}>
            <p>Card name</p>
            <p>{name}</p>
          </div>
          <div className={styles.itemCardInfo}>
            <p>Card number</p>
            <p>{numOnCardDisplay(last4)}</p>
          </div>
          <div className={styles.itemCardInfo}>
            <p>Type</p>
            <p>{object}</p>
          </div>
          <div className={styles.itemCardInfo}>
            <p>Funding</p>
            <p>{funding}</p>
          </div>
          <div className={styles.itemCardInfo}>
            <p>Expiry Date</p>
            <p>{exp_month > 10 ? exp_month : '0' + exp_month}/{exp_year}</p>
          </div>
        </div>
        <div className={styles.viewToggle}>
          {
            isDefault ?
              <span style={{
                color: 'rgba(4, 243, 4, 0.508)',
                fontSize: 13, display: 'flex',
                alignItems: 'center', columnGap: 4
              }}>
                <BsCheckCircleFill size={11} /> Default
              </span> :
              <span style={{ fontSize: 13, display: 'flex', alignItems: 'center', columnGap: 4 }}>
                {
                  loading ? <CircleLoading boderColor={'black'} width={12} height={12} /> : null
                }
                Set as default
              </span>
          } <div onClick={changeDefault} style={{ transition: 'opacity 0.2s ease-in-out', opacity: loading ? 0.4 : 1 }}>
            <ToggleDefault result={isDefault} />
          </div>

        </div>
        <div className={styles.viewBtn}>
          <button
            onClick={onDeleteCard}
            className={`${styles.btnDeleteCard} ${confirmDelete ? styles.confirm : ''}`}>
            {
              confirmDelete ? <div style={{ display: 'flex', alignItems: 'center', columnGap: 5, justifyContent: 'center' }}>
                {delLoading ? <CircleLoading boderColor={'white'}/> : null} Confirm Delete</div> : "Delete Card"
            }
          </button>
          <button
            onClick={() => setConfirmDelete(false)}
            className={`${styles.btnCancel} ${confirmDelete ? styles.show : styles.hide}`}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}
