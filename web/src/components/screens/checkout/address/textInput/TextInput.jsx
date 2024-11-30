import React from 'react'
import styles from './TextInput.module.css'
import { IoClose } from 'react-icons/io5'
export default function TextInput({ label, isError, onChange, ctg, value }) {
    return (
        <div className={styles.viewInput}>
            <input
                value={value}
                id='this' className={styles.inputField}
                placeholder=' ' onChange={onChange}
                style={isError ? { borderColor: 'red' } : {}} />
            <label htmlFor='this' className={styles.labelField} style={isError ? { color: 'red' } : {}}>
                {label}
            </label>
            {
                isError &&
                <div className={styles.viewErr}>
                    {isError.message[ctg]} <IoClose />
                </div>
            }
        </div>
    )
}
