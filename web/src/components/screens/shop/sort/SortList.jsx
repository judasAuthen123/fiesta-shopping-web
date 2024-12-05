import React, { useEffect, useState } from 'react'
import styles from './SortList.module.css'
import { sortArray } from '../filters/sortData'
import { useDispatch, useSelector } from 'react-redux'
import { currentFilterSelectedForShopByCategory } from '../../../redux/selector'
import filtersSlice from '../filters/filtersSlice'
import { debounce } from 'lodash'
import { RiArrowDownSLine } from "react-icons/ri";
import { useTranslation } from 'react-i18next'
export default function SortList() {
    const currentFilters = useSelector(currentFilterSelectedForShopByCategory)
    const { t } = useTranslation()
    const dispatch = useDispatch()
    const [isDropSort, setIsDropSort] = useState(false)
    const [currentSortValue, setCurrentSortValue] = useState({})
    const onChangeSortBy = debounce((data) => {
        const { sortBy, sortOrder, name } = data
        const sortData = { sortBy, sortOrder }
        dispatch(filtersSlice.actions.onChangeSort(sortData))
        setCurrentSortValue(name)
        setIsDropSort(false)
    }, 200)
    const onDropSort = () => {
        setIsDropSort(prev => !prev)
    }
    const sortNameLabel = t('MongoTranslator.nameCtg')
    return (
        <div className={styles.viewDataSort}>
            <div className={styles.sortList}>
                {
                    sortArray && sortArray.map(item =>
                        <div
                            key={item.name.viName}
                            className={`${currentFilters?.sortBy === item.formattedObject.value &&
                                currentFilters?.sortOrder === item.formattedObject.order ? styles.sortIn : styles.sortOut}`}
                            onClick={() => onChangeSortBy(item)}> {item.name[sortNameLabel]} </div>
                    )
                }
            </div>
            <div className={styles.sortDrop} onClick={onDropSort}>
                <RiArrowDownSLine className={`${styles.icon} ${isDropSort ? styles.rotate: ''}`} size={20} />
                <div className={styles.viewSortIn}>
                    {Object.keys(currentSortValue).length > 0 ? currentSortValue[sortNameLabel] : t('Shop.select')}
                </div>
                <div className={`${styles.dropDataSort} ${isDropSort ? styles.hide : ''}`}>
                    {
                        sortArray && sortArray.map(item =>
                            <div
                                key={item.name.viName}
                                className={`${currentFilters?.sortBy === item.formattedObject.value &&
                                    currentFilters?.sortOrder === item.formattedObject.order ? styles.sortIn : styles.sortOut}`}
                                onClick={() => onChangeSortBy(item)}> {item.name[sortNameLabel]} </div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}
