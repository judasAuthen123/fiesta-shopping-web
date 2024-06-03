import React, { useEffect, useState } from 'react';
import ReactSlider from 'react-slider';
import styles from './PriceRanged.module.css'
import { MdAttachMoney } from "react-icons/md";
import PriceDisplay from './PriceDisplay';
import { useDispatch, useSelector } from 'react-redux';
import filtersSlice from '../filters/filtersSlice';
import { filterSelected } from '../../../redux/selector';
export default function PriceRanged() {
    const [range, setRange] = useState([20, 1980]);
    const dispatch = useDispatch();
    const handleChange = (newRange) => {
        setRange(newRange);
    };
    useEffect(() => {
      dispatch(filtersSlice.actions.onChangePriceRange({min: range[0], max: range[1]}))
      return () => {    
      }
    }, [range[0], range[1]])
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
                renderThumb={(props, state) => <div {...props}/>}
            />
        </div>
    );
}
