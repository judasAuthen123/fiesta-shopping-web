import React, { useEffect, useRef, useState } from 'react'
import styles from './VerifyCodeInput.module.css'
export default function VerifyCodeInput({ onChangeCode, onClearCode }) {
    const [code, setCode] = useState(new Array(6).fill(''))
    const inputRefs = useRef([])


    const handleChange = (element, index) => {
        const value = element.value;
        if (!isNaN(value)) {
            const newCode = [...code];
            newCode[index] = value;
            setCode(newCode);
            if (value !== '' && index < 5) {
                inputRefs.current[index + 1].focus();
            }
        }
    };
    useEffect(() => {
        setCode(new Array(6).fill(''));
        inputRefs.current[0]?.focus();
    }, [onClearCode]);

    useEffect(() => {
        const verifyString = code.join('')
        onChangeCode(verifyString)
    }, [code, onChangeCode])



    const handleKeyDown = (event, index) => {
        if (event.key === 'Backspace' && index > 0 && code[index] === '') {
            inputRefs.current[index - 1].focus();
        }
    };


    return (
        <div className={styles.container}>
            {
                code.map((value, index) => (
                    <input
                        placeholder=' '
                        key={index}
                        type='text'
                        maxLength={1}
                        value={value}

                        onChange={(e) => handleChange(e.target, index)}
                        onKeyDown={(e) => handleKeyDown(e, index)}
                        ref={(el) => inputRefs.current[index] = el}
                    />
                ))
            }
        </div>
    )
}
