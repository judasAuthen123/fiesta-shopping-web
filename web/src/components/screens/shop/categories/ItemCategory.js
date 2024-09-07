import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { currentSubCategorySelected } from '../../../redux/selector';
import filtersSlice from '../filters/filtersSlice';

export default function ItemCategory({ name, id }) {
    const subCategory = useSelector(currentSubCategorySelected)
    const dispatch = useDispatch()
    const [isChecked, setIsChecked] = useState(subCategory.includes(id));

    useEffect(() => {
        if (isChecked) {
            dispatch(filtersSlice.actions.onSubCategoryCurrentChange(id));
        } else {
            dispatch(filtersSlice.actions.onSubCategoryCurrentChange(id));
        }
    }, [isChecked, dispatch, id]);

    const toggleCheckox = () => {
        setIsChecked(prevCheck => !prevCheck)
    }
    return (
        <div style={{ display: 'flex', alignItems: 'center', columnGap: 10 }}>
            <input type='checkbox' checked={isChecked} onChange={toggleCheckox} style={{cursor: 'pointer'}}/> <label>{name}</label>
        </div>
    )
}
