import React, { useState, useEffect } from 'react'
import styles from './ToggleButton.module.css'
export default function ToggleButton({ typeData }) {
    const [toggleResult, setToggleResult] = useState(() => {
        const storedValue = localStorage.getItem(typeData);
        return storedValue ? JSON.parse(storedValue) : false;
    });

    const onChangeToggle = () => {
        setToggleResult(prevToggleResult => !prevToggleResult);
    };
    useEffect(() => {
        localStorage.setItem(typeData, toggleResult)
    }, [toggleResult, typeData])

    return (
        <div className={`${styles.container} ${toggleResult ? styles.on : styles.off}`} onClick={onChangeToggle}>
            <div className={styles.dot}>

            </div>
        </div>
    )
}
