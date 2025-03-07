import React, { useState } from 'react'
import styles from './SizeList.module.css'
import { useTranslation } from 'react-i18next'
export default function SizeList({ data, onChange }) {
    const [selectedSize, setselectedSize] = useState(null)
    const { t } = useTranslation()
    const onChangeSize = (size) => {
        onChange(size)
        setselectedSize(size)
    }
    return (
        <>
            {
                data.length > 0 ?
                    <div className={styles.container}>
                        <h5>{t('ProductDetail.size')}</h5>
                        <div style={{display: 'flex', columnGap: 20, alignItems: 'center'}}>
                            <div className={styles.viewSize}>
                                {data.map(item => {
                                    const isSelected = selectedSize === item;
                                    return (
                                        <div
                                            className={styles.itemSize}
                                            key={item}
                                            onClick={() => onChangeSize(item)}
                                            style={{
                                                paddingLeft: 10, paddingRight: 10,
                                                height: 30,
                                                background: isSelected ? "black" : "white",
                                                color: isSelected ? "white" : "black",
                                                borderRadius: 3,
                                            }}
                                        > {item} </div>
                                    );
                                })}
                            </div>
                            <span>{selectedSize}</span>
                        </div>

                    </div> : null
            }
        </>
    )
}
// const sizeData = [
//     'S',
//     'M',
//     'L',
//     'XL',
//     'XXL',
// ]