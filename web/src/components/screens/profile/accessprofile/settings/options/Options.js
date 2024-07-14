import React from 'react'
import styles from './Options.module.css'
import Selection from '../selection/Selection'
import ToggleButton from '../toggle/ToggleButton'
export default function Options({ label, contentHolder, typeOption, optionsData, typeData }) {
    return (
        <div className={styles.container}>
            <div className={styles.view1}>
                <p>
                    {label}
                </p>
                <p>
                    {contentHolder}
                </p>
            </div>
            <div className={styles.view2}>
                {typeOption === 'selector' ? (
                    <Selection optionsData={optionsData} typeData={typeData} />
                ) : typeOption === 'toggle' ? (
                    <ToggleButton typeData={typeData}/>
                ) : null}
            </div>
        </div>
    )
}
