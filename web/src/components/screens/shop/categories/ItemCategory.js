import React, { useState } from 'react'

export default function ItemCategory({id, name}) {
    const [isChecked, setIsChecked] = useState(false);
    const toggleCheckox = () => {
        setIsChecked(prevCheck => !prevCheck)
      }
    return (
        <>
            <input type='checkbox' checked={isChecked} onClick={toggleCheckox} /> <label>{name}</label>
        </>
    )
}