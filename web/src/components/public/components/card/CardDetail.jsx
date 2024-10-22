import React, { useEffect } from 'react'
import styles from './CardDetail.module.css'
import { IoClose } from "react-icons/io5";
import { SiVisa } from 'react-icons/si';
const numOnCardDisplay = (num) => {
  return `•••• ${num}`
}
export default function CardDetail({ isVisble, onClose, data }) {
  const { name, brand, exp_month, exp_year, funding, id, object, last4 } = data
  console.log(data);

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
        <button className={styles.btnDeleteCard}>
          Delete Card
        </button>
      </div>
    </div>
  )
}
