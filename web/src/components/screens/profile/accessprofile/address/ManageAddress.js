import React from 'react'
import styles from './ManageAddress.module.css'
import { TiPlus } from 'react-icons/ti'
import ItemAddress from './ItemAddress'

export default function ManageAddress() {
  return (
    <div className={styles.container}>
      <button>
        <TiPlus /> Add New Address
      </button>
      <div style={{display: 'flex', flexDirection:'column', rowGap:20}}>
        
      </div>
    </div>
  )
}
