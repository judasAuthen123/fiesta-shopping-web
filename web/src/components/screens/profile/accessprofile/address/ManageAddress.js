import React from 'react'
import styles from './ManageAddress.module.css'
import { TiPlus } from 'react-icons/ti'
import { address } from '../../../shipping/address/ItemAddress'
import ItemAddress from './ItemAddress'

export default function ManageAddress() {
  return (
    <div className={styles.container}>
      <button>
        <TiPlus /> Add New Address
      </button>
      <div style={{display: 'flex', flexDirection:'column', rowGap:20}}>
        {
          address.map(item => 
            <ItemAddress key={item.id}/>
          )
        }
      </div>
    </div>
  )
}
