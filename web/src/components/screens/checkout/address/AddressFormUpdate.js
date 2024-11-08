import React, { useContext, useEffect, useState } from 'react'
import styles from './AddressForm.module.css'
import DropDownAdress from './DropDownAdress'
import { RxTriangleDown } from "react-icons/rx";
import AxiosInstance from '../../../../util/AxiosInstance';
import { _valid_Address } from './Validate';
import CircleLoading from '../../../public/components/loading/CircleLoading';
import { AppContext } from '../../../../util/AppContext';
import { useTranslation } from 'react-i18next';
const dislayCityDistrictWard = (data) => {
    if (Array.isArray(data) && data.length > 0) {
        const validValues = data.filter(item => item);
        return validValues.join(', ');
    }
    return '';
}
export default function AddressFormUpdate({ isVisible, onClose, onOpenSuccessDialog, dataOldAddress }) {
    const { t } = useTranslation()
    const { name, phoneNumber, city, district, ward, street, houseNumber } = dataOldAddress
    const { dataUser, setDataUser } = useContext(AppContext)
    const [provinceData, setProvinceData] = useState(null);
    const [districtData, setDistrictData] = useState(null);
    const [wardData, setWardData] = useState(null);
    const [newName, setName] = useState(name)
    const [phone, setPhone] = useState(phoneNumber)
    const [newStreet, setStreet] = useState(street)
    const [houseNo, setHouseNo] = useState(houseNumber)
    const [dropDownAddressVisible, setDropDownAddressVisible] = useState(false)
    const [loading, setLoading] = useState(false)
    const arrAddressSelected = () => {
        if (provinceData || districtData || wardData) {
            return [provinceData?.ProvinceName, districtData?.DistrictName, wardData?.WardName]
        } else {
            return [city, district, ward]
        }
    }
    useEffect(() => {
        if (wardData) {
            setDropDownAddressVisible(false)
        }
    }, [wardData])
    useEffect(() => {
        setProvinceData(null)
        setName(name)
        setPhone(phoneNumber)
        setStreet(street)
        setHouseNo(houseNumber)
    }, [isVisible])

    const updateAddress = async (event) => {
        event.preventDefault();
        const newData = {
            name: newName,
            phoneNumber: phone,
            city: provinceData ? provinceData.ProvinceName : city,
            district: provinceData ? districtData?.DistrictName : district,
            ward: provinceData ? wardData?.WardName : ward,
            street: newStreet,
            houseNumber: houseNo
        }
        try {
            if (_valid_Address(newName, phone,
                provinceData ? provinceData : city,
                provinceData ? districtData : district,
                provinceData ? wardData : ward,
                newStreet)) {
                setLoading(true);
                const request = await AxiosInstance.post('/userApi/updateAddress', {
                    userId: dataUser?._id,
                    addressId: dataOldAddress._id,
                    updateFields: newData
                });
                if (request.statusCode === 200) {
                    const user = JSON.parse(localStorage.getItem('user'))
                    if (Array.isArray(user.address)) {
                        user.address.map(item => {
                            user.address = user.address.map(item => {
                                if (item._id === request.data._id) {
                                    return request.data;
                                }
                                return item;
                            });
                        }
                        )
                        localStorage.setItem('user', JSON.stringify(user))
                        setDataUser(user)
                    }
                    setLoading(false);
                    onClose(false);
                    onOpenSuccessDialog(true)
                }
            } else {
                alert('Please fill informations as valid!');
            }
        } catch (error) {
            console.log('error add new address: ' + error);
        }
    };
    const onNameHandler = (e) => {
        setName(e.target.value)
    }
    const onPhoneHandler = (e) => {
        setPhone(e.target.value)
    }
    const onStreetHandler = (e) => {
        setStreet(e.target.value)
    }
    const onHouseNoHandler = (e) => {
        setHouseNo(e.target.value)
    }
    if (!isVisible) return null
    return (
        <div className={styles.container}>
            <form onSubmit={updateAddress}>
                <p style={{ fontSize: 18, fontWeight: 500 }}>{t('Components.address.titleUpdate')}</p>
                <div className={styles.boxInput}>
                    <div className={styles.inputRow}>
                        <div className={styles.viewInput}>
                            <input
                                value={newName}
                                id='name' className={styles.inputField} placeholder=' ' onChange={onNameHandler} />
                            <label htmlFor='name' className={styles.labelField}>
                                {t('Components.address.addressDetail.name')}
                            </label>
                        </div>
                        <div className={styles.viewInput}>
                            <input
                                value={phone}
                                id='phone' className={styles.inputField} placeholder=' ' onChange={onPhoneHandler} />
                            <label htmlFor='phone' className={styles.labelField}>
                                {t('Components.address.addressDetail.phoneNumber')}
                            </label>
                        </div>
                    </div>
                    <div>
                        <div className={styles.containerDropDown}>
                            <div className={styles.viewInput}>
                                <input
                                    id='detail'
                                    className={styles.inputField}
                                    placeholder=' '
                                    readOnly={true}
                                    onFocus={() => setDropDownAddressVisible(true)}
                                    value={dislayCityDistrictWard(arrAddressSelected())}
                                />
                                <label htmlFor='detail' className={styles.labelField}>
                                    {t('Components.address.addressDetail.city')}, {t('Components.address.addressDetail.district')}, {t('Components.address.addressDetail.ward')}
                                </label>
                            </div>
                            <RxTriangleDown
                                onClick={() => setDropDownAddressVisible(prev => !prev)}
                                className={`${styles.iconDrop} ${dropDownAddressVisible ? styles.rotated : ''}`} />
                        </div>
                        <DropDownAdress
                            onProvinceDataChange={setProvinceData}
                            onDistrictDataChange={setDistrictData}
                            onWardDataChange={setWardData}
                            isVisible={dropDownAddressVisible}
                            onClose={dropDownAddressVisible}
                        />
                    </div>
                    <div className={styles.viewInput}>
                        <input
                            value={newStreet}
                            id='street' className={styles.inputField} placeholder=' ' onChange={onStreetHandler} />
                        <label htmlFor='street' className={styles.labelField}>
                            {t('Components.address.addressDetail.street')}
                        </label>
                    </div>
                    <div className={styles.viewInput}>
                        <input
                            value={houseNo}
                            id='detail' className={styles.inputField} placeholder=' ' onChange={onHouseNoHandler} />
                        <label htmlFor='detail' className={styles.labelField}>
                            {t('Components.address.addressDetail.houseNumber')}
                        </label>
                    </div>
                    <div className={styles.viewButton}>
                        <button onClick={() => onClose(false)}>
                            {t('Components.address.addressDetail.button.buttonCancel')}
                        </button>
                        <button type='submit'>
                            {
                                loading ? <CircleLoading boderColor={'white'} /> : t('Components.address.addressDetail.button.buttonUpdate')
                            }
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}
