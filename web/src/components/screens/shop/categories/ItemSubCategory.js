import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import filtersSlice from '../filters/filtersSlice';

function ItemSubCategory({ id, name }) {
    const [isChecked, setIsChecked] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const toggleChecked = () => {
        setIsChecked(!isChecked);
        if (!isChecked) {
            dispatch(filtersSlice.actions.resetFilters(id))
            navigate(`/shop/${id}`);
        }
    };
    return (
        <div style={{ display: 'flex', alignItems: 'center' }}>
            <input type='checkbox' checked={isChecked} onChange={toggleChecked} /> <label>{name}</label>
        </div>
    )
}
export default React.memo(ItemSubCategory)
