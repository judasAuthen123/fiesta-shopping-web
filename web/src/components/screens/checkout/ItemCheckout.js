import React from 'react'
import styles from './ItemCheckout.module.css'
import { TiMinus, TiPlus } from 'react-icons/ti'
import { GoPlus } from 'react-icons/go'
import { LuMinus } from 'react-icons/lu'
import { RiDeleteBin6Line } from 'react-icons/ri'

export default function ItemCheckout({ data }) {
    return (
        <tr>
            <td>
                <div className={styles.viewTableProductTd}>
                    <div className={styles.productImg} />
                    <div className={styles.viewInfoProduct}>
                        <h5>{data.name}</h5>
                        <p>{data.brand}</p>
                    </div>
                </div>
            </td>
            <td>
                ${data.price}
            </td>
            <td>
                <div className={styles.productQuantity}>
                    <LuMinus /> 3 <GoPlus />
                </div>
            </td>
            <td>
                ${data.price}
            </td>
            <td>
                <RiDeleteBin6Line color='red'/>
            </td>
        </tr>
    )
}
