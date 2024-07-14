import React from 'react'
import styles from './ItemAddress.module.css'
import { FiEdit } from 'react-icons/fi'
import { RiDeleteBin6Line } from "react-icons/ri";
export default function ItemAddress({data}) {
  return (
    <div className={styles.container}>
      <div className={styles.addressView}> 
        <div className={styles.checkboxView}>
            <h5>
                Robert Fox
            </h5>
            <input type='checkbox'/>
        </div>
        <div className={styles.addressInfo}>
            <div>
            {data.street} {data.district},
            </div>
            <div>
            {data.city} {data.zip}
            </div>
        </div>
        <div className={styles.buttonView}>
            <button className={styles.btnEdit}>
                <FiEdit className={styles.icon}/>
                <div className={styles.text}>
                    Edit
                </div>
            </button>
            <button className={styles.btnDelete}>
                <RiDeleteBin6Line className={styles.icon}/>
                <div className={styles.text}>
                    Delete
                </div>
            </button>
        </div>
      </div>
    </div>
  )
}
export const address = [
    {
        "id": "21dasd",
        "street": "123 Tran Duy Hung",
        "city": "Tp.HCM",
        "district": "Quận Gò Vấp",
        "zip": "44231"
    },
    {
        "id": "21asdasd",
        "street": "16A/B4 Ha Thi Khiem",
        "city": "Tp.HCM",
        "district": "Quận 12p",
        "zip": "17421"
    },
    {
        "id": "21daczsxcd",
        "street": "113 Nguyen Hue",
        "city": "Tp.HCM",
        "district": "Quận 1",
        "zip": "46412"
    },
]