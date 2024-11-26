import React, { useContext, useEffect, useState } from 'react'
import styles from './ShippingAddress.module.css'
import ItemAddress from './address/ItemAddress'
import AddressForm from './address/AddressForm'
import { AppContext } from '../../../util/AppContext'
import { GrFormNext, GrFormPrevious } from 'react-icons/gr'
import { PiSmileyXEyesBold } from "react-icons/pi";
import Dialog from './../../public/components/dialog/Dialog';
import { useTranslation } from 'react-i18next'
export default function ShippingAddress({ stepSubmit, onChangeAddress, currentAddress }) {
    const { dataUser } = useContext(AppContext)
    const { t } = useTranslation()
    const [addressFormVisible, setAddressFormVisible] = useState(false)
    const [address, setAddress] = useState([])
    const [visible, setIsVisible] = useState(false)
    const onCallbackAddressFormClose = (state) => {
        setAddressFormVisible(state)
    }
    useEffect(() => {
        if (dataUser) {
            setAddress(dataUser.address?.reverse())
        }
    }, [dataUser])
    
    useEffect(() => {
        if (visible) {
            const timer = setTimeout(() => {
                setIsVisible(false)
            }, 1800)
            return () => clearTimeout(timer)
        }
    }, [visible])
    return (
        <div className={styles.layoutContent}>
            <div className={styles.viewTitle}>
                <label>
                {t('Checkout.shippingAddress.title')}
                </label>
                <div className={styles.boxButton}>
                    <button onClick={() => stepSubmit('backToOrderSubmit')}>
                        <GrFormPrevious /> {t('Checkout.accessBtn.back')}
                    </button>
                    <button onClick={() => stepSubmit('shippingSubmit')}>
                    {t('Checkout.accessBtn.next')} <GrFormNext />
                    </button>
                </div>
            </div>
            <div>
                <div className={styles.boxText}>
                    <p>{t('Checkout.shippingAddress.string2')}</p>
                </div>
                <div className={styles.boxAddress}>
                    {
                        address && address.length > 0 ?
                            address.map(item =>
                                <ItemAddress data={item} key={item._id}
                                    onOpenSuccessDialog={setIsVisible}
                                    onChange={(data) => {
                                        onChangeAddress(data)

                                    }
                                    } selected={item?._id === currentAddress?._id} />
                            ) : <div style={{
                                marginLeft:40, display: 'flex', 
                                columnGap:15, alignItems: 'center'}}><PiSmileyXEyesBold size={30}/> {t('Checkout.shippingAddress.listEmpty')}</div>
                    }
                </div>
                <button
                    onClick={() => setAddressFormVisible(prev => !prev)}
                    style={{ padding: 10, backgroundColor: 'black', color: 'white', marginTop: 10, border: 'none', borderRadius: 3 }}>
                    + {t('Components.address.titleAdd')}
                </button>
                <AddressForm isVisible={addressFormVisible} onClose={onCallbackAddressFormClose} onOpenSuccessDialog={setIsVisible} />
                <Dialog status={t('Components.address.dialogTitleUpdate')} isVisible={visible} />
            </div>
        </div>
    )
}
