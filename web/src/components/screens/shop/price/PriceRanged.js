import React, { useEffect, useState } from 'react';
import ReactSlider from 'react-slider';
import styles from './PriceRanged.module.css'
import { useDispatch, useSelector } from 'react-redux';
import filtersSlice from '../filters/filtersSlice';
import { useTranslation } from 'react-i18next';
import { priceRangeSelected } from '../../../redux/selector';
export default function PriceRanged() {
    const [range, setRange] = useState([]);
    const { t } = useTranslation()
    const dispatch = useDispatch();
    const currentPriceRange = useSelector(priceRangeSelected)
    function debounce(func, deley) {
        let timer;
        return function (...args) {
            clearTimeout(timer)
            timer = setTimeout(() => func(...args), deley)
        }
    }
    useEffect(() => {
        setRange([currentPriceRange?.min, currentPriceRange?.max])
    }, [currentPriceRange])
    const handleChange = debounce((newRange) => {
        setRange(newRange)
    }, 20)
    // const handleChange = (newRange) => {
    //     setRange(newRange)
    // }
    useEffect(() => {
        dispatch(filtersSlice.actions.onChangeCurrentPriceRange({ min: range[0], max: range[1] }));
    }, [range, dispatch]);
    return (
        <div>
            <div className={styles.rangeValues}>
                {t('Shop.filter.range')}: ${range[0]} - ${range[1]}
            </div>
            <ReactSlider
                className={styles.horizontalSlider}
                thumbClassName={styles.thumb}
                trackClassName={styles.track}
                step={5}
                min={0}
                max={200}
                value={range}
                onChange={handleChange}
                withTracks={true}
                renderThumb={(props, state) => <div {...props} key={state.index} />}
            />
        </div>
    );
}
