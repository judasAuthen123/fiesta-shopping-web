import React, { useState } from 'react'
import styles from './StylesInput.module.css'
import { VscEye, VscEyeClosed } from 'react-icons/vsc'
import { IoClose } from 'react-icons/io5'
export default function InputPassword({placeholder, label, error, onClearErr, ctgName, onChange}) {
    const [isShowPassword, setIsShowPassword] = useState(false)
    const onChangeIsShow = () => setIsShowPassword(prev => !prev)
    const onChangeText = (e) => {
        onChange(e.target.value)
        onClearErr()
    }
    return (
        <div className={styles.viewInput}>
            <label>{label}</label>
            <div className={styles.inputField} style={{borderColor: error ? 'red' : ''}}>
                <input placeholder={placeholder} type={isShowPassword ? 'text' : 'password'} onChange={onChangeText} />
                {
                    isShowPassword ?
                        <VscEye onClick={onChangeIsShow} className={styles.eyePassword} /> :
                        <VscEyeClosed onClick={onChangeIsShow} className={styles.eyePassword} />
                }
            </div>
            {
                error && <div className={styles.viewErr}>
                    {error.message?.[ctgName]} <IoClose />
                </div>
            }
        </div>
    )
}
