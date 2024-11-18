import React, { useEffect, useState } from 'react'
import styles from './PaginationsBar.module.css'
import { GrNext, GrPrevious } from 'react-icons/gr'
import { useDispatch, useSelector } from 'react-redux'
import filtersSlice from '../filters/filtersSlice'
import { pageSelected } from '../../../redux/selector'
export default function PaginationsBar({ pages }) {
    const dispatch = useDispatch()
    const currentPage = useSelector(pageSelected)
    const [indexSelected, setIndexSelected] = useState(1)
    const pageCountArray = Array.from({ length: pages }, (_, index) => index + 1)
    const onPageChange = (page) => {
        setIndexSelected(page)
    }
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
            field: 'page',
            value: indexSelected,
            isCurrent: true
        }))
    }, [indexSelected, dispatch])
    return (
        <div className={styles.container}>

            {pageCountArray.length > 0 && pages > 1 ?

                <ul>
                    <GrPrevious style={{ cursor: 'pointer' }} onClick={onPrevPage} />
                    {
                        pageCountArray.map(item => (
                            <li
                                key={item}
                                onClick={() => onPageChange(item)}
                                className={indexSelected === item ? styles.active : styles.inActive}>{item}</li>
                        ))
                    }
                    <GrNext style={{ cursor: 'pointer' }} onClick={onNextPage} />
                </ul>

                : null}

        </div>
    )
}
