import React, { useEffect, useState } from 'react';
import ReactSlider from 'react-slider';
import styles from './PriceRanged.module.css'
import { useDispatch, useSelector } from 'react-redux';
import filtersSlice from '../filters/filtersSlice';
import { currentFilterSelected } from '../../../redux/selector';
export default function PriceRanged() {
    const selector = useSelector(currentFilterSelected)
    const [range, setRange] = useState([
        parseFloat(selector.priceRange.min), 
        parseFloat(selector.priceRange.max)
    ]);
    const [previousRange, setPreviousRange] = useState([0, 2000]); 
    const dispatch = useDispatch();
    const handleChange = (newRange) => {
        setRange(newRange);
    };
    useEffect(() => {
        if (range[0] !== previousRange[0] || range[1] !== previousRange[1]) {
            dispatch(filtersSlice.actions.onChangeCurrentPriceRange({ min: range[0], max: range[1] }));
            setPreviousRange(range); 
        }
    }, [range, dispatch, previousRange]);
    return (
        <div>
            <div className={styles.rangeValues}>
                Price: ${range[0]} - ${range[1]}
            </div>
            <ReactSlider
                className={styles.horizontalSlider}
                thumbClassName={styles.thumb}
                trackClassName={styles.track}
                step={1}
                min={0}
                max={2000}
                value={range}
                onChange={handleChange}
                withTracks={true}
                renderThumb={(props, state) => <div {...props} key={state.index}/>}
            />
        </div>
    );
}
