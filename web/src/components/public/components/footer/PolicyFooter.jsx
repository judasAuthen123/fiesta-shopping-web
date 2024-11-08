import React from 'react'
import styles from './PolicyFooter.module.css'
import { HiOutlineCubeTransparent } from "react-icons/hi2";
import { CiDollar } from "react-icons/ci";
import { GiHeadphones } from "react-icons/gi";
import { GoCreditCard } from "react-icons/go";
import { useTranslation } from 'react-i18next';
export default function PolicyFooter() {
    const {t} = useTranslation()
    const policyList = [
        {
            id: 1,
            policyName: t('PolicyFooter.freeShipping.title'),
            policyDetail: t('PolicyFooter.freeShipping.holder'),
            icon: HiOutlineCubeTransparent
        },
        {
            id: 2,
            policyName: t('PolicyFooter.moneyGuarantee.title'),
            policyDetail: t('PolicyFooter.moneyGuarantee.holder'),
            icon: CiDollar
        },
        {
            id: 3,
            policyName: t('PolicyFooter.onlineSupport.title'),
            policyDetail: t('PolicyFooter.onlineSupport.holder'),
            icon: GiHeadphones
        },
        {
            id: 4,
            policyName: t('PolicyFooter.flexiblePayment.title'),
            policyDetail: t('PolicyFooter.flexiblePayment.holder'),
            icon: GoCreditCard
        }
    ]
    return (
        <div className={styles.container}>
            <div className={styles.layoutContent}>
                {
                    policyList && policyList.map(item =>
                        <div className={styles.itemPolicy} key={item.id}>
                            <item.icon size={26}/>
                            <p style={{fontSize: 15, fontWeight: 600, marginTop:15}}>{item.policyName}</p>
                            <p style={{fontSize: 13}}>{item.policyDetail}</p>
                        </div>
                    )
                }
            </div>
        </div>
    )
}
