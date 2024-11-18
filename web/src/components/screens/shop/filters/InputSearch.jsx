import React, { useState } from 'react'
import styles from './InputSearch.module.css'
import { IoSearchOutline } from 'react-icons/io5';
import filtersSlice from './filtersSlice';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
export default function InputSearch() {
    const {t} = useTranslation()
    const [name, setName] = useState()
    const dispatch = useDispatch()
    const onSeachName = () => {
        dispatch(filtersSlice.actions.onChangeField({
            field: 'name',
            value: name,
            isCurrent: true,
            reloadPage: true
        }))
    }
    return (
        <div className={styles.inputSearchView}>
            <div className={styles.viewInputField}>
                <IoSearchOutline />
                <input placeholder={t('Shop.filter.titleSearchName')} onChange={e => setName(e.target.value)} />
                <button onClick={onSeachName}>{t('Shop.filter.search')}</button>
            </div>
        </div>
    )
}
