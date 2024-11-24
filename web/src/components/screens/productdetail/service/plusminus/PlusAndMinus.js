import React, { useEffect, useState } from 'react'
import { LuMinus } from 'react-icons/lu'
import { GoPlus } from 'react-icons/go'
export default function PlusAndMinus({onChange}) {
    const [quantity, setQuantity] = useState(1)
    const calcQuantity = (calc) => {
        if (calc === 'sum') {
            if (quantity < 5) {
                setQuantity(prevQuantity => prevQuantity + 1)
            }
        }
        if(calc === 'difference') {
            if(quantity > 1) {
                setQuantity(prevQuantity => prevQuantity - 1)
            }
        }
    }
    useEffect(() => {
        onChange(quantity)
    }, [quantity, onChange])
    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            width: 80,
            justifyContent: "space-between",
            border: '1px solid black',
            /* border-top-right-radius: 15px;
            
            border-bottom-left-radius: 15px; */
            borderRadius: 7,
            padding: 5,
            userSelect: 'none'
        }}>
            <LuMinus onClick={() => calcQuantity('difference')}/> {quantity} <GoPlus onClick={() => calcQuantity('sum')}/>
        </div>
    )
}
