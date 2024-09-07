import React, { useEffect, useState } from 'react'
import styles from './AddressForm.module.css'
import DropDownAdress from './DropDownAdress'
import { RxTriangleDown } from "react-icons/rx";
import AxiosInstance from '../../../../util/AxiosInstance';
import { _valid_Address } from './Validate';
import CircleLoading from '../../../public/components/loading/CircleLoading';
const dislayCityDistrictWard = (data) => {
    if (Array.isArray(data) && data.length > 0) {
        const validValues = data.filter(item => item);
        return validValues.join(', ');
    }
    return '';
}
export default function AddressForm({ isVisible, onClose }) {
    const [provinceData, setProvinceData] = useState(null);
    const [districtData, setDistrictData] = useState(null);
    const [wardData, setWardData] = useState(null);
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [street, setStreet] = useState('')
    const [houseNo, setHouseNo] = useState('')
    const [dropDownAddressVisible, setDropDownAddressVisible] = useState(false)
    const [loading, setLoading] = useState(false)
    // useEffect(() => {
    //     console.log(provinceData?.ProvinceName);
    //     console.log(districtData?.DistrictName);
    //     console.log(wardData?.WardName);
    // }, [provinceData, districtData, wardData])
    const addNewAddress = async (event) => {
        event.preventDefault();
        try {
            if (_valid_Address(name, phone, provinceData?.ProvinceName, districtData?.DistrictName, wardData?.WardName, street)) {
                setLoading(true);
                const request = await AxiosInstance.post('/userApi/addNewAddress', {
                    userId: '662b71f75c040536cfe27d65',
                    addFields: {
                        name: name,
                        phoneNumber: phone,
                        city: provinceData.ProvinceName,
                        district: districtData.DistrictName,
                        ward: wardData.WardName,
                        street: street,
                        houseNo: houseNo
                    }
                });
                if (request.statusCode === 200) {
                    setLoading(false);
                    onClose(false);
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
            <form onSubmit={addNewAddress}>
                <p style={{ fontSize: 18, fontWeight: 500 }}>New Address</p>
                <div className={styles.boxInput}>
                    <div className={styles.inputRow}>
                        <div className={styles.viewInput}>
                            <input id='name' className={styles.inputField} placeholder=' ' onChange={onNameHandler} />
                            <label htmlFor='name' className={styles.labelField}>
                                Name
                            </label>
                        </div>
                        <div className={styles.viewInput}>
                            <input id='phone' className={styles.inputField} placeholder=' ' onChange={onPhoneHandler} />
                            <label htmlFor='phone' className={styles.labelField}>
                                Phone Number
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
                                    value={dislayCityDistrictWard([provinceData?.ProvinceName, districtData?.DistrictName, wardData?.WardName])}
                                />
                                <label htmlFor='detail' className={styles.labelField}>
                                    City, District, Ward
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
                        />
                    </div>
                    <div className={styles.viewInput}>
                        <input id='street' className={styles.inputField} placeholder=' ' onChange={onStreetHandler} />
                        <label htmlFor='street' className={styles.labelField}>
                            Street Name, Building
                        </label>
                    </div>
                    <div className={styles.viewInput}>
                        <input id='detail' className={styles.inputField} placeholder=' ' onChange={onHouseNoHandler} />
                        <label htmlFor='detail' className={styles.labelField}>
                            House No. (if applicable)
                        </label>
                    </div>
                    <div className={styles.viewDefault}>
                        <input type='checkbox' /> <label>Use as my default address</label>
                    </div>
                    <div className={styles.viewButton}>
                        <button onClick={() => onClose(false)}>
                            Cancel
                        </button>
                        <button type='submit'>
                            {
                                loading ? <CircleLoading /> : 'Submit'
                            }
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}
