import React, { useContext, useEffect, useState } from 'react'
import styles from './AddressForm.module.css'
import DropDownAdress from './DropDownAdress'
import { RxTriangleDown } from "react-icons/rx";
import AxiosInstance from '../../../../util/AxiosInstance';
import CircleLoading from '../../../public/components/loading/CircleLoading';
import { AppContext } from '../../../../util/AppContext';
import { useTranslation } from 'react-i18next';
import { validationAddress } from './validation';
import { IoClose } from 'react-icons/io5'
import TextInput from './textInput/TextInput';
import { set } from 'lodash';
const dislayCityDistrictWard = (data) => {
    if (Array.isArray(data) && data.length > 0) {
        const validValues = data.filter(item => item);
        return validValues.join(', ');
    }
    return '';
}
export default function AddressForm({ isVisible, onClose, onOpenSuccessDialog }) {
    const { t } = useTranslation()
    const { dataUser, setDataUser } = useContext(AppContext)
    const [provinceData, setProvinceData] = useState(null);
    const [districtData, setDistrictData] = useState(null);
    const [wardData, setWardData] = useState(null);
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [street, setStreet] = useState('')
    const [houseNo, setHouseNo] = useState('')
    const [dropDownAddressVisible, setDropDownAddressVisible] = useState(false)
    const [loading, setLoading] = useState(false)
    const [errors, setErrors] = useState(null)
    function clearErr(errName) {
        if (errors?.[errName]) {
            setErrors(prev => {
                if (prev) {
                    const { [errName]: _, ...newErr } = prev
                    return newErr
                }
                return null
            })
        }
    }

    useEffect(() => {
        if (wardData) {
            setDropDownAddressVisible(false)
        }
    }, [wardData])

    useEffect(() => {
        setProvinceData(null)
        setErrors(null)
        setLoading(false)
        setName('')
        setPhone('')
        setStreet('')
        setHouseNo('')
    }, [isVisible])

    useEffect(() => {
        clearErr('detailAddress')
    }, [wardData, districtData, provinceData])

    const addNewAddress = async (event) => {
        event.preventDefault();
        const addFields = {
            city: provinceData?.ProvinceName,
            district: districtData?.DistrictName,
            ward: wardData?.WardName,
            name: name,
            phoneNumber: phone,
            street: street,
            houseNumber: houseNo
        }
        const err = validationAddress(addFields)

        if (!err) {
            console.log(addFields);
            try {
                setLoading(true);
                const request = await AxiosInstance.post('/userApi/addNewAddress', {
                    userId: dataUser?._id,
                    addFields: addFields
                });
                if (request.statusCode === 200) {
                    const user = JSON.parse(localStorage.getItem('user'))
                    if (Array.isArray(user.address)) {
                        user.address.push(request.data)
                        localStorage.setItem('user', JSON.stringify(user))
                        setDataUser(user)
                    }
                    setLoading(false);
                    onClose(false);
                    onOpenSuccessDialog(true)
                }
            } catch (error) {
                console.log('error add new address: ' + error);
            }
        } else {
            setErrors(err)
        }

    };


    const onNameHandler = (e) => {
        setName(e.target.value)
        clearErr('name')
    }


    const onPhoneHandler = (e) => {
        setPhone(e.target.value)
        clearErr('phone')
    }


    const onStreetHandler = (e) => {
        setStreet(e.target.value)
        clearErr('street')
    }


    const onHouseNoHandler = (e) => {
        setHouseNo(e.target.value)
    }

    const ctgName = t('MongoTranslator.nameCtg')

    if (!isVisible) return null
    return (
        <div className={styles.container}>
            <form onSubmit={addNewAddress}>
                <p style={{ fontSize: 18, fontWeight: 500, marginBottom: 40 }}>{t('Components.address.titleAdd')}</p>
                <div className={styles.boxInput}>
                    <div className={styles.inputRow}>
                        <TextInput label={t('Components.address.addressDetail.name')} onChange={onNameHandler} isError={errors?.name} ctg={ctgName} />
                        <TextInput label={t('Components.address.addressDetail.phoneNumber')} onChange={onPhoneHandler} isError={errors?.phone} ctg={ctgName} />
                    </div>
                    <div>
                        <div className={styles.containerDropDown}>
                            <div className={styles.viewInput}>
                                <input
                                    style={errors?.detailAddress ? { borderColor: 'red' } : {}}
                                    id='detail'
                                    className={styles.inputField}
                                    placeholder=' '
                                    readOnly={true}
                                    onFocus={() => setDropDownAddressVisible(true)}
                                    value={dislayCityDistrictWard([provinceData?.ProvinceName, districtData?.DistrictName, wardData?.WardName])}
                                />
                                <label htmlFor='detail' className={styles.labelField} style={errors?.detailAddress ? { color: 'red' } : {}}>
                                    {t('Components.address.addressDetail.city')}, {t('Components.address.addressDetail.district')}, {t('Components.address.addressDetail.ward')}
                                </label>
                                {
                                    errors?.detailAddress &&
                                    <div className={styles.viewErr}>
                                        {errors.detailAddress.message[ctgName]} <IoClose />
                                    </div>
                                }
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
                    <TextInput label={t('Components.address.addressDetail.street')} onChange={onStreetHandler} isError={errors?.street} ctg={ctgName} />
                    <TextInput label={t('Components.address.addressDetail.houseNumber')} onChange={onHouseNoHandler} ctg={ctgName} />
                    <div className={styles.viewButton}>
                        <button onClick={() => onClose(false)}>
                            {t('Components.address.addressDetail.button.buttonCancel')}
                        </button>
                        <button type='submit'>
                            {
                                loading ? <CircleLoading boderColor={'white'} /> : t('Components.address.addressDetail.button.buttonSubmit')
                            }
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}
