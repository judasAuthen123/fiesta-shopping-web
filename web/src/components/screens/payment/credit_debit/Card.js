import React from 'react'
import styles from './Card.module.css'
export default function Card() {
  return (
    <form>
      <h5>Add a new address</h5>
      <div className={styles.boxInput}>
        <div className={styles.viewInput}>
          <label>
            Card Number
          </label>
          <input type='number'/>
        </div>
        <div className={styles.viewInput}>
          <label>
            Card Name
          </label>
          <input />
        </div>
        <div className={styles.viewForm1}>
          <div className={styles.viewInput}>
            <label>
              Expiry Date
            </label>
            <input type='date'/>
          </div>
          <div className={styles.viewInput}>
            <label>
              CCV
            </label>
            <input type='password'/>
          </div>
        </div>
        <button>Add Card</button>
      </div>
    </form>
  )
}
