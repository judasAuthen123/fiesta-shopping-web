import React from 'react'
import styles from './Done.module.css'
import { MdOutlineDone } from "react-icons/md";
import { Link } from 'react-router-dom';
import { GrFormNextLink } from "react-icons/gr";
import { useTranslation } from 'react-i18next';
export default function Done() {
    const {t} = useTranslation()
    return (
        <div className={styles.container}>
            <label>{t('Checkout.doneCheckout.title')}<MdOutlineDone size={20} color='#05d905'/> </label>
            <div className={styles.layoutContent}>
                <p>
                    {t('Checkout.doneCheckout.thanks')}
                </p>
                <p>
                {t('Checkout.doneCheckout.provide')}
                </p>
                <p>
                {t('Checkout.doneCheckout.shipped')}
                </p>
            </div>
            <div className={styles.doneAccess}>
                <Link to='/shop'>{t('Checkout.doneCheckout.continue')}</Link>
                <Link to='/profile?type=2'>{t('Checkout.doneCheckout.viewOrder')}<GrFormNextLink/></Link>
            </div>
        </div>
    )
}
