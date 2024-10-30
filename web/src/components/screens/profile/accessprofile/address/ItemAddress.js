import React, { useState, useEffect, useContext } from 'react'
import styles from './ItemAddress.module.css'
import { FiEdit, FiPhoneCall } from 'react-icons/fi'
import { RiDeleteBin6Line } from 'react-icons/ri'
import AxiosInstance from '../../../../../util/AxiosInstance'
import AddressFormUpdate from '../../../checkout/address/AddressFormUpdate'
import ConfirmDialog from '../../../../public/components/dialog/ConfirmDialog'
import { AppContext } from '../../../../../util/AppContext'
export default function ItemAddress({ data, onOpenSuccessDialog }) {
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
            if (Array.isArray(user.address)) {
                user.address = user.address.filter(item => item._id !== data._id)
            }
            localStorage.setItem('user', JSON.stringify(user))
            setDataUser(user)
            setIsVisibleConfirm(false)
            setIsDelete(false)
        }
    }
    useEffect(() => {
        if (isDelete) {
            deleteAddress()
        }
    }, [isDelete])
    return (
        <div className={styles.container}>
            <div className={styles.boxAddress}>
                <p>
                    {data.name}
                </p>
                <p>
                    {data.ward}, {data.district}, {data.city}
                </p>
                <p>
                    Street: {data.street}
                </p>
                <p style={{ display: 'flex', columnGap: 10, alignItems: 'center' }}>
                    <FiPhoneCall /> {data.phoneNumber}
                </p>
            </div>
            <div className={styles.buttonView}>
                <button className={styles.btnEdit}
                    onClick={() => setAddressFormUpdateVisible(prev => !prev)}
                >
                    <FiEdit className={styles.icon} />
                    <div className={styles.text}>
                        Edit
                    </div>
                </button>
                <button className={styles.btnDelete}
                    onClick={() => setIsVisibleConfirm(prev => !prev)}
                >
                    <RiDeleteBin6Line className={styles.icon} />
                    <div className={styles.text}>
                        Delete
                    </div>
                </button>
            </div>
            <AddressFormUpdate
                isVisible={addressFormUpdateVisible}
                onClose={setAddressFormUpdateVisible}
                onOpenSuccessDialog={onOpenSuccessDialog}
                dataOldAddress={data} />
            <ConfirmDialog label={'Delete this addresss?'}
                isVisible={isVisibleConfirm}
                onCancel={setIsVisibleConfirm}
                loading={loading}
                onConfirm={setIsDelete} />
        </div>
    )
}
