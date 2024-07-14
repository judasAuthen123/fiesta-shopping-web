import React from 'react'
import ItemOrder, { orders } from './ItemOrder'

export default function MyOrders() {
  return (
    <div style={{display: 'flex', flexDirection:'column', rowGap:20}}>
      {
        orders.map(item =>
          <ItemOrder key={item.id} status={item.status}/>
        )
      }
    </div>
  )
}
