import React, { useEffect, useState } from 'react'
import { GrNext, GrPrevious } from 'react-icons/gr'
import styles from './MovePageAccess.module.css'
import { useDispatch, useSelector } from 'react-redux';
import { RxSlash } from "react-icons/rx";
import filtersSlice from '../filters/filtersSlice';
import { pageSelected } from '../../../redux/selector';
export default function MovePageAccess({ pages, loading }) {
    const [indexSelected, setIndexSelected] = useState(1)
    const currentPage = useSelector(pageSelected)
    const dispatch = useDispatch()
    const onNextPage = () => {
        if (indexSelected < pages) {
            setIndexSelected(prevIndex => prevIndex + 1);
        }
    };

    const onPrevPage = () => {
        if (indexSelected > 1) {
            setIndexSelected(prevIndex => prevIndex - 1);
        }
    };
    useEffect(() => {
        setIndexSelected(currentPage)
    }, [currentPage])
    useEffect(() => {
        dispatch(filtersSlice.actions.onChangeField({
            field: "page",
            value: indexSelected,
            isCurrent: true
        }))
    }, [dispatch, indexSelected])
    return (
        <div className={`${styles.viewAccess} ${loading ? styles.none_eventMovePage : ''}`}>
            <button onClick={onPrevPage} className={styles.btn}>
                <GrPrevious className={styles.btn_icon} />
            </button>
            <span className={styles.viewSelectedIndex}>{indexSelected} <RxSlash /> {pages}</span>
            <button onClick={onNextPage} className={styles.btn}>
                <GrNext className={styles.btn_icon} />
            </button>
        </div>
    )
}
