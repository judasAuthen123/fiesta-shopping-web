import React, { useState, useEffect, useMemo } from 'react'
import { GoPlus } from 'react-icons/go'
import { LuMinus } from 'react-icons/lu'
export default function UpdateCartButton({ quantity, onChange, loading }) {
    const [newQuantity, setNewQuantity] = useState(quantity)
    const calcQuantity = (calc) => {
        if (!loading) {
            setNewQuantity(prevQuantity =>
                calc === 'sum' ? prevQuantity + 1 : Math.max(1, prevQuantity - 1)
            );
        }
    };
    function debounce(func, delay) {
        let timer;
        return function (...args) {
            clearTimeout(timer);
            timer = setTimeout(() => func(...args), delay);
        };
    }
    const debouncedUpdateQuantity = useMemo(
        () => debounce((newQty) => {
            if (newQty !== quantity) {
                onChange(newQty);
            }
        }, 600),
        [quantity, onChange]
    );

    useEffect(() => {
        debouncedUpdateQuantity(newQuantity)
    }, [newQuantity, debouncedUpdateQuantity])
    return (
        <div style={{ display: 'flex', alignItems: 'center', width: 80, justifyContent: 'space-between', border: '1px solid  black', borderRadius: 10, padding: 5, opacity: loading ? 0.4 : 1 }}>
            <LuMinus onClick={() => calcQuantity('difference')} /> {newQuantity} <GoPlus onClick={() => calcQuantity('sum')} />
        </div>
    )
}
