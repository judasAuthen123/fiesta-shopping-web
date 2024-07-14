import React from 'react'
import ItemProduct, { products } from '../../../../public/components/product/ItemProduct'
export default function MyWishlists() {
  return (
    <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', columnGap:20, rowGap:30}}>
      {
        products.map(item =>
          <ItemProduct key={item.id} brand={item.brand} name={item.name} price={item.price}/>
        )
      }
    </div>
  )
}
