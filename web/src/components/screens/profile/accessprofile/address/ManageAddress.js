import React, { useContext, useEffect, useState } from 'react'
import styles from './ManageAddress.module.css'
import { TiPlus } from 'react-icons/ti'
import ItemAddress from './ItemAddress'
import { AppContext } from '../../../../../util/AppContext'
import ListRender from './../../../../public/components/listRender/ListRender';
import AddressForm from './../../../checkout/address/AddressForm';
import Dialog from './../../../../public/components/dialog/Dialog';

export default function ManageAddress() {
  const { dataUser } = useContext(AppContext)
  const [address, setAddress] = useState([])
  const [addressFormVisible, setAddressFormVisible] = useState(false)
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
  useEffect(() => {
    if (dataUser?.address) {
      setAddress(dataUser.address.reverse())
    }
  }, [dataUser])
  return (
    <div className={styles.container}>
      <button onClick={() => setAddressFormVisible(true)}>
        <TiPlus /> Add New Address
      </button>
      <ListRender isTrue={address.length > 0} className={styles.listRender} >
        {
          address.map(item =>
            <ItemAddress key={item._id} data={item} onOpenSuccessDialog={setIsVisible}/>
          )
        }
      </ListRender>
      <AddressForm isVisible={addressFormVisible} onClose={onCallbackAddressFormClose} onOpenSuccessDialog={setIsVisible} />
      <Dialog status={'Update Address Successful!'} isVisible={visible} />
    </div>
  )
}
