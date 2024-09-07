import React from 'react'
import styles from './ItemAddress.module.css'
import { FiEdit } from 'react-icons/fi'
import { RiDeleteBin6Line } from "react-icons/ri";
export default function ItemAddress({ data, onChange, selected }) {
  return (
    <div className={styles.container}>
      <div className={styles.addressView}>
        <div className={styles.checkboxView}>
          <p>
            {data.name} | (+84) {data.phoneNumber}
          </p>
          <input type='checkbox' onChange={() => onChange(data)} checked={selected} value={data}/>
        </div>
        <div className={styles.addressInfo}>
          <div>
            Địa chỉ: {data.street}
          </div>
          <div>
            Số nhà : {data.houseNumber ? data.houseNumber : 'Không có'}
          </div>
          <div>
            {data.ward}, {data.district}, {data.city}
          </div>
        </div>
        <div className={styles.buttonView}>
          <button className={styles.btnEdit}>
            <FiEdit className={styles.icon} />
            <div className={styles.text}>
              Edit
            </div>
          </button>
          <button className={styles.btnDelete}>
            <RiDeleteBin6Line className={styles.icon} />
            <div className={styles.text}>
              Delete
            </div>
          </button>
        </div>
      </div>
    </div>
  )
}
