import React, { useContext, useEffect, useState } from 'react'
import styles from './ItemAddress.module.css'
import { FiEdit } from 'react-icons/fi'
import { RiDeleteBin6Line } from "react-icons/ri";
import AddressFormUpdate from './AddressFormUpdate';
import ConfirmDialog from '../../../public/components/dialog/ConfirmDialog';
import AxiosInstance from '../../../../util/AxiosInstance';
import { AppContext } from '../../../../util/AppContext';
import { useTranslation } from 'react-i18next';
export default function ItemAddress({ data, onChange, selected, onOpenSuccessDialog }) {
  const {t} = useTranslation()
  const { dataUser, setDataUser } = useContext(AppContext)
  const [addressFormUpdateVisible, setAddressFormUpdateVisible] = useState(false)
  const [isVisibleConfirm, setIsVisibleConfirm] = useState(false)
  const [isDelete, setIsDelete] = useState(false)
  const [loading, setLoading] = useState(false)
  const deleteAddress = async () => {
    setLoading(true)
    const request = await AxiosInstance.post('/userApi/deleteAddress', {
      userId: dataUser?._id,
      addressId: data._id
    })
    
    if (request.statusCode === 200) {
      const user = JSON.parse(localStorage.getItem('user'))
      if(Array.isArray(user.address)) {
        user.address = user.address.filter(item => item._id !== data._id)
      }
      localStorage.setItem('user', JSON.stringify(user))
      setDataUser(user)
      setIsVisibleConfirm(false)
      setIsDelete(false)
    }
  }
  useEffect(() => {
    if(isDelete) {
      deleteAddress()
    }
  }, [isDelete])
  return (
    <div className={styles.container}>
      <div className={styles.addressView}>
        <div className={styles.checkboxView}>
          <p>
            {data.name} | (+84) {data.phoneNumber}
          </p>
          <input type='checkbox' onChange={() => onChange(data)} checked={selected} value={data} />
        </div>
        <div className={styles.addressInfo}>
          <div>
            Địa chỉ: {data.street}
          </div>
          <div>
            Số nhà : {data.houseNumber ? data.houseNumber : 'Không có'}
          </div>
          <div>
            {data.ward}, {data.district}, {data.city}
          </div>
        </div>
        <div className={styles.buttonView}>
          <button
            onClick={() => setAddressFormUpdateVisible(prev => !prev)}
            className={styles.btnEdit}>
            <FiEdit className={styles.icon} />
            <div className={styles.text}>
            {t('Components.address.addressDetail.button.buttonEdit')}
            </div>
          </button>
          <button className={styles.btnDelete}
            onClick={() => setIsVisibleConfirm(prev => !prev)}
          >
            <RiDeleteBin6Line className={styles.icon} />
            <div className={styles.text}>
            {t('Components.address.addressDetail.button.buttonDelete')}
            </div>
          </button>
        </div>
      </div>
      <AddressFormUpdate
        isVisible={addressFormUpdateVisible}
        onClose={setAddressFormUpdateVisible}
        onOpenSuccessDialog={onOpenSuccessDialog}
        dataOldAddress={data} />
      <ConfirmDialog label={t('Components.address.titleConfirmDelelte')}
        isVisible={isVisibleConfirm}
        onCancel={setIsVisibleConfirm} 
        loading={loading}
        onConfirm={setIsDelete}/>
    </div>
  )
}
