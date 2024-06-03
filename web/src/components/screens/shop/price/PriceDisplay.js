import React from 'react'
import { MdAttachMoney } from "react-icons/md";
export default function PriceDisplay({price}) {
  return (
    <div style={{flexDirection:'row', alignItems:'center', color:'red'}}>
      <MdAttachMoney/> {price}
    </div>
  )
}
