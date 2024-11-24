import React, { useState } from 'react'
import styles from './ColorList.module.css'
import { useTranslation } from 'react-i18next'
export default function ColorList({ data, onChange }) {
    const { t } = useTranslation()
    const [selectedColor, setselectedColor] = useState(null)
    const onChangeColor = (color) => {
        setselectedColor(color)
        onChange(color)
    }
    return (
        <>
            {
                data && data.length > 0 ?
                    <div className={styles.container}>
                        <h5>{t('ProductDetail.color')}</h5>
                        <div style={{ display: 'flex', columnGap: 20, alignItems: 'center' }}>
                            <div className={styles.viewColor}>
                                {data.map(item => {
                                    const isSelected = selectedColor === item;
                                    return (
                                        <div
                                            key={item}
                                            onClick={() => onChangeColor(item)}
                                            style={{
                                                width: isSelected ? 34 : 30,
                                                height: isSelected ? 32 : 28,
                                                background: item,
                                                borderRadius: 5,
                                                transition: 'all 0.1s ease'
                                            }}
                                        />
                                    );
                                })}
                            </div>
                            <span style={{color: selectedColor}}>{selectedColor}</span>
                        </div>

                    </div> : null
            }
        </>
    )
}
// const colorData = [
//     '#aaaaaa',
//     'red',
//     'green',
//     'blue',
//     '#2fadaf',
//     'salmon'
// ]
