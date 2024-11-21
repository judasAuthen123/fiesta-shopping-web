import React from 'react'
import styles from './StylesInput.module.css'
import { IoClose } from 'react-icons/io5'
export default function InputText({ placeholder, label, error, onChange, onClearErr, ctgName }) {
    const onChangeText = (e) => {
        onChange(e.target.value)
        onClearErr()
    } 
    return (
        <div className={styles.viewInput}>
            <label>{label}</label>
            <div className={styles.inputField} style={{ borderColor: error ? 'red' : '' }}>
                <input placeholder={placeholder} type={'text'} onChange={onChangeText} />
            </div>
            {
                error && <div className={styles.viewErr}>
                    {error.message?.[ctgName]} <IoClose />
                </div>
            }
        </div>
    )
}
