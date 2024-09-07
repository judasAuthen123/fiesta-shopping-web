import React, { useEffect, useState } from 'react';
import ReactSlider from 'react-slider';
import styles from './PriceRanged.module.css'
import { useDispatch } from 'react-redux';
import filtersSlice from '../filters/filtersSlice';
export default function PriceRanged() {
    const [range, setRange] = useState([0, 2000]);
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
                step={10}
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
