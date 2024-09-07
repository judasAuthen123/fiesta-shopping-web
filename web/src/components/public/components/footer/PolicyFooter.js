import React from 'react'
import styles from './PolicyFooter.module.css'
import { HiOutlineCubeTransparent } from "react-icons/hi2";
import { CiDollar } from "react-icons/ci";
import { GiHeadphones } from "react-icons/gi";
import { GoCreditCard } from "react-icons/go";
export default function PolicyFooter() {
    const policyList = [
        {
            id: 1,
            policyName: 'Free Shipping',
            policyDetail: 'Free shipping for order above $150',
            icon: HiOutlineCubeTransparent
        },
        {
            id: 2,
            policyName: 'Money Guarantee',
            policyDetail: 'Within 30 days for exchange',
            icon: CiDollar
        },
        {
            id: 3,
            policyName: 'Online Support',
            policyDetail: '24 hours a day, 7 days a week',
            icon: GiHeadphones
        },
        {
            id: 4,
            policyName: 'Flexible Payment',
            policyDetail: 'Pay with multiple credit cards',
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
