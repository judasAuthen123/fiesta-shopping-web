import React, { useContext, useEffect, useState } from 'react'
import styles from './AddressForm.module.css'
import DropDownAdress from './DropDownAdress'
import { RxTriangleDown } from "react-icons/rx";
import AxiosInstance from '../../../../util/AxiosInstance';
import CircleLoading from '../../../public/components/loading/CircleLoading';
import { AppContext } from '../../../../util/AppContext';
import { useTranslation } from 'react-i18next';
import { validationAddress } from './validation';
import TextInput from './textInput/TextInput';
import { IoClose } from 'react-icons/io5';
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
    const [errors, setErrors] = useState(null)
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
        setLoading(false)
        setErrors(null)
        setName(name)
        setPhone(phoneNumber)
        setStreet(street)
        setHouseNo(houseNumber)
    }, [isVisible, name, phoneNumber, street, houseNumber])

    useEffect(() => {
        clearErr('detailAddress')
    }, [wardData, districtData, provinceData])


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
    const ctgName = t('MongoTranslator.nameCtg')



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
        const err = validationAddress(newData)
        console.log(err);

        try {
            if (!err) {
                setLoading(true);
                const request = await AxiosInstance.post('/userApi/updateAddress', {
                    userId: dataUser?._id,
                    addressId: dataOldAddress._id,
                    updateFields: newData
                });
                if (request.statusCode === 200) {
                    const user = JSON.parse(localStorage.getItem('user'))
                    if (Array.isArray(user.address)) {
                        user.address = user.address.map(item => {
                            if (item._id === request.data._id) {
                                return request.data;
                            }
                            return item;
                        });
                        localStorage.setItem('user', JSON.stringify(user))
                        setDataUser(user)
                    }
                    setLoading(false);
                    onClose(false);
                    onOpenSuccessDialog(true)
                }
            } else {
                setErrors(err)
            }
        } catch (error) {
            console.log('error add new address: ' + error);
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
    if (!isVisible) return null
    return (
        <div className={styles.container}>
            <form onSubmit={updateAddress}>
                <p style={{ fontSize: 18, fontWeight: 500, marginBottom: 40 }}>{t('Components.address.titleUpdate')}</p>
                <div className={styles.boxInput}>
                    <div className={styles.inputRow}>
                        <TextInput label={t('Components.address.addressDetail.name')} onChange={onNameHandler} isError={errors?.name} ctg={ctgName} value={newName} />
                        <TextInput label={t('Components.address.addressDetail.phoneNumber')} onChange={onPhoneHandler} isError={errors?.phone} ctg={ctgName} value={phone} />
                    </div>
                    <div>
                        <div className={styles.containerDropDown}>
                            <div className={styles.viewInput}>
                                <input
                                    style={errors?.detailAddress ? {borderColor: 'red'} : {}}
                                    id='detail'
                                    className={styles.inputField}
                                    placeholder=' '
                                    readOnly={true}
                                    onFocus={() => setDropDownAddressVisible(true)}
                                    value={dislayCityDistrictWard(arrAddressSelected())}
                                />
                                <label htmlFor='detail' className={styles.labelField} style={errors?.detailAddress ? {color: 'red'} : {}}>
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
                    <TextInput label={t('Components.address.addressDetail.street')} onChange={onStreetHandler} isError={errors?.street} ctg={ctgName} value={newStreet} />
                    <TextInput label={t('Components.address.addressDetail.houseNumber')} onChange={onHouseNoHandler} ctg={ctgName} value={houseNo} />
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
