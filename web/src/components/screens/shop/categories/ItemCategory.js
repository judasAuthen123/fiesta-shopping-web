import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import { currentMainCategoryFilterSelected } from '../../../redux/selector';
export default function ItemCategory({ id, name, mainCategoryID }) {
    // const dispatch = useDispatch()
    const currentMainCategory = useSelector(currentMainCategoryFilterSelected)
    const [isChecked, setIsChecked] = useState(currentMainCategory === mainCategoryID);
    useEffect(() => {
        setIsChecked(currentMainCategory === id)
    }, [currentMainCategory, id])

    // const handleCheckboxChange = () => {
    //     setIsChecked(prevChecked => !prevChecked);
    //     if (!isChecked) {
            
    //     } else {
           
    //     }
    // };
    const toggleCheckox = () => {
        setIsChecked(prevCheck => !prevCheck)
    }
    return (
        <>
            <input type='checkbox' checked={isChecked} onChange={toggleCheckox} /> <label>{name}</label>
        </>
    )
}
