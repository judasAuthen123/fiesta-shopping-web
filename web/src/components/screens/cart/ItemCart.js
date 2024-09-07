import React, { useEffect, useState } from 'react'
import styles from './ItemCart.module.css'
import { GoPlus } from 'react-icons/go'
import { LuMinus } from 'react-icons/lu'
import { RiDeleteBin6Line } from 'react-icons/ri'
import image from '../../assets/images/th.png'
const TextLimit = ({ text }) => {
    if (text.length <= 28) {
        return text;
    } else {
        return text.substring(0, 28) + '...';
    }
}
const variationsDisplay = (dimension) => {
    if (!dimension || Object.keys(dimension).length === 0) {
        return '';
    }
    const values = Object.values(dimension);
    const result = values.join(', ');
    return `variation: ${result}`;
}
export default function ItemCart({ data, onDelete, onCheck, checkAll }) {
    const [checked, setChecked] = useState(false)
    const deleteCart = (cartID) => {
        onDelete(cartID)
    }
    useEffect(() => {
        setChecked(checkAll)
    }, [checkAll])
    const onCheckBuy = () =>  {
        onCheck(data._id) 
        setChecked(prev => !prev)
    }
    return (
        <tr className={styles.container}>
            <td style={{width: '45%'}}>
                <div className={styles.viewTableProductTd}>
                    <input type="checkbox" onChange={onCheckBuy} checked={checked}/>
                    <img className={styles.productImg} alt='' src={image} loading='lazy'/>
                    <div className={styles.viewInfoProduct}>
                        <p style={{ fontWeight: 600, fontSize: 14 }}><TextLimit text={data.products.name} /></p>
                        <p style={{ fontSize: 14 }}>{data.brand}</p>
                    </div>
                    <div style={{ width: 80, fontSize: 13 }}>{variationsDisplay(data.products.variations[0].dimension)}</div>
                </div>
            </td>
            <td style={{ fontSize: 14, width: 200 }}>
                ${data.products.variations[0].price}
            </td>
            <td style={{ fontSize: 14 }}>
                <div className={styles.productQuantity}>
                    <LuMinus /> {data.quantity} <GoPlus />
                </div>
            </td>
            <td style={{ fontSize: 14 }}>
                ${(data.products.variations[0].price * data.quantity)}
            </td>
            <td>
                <RiDeleteBin6Line color='red' onClick={() => deleteCart(data._id)} style={{ cursor: 'pointer' }} />
            </td>
        </tr>
    )
}
