import React, { useState } from 'react'
import styles from './CardItem.module.css'
import { SiVisa } from "react-icons/si";
import { BsCheckCircleFill } from "react-icons/bs";
import CardDetail from '../../../public/components/card/CardDetail';
import { useTranslation } from 'react-i18next';
const numOnCardDisplay = (num) => {
    return `•••• ${num}`
}
export default function CardItem({ data, isDefault, onChangeDefaultCard, loading, onOpenSuccessDialog, onRemoveCard }) {
    const [cardDetailVisible, setCardDetailVisible] = useState(false)
    const {t} = useTranslation()
    return (
        <div className={styles.container}>
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
                    {numOnCardDisplay(data.last4 ? data.last4 : null)} {isDefault ? <div className={styles.defaultView}><BsCheckCircleFill color='#06ff0683' size={9} />{t('Components.card.isDefault')}</div> : null}
                </div>
                <div style={{ fontSize: 13.5 }}>
                    {data.name ? data.name : null}
                </div>
            </div>
            <button className={styles.buttonInfo} onClick={() => setCardDetailVisible(true)}>
                {t('Components.card.button.buttonRequest')}
            </button>
            <CardDetail 
            isVisble={cardDetailVisible} 
            onClose={setCardDetailVisible} 
            data={data}
            isDefault={isDefault}
            onChangeDefaultCard={onChangeDefaultCard}
            loading={loading}
            onOpenSuccessDialog={onOpenSuccessDialog}
            onRemoveCard={onRemoveCard}
            />
        </div>
    )
}
