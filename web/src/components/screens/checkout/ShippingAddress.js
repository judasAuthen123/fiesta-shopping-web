import React, { useContext, useEffect, useState } from 'react'
import styles from './ShippingAddress.module.css'
import ItemAddress from './address/ItemAddress'
import AddressForm from './address/AddressForm'
import { AppContext } from '../../../util/AppContext'
import { GrFormNext, GrFormPrevious } from 'react-icons/gr'
export default function ShippingAddress({ stepSubmit, onChangeAddress }) {
    const { dataUser } = useContext(AppContext)

    const [addressFormVisible, setAddressFormVisible] = useState(false)
    const [address, setAddress] = useState([])
    const [selectedAddress, setSelectedAddress] = useState(null)

    
    const onCallbackAddressFormClose = (state) => {
        setAddressFormVisible(state)
    }
    useEffect(() => {
        if (dataUser) {
            setAddress(dataUser.address)
        }
    }, [])
    return (
        <div className={styles.layoutContent}>
            <div className={styles.viewTitle}>
                <label>
                    Shipping Address
                </label>
                <div className={styles.boxButton}>
                    <button onClick={() => stepSubmit('backToOrderSubmit')}>
                        <GrFormPrevious /> Back
                    </button>
                    <button onClick={() => stepSubmit('shippingSubmit')}>
                        Next <GrFormNext />
                    </button>
                </div>
            </div>
            <div>
                <div className={styles.boxText}>
                    <h4>Select a delivery address</h4>
                    <p>Is the address you'd like to use displayed below? If so, click the crorresponding "Deliver to this address" button, or you can enter a new delivery address.</p>
                </div>
                <div className={styles.boxAddress}>
                    {
                        address && address.length > 0 ?
                            address.map(item =>
                                <ItemAddress data={item} key={item._id} onChange={(data) => {
                                    setSelectedAddress(data)
                                    onChangeAddress(data)
                                }
                                } selected={item?._id === selectedAddress?._id} />
                            ) : null
                    }
                </div>
                <button
                    onClick={() => setAddressFormVisible(prev => !prev)}
                    style={{ padding: 10, backgroundColor: 'black', color: 'white', marginTop: 10, border: 'none', borderRadius: 3 }}>
                    + New Address
                </button>
                <AddressForm isVisible={addressFormVisible} onClose={onCallbackAddressFormClose} />
            </div>
        </div>
    )
}
