import React from 'react'
import styles from './Done.module.css'
import { MdOutlineDone } from "react-icons/md";
import { Link } from 'react-router-dom';
import { GrFormNextLink } from "react-icons/gr";
export default function Done() {
    return (
        <div className={styles.container}>
            <label>Your order has been confirmed <MdOutlineDone size={20} color='#05d905'/> </label>
            <div className={styles.layoutContent}>
                <p>
                    Thank you for choosing Fiesta!
                </p>
                <p>
                    We will do our best to provide you with an excellent shopping experience.
                </p>
                <p>
                    Your order has been confirmed and will be shipped soon.
                </p>
            </div>
            <div className={styles.doneAccess}>
                <Link to='/shop'>Continue to shop?</Link>
                <Link to='/profile?type=2'>View Your Order <GrFormNextLink/></Link>
            </div>
        </div>
    )
}
