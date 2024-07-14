import React, { useState } from 'react'
import styles from './ColorList.module.css'
export default function ColorList() {
    const [selectedColor, setselectedColor] = useState(null)
    const onChangeColor = (color) => {
        setselectedColor(color)
    }
    return (
        <div className={styles.container}>
            <h5>Color</h5>
            {
                colorData && colorData.length > 0 ?
                    <div className={styles.viewColor}>
                        {colorData.map(item => {
                            const isSelected = selectedColor === item;
                            return (
                                <div
                                    key={item}
                                    onClick={() => onChangeColor(item)}
                                    style={{
                                        width: isSelected ? 33 : 30,
                                        height: isSelected ? 33 : 30,
                                        background: item,
                                        borderRadius: 3,
                                        transition: 'all 0.2s ease'
                                    }}
                                />
                            );
                        })}
                    </div> : null

            }
        </div>
    )
}
const colorData = [
    '#aaaaaa',
    'red',
    'green',
    'blue',
    '#2fadaf',
    'salmon'
]
