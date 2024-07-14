import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { currentMainCategoryFilterSelected } from '../../../redux/selector';
import filtersSlice from '../filters/filtersSlice';

function ItemSubCategory({ id, name }) {
    const currentMainCategory = useSelector(currentMainCategoryFilterSelected)
    const [isChecked, setIsChecked] = useState(currentMainCategory === id);
    const dispatch = useDispatch()
    useEffect(() => {
        setIsChecked(currentMainCategory === id)
    }, [currentMainCategory, id])

    const handleCheckboxChange = useCallback(() => {
        setIsChecked(prevChecked => !prevChecked);
        if (!isChecked) {
            dispatch(filtersSlice.actions.onMainCategoryCurrentChange(id));
        } else {
            dispatch(filtersSlice.actions.onMainCategoryCurrentChange(""));
        }
    }, [dispatch, isChecked, id]);
    return (
        <div style={{display: 'flex', alignItems: 'center'}}>
            <input type='checkbox' checked={isChecked} onChange={handleCheckboxChange}/> <label>{name}</label>
        </div>
    )
}
export default React.memo(ItemSubCategory)
