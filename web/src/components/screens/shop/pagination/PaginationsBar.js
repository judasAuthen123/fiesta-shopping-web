import React, { useEffect, useState } from 'react'
import styles from './PaginationsBar.module.css'
import { GrNext, GrPrevious } from 'react-icons/gr'
import { useDispatch } from 'react-redux'
import filtersSlice from '../filters/filtersSlice'
export default function PaginationsBar({ pages }) {
    const dispatch = useDispatch()
    const [indexSelected, setIndexSelected] = useState(1)
    const pageCountArray = Array.from({ length: pages }, (_, index) => index + 1)
    const onPageChange = (page) => {
        setIndexSelected(page)
    }
    const onNextPage = () => {
        if (indexSelected < pages && pages > 1) {
            setIndexSelected(prevIndex => prevIndex + 1)
        } else {
            setIndexSelected(prevIndex => prevIndex)
        }
    }
    const onPrevPage = () => {
        if (indexSelected > 1 && pages > 1) {
            setIndexSelected(prevIndex => prevIndex - 1)
        } else {
            setIndexSelected(prevIndex => prevIndex)
        }
    }
    useEffect(() => {
        dispatch(filtersSlice.actions.onPageChange(indexSelected))
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
