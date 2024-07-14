import React, { useState } from 'react'
import styles from './SizeList.module.css'
export default function SizeList() {
    const [selectedSize, setselectedSize] = useState(null)
    const onChangeSize = (size) => {
        setselectedSize(size)
    }
    return (
        <div className={styles.container}>
            <h5>Size</h5>
            {
                sizeData && sizeData.length > 0 ?
                    <div className={styles.viewSize}>
                        {sizeData.map(item => {
                            const isSelected = selectedSize === item;
                            return (
                                <div
                                    className={styles.itemSize}
                                    key={item}
                                    onClick={() => onChangeSize(item)}
                                    style={{
                                        paddingLeft:10, paddingRight:10,
                                        height: 30,
                                        background: isSelected ? "black" : "white",
                                        color: isSelected ? "white" : "black",
                                        borderRadius: 3,
                                   
                                    }}
                                > {item} </div>
                            );
                        })}
                    </div> : null

            }
        </div>
    )
}
const sizeData = [
    'S',
    'M',
    'L',
    'XL',
    'XXL',
]