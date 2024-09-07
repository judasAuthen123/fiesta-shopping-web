import React, { useEffect, useState } from 'react'
import styles from './CardItem.module.css'
import { SiVisa } from "react-icons/si";
import { BsCheckCircleFill } from "react-icons/bs";
const numOnCardDisplay = (num) => {
    return `•••• ${num}`
}
export default function CardItem({ data, isDefault, onOpen, onCardIdHandler }) {
    const [backgroundStyle, setBackgroundStyle] = useState(false)
    const onOpenConfrimModal = (state) => onOpen(state)
    useEffect(() => {
        if (backgroundStyle) {
            const timer = setTimeout(() => {
                setBackgroundStyle(false)
            }, 1000)
            return () => clearTimeout(timer)
        }
    }, [backgroundStyle])
    return (
        <div className={backgroundStyle ? styles.container2 : styles.container} onClick={() => {
            setBackgroundStyle(true)
            onOpenConfrimModal(true)
            onCardIdHandler(data.id)
        }
        }>
            {
                data.brand && data.brand === 'MasterCard' ?
                    <div className={styles.masterCardView}>
                        <div className={styles.masterCard1} />
                        <div className={styles.masterCard2} />
                    </div> :
                    <div className={styles.visaCardView}>
                        <SiVisa size={33} className={styles.visaIcon} />
                    </div>
            }
            <div>
                <div style={{ fontSize: 14, letterSpacing: 1.2, display: 'flex', alignItems: 'center', columnGap: 7 }}>
                    {numOnCardDisplay(data.last4 ? data.last4 : null)} {isDefault ? <div className={styles.defaultView}><BsCheckCircleFill color='#06ff0683' size={9} />default</div> : null}
                </div>
                <div style={{ fontSize: 13.5 }}>
                    {data.name ? data.name : null}
                </div>
            </div>
        </div>
    )
}
