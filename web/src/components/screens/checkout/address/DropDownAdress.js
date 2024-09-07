import React, { useEffect, useRef, useState } from 'react'
import styles from './DropDownAddres.module.css'
import Province from '../dataaddress/Province'
import District from '../dataaddress/District'
import Ward from '../dataaddress/Ward'
export default function DropDownAdress({onProvinceDataChange, onDistrictDataChange, onWardDataChange, isVisible}) {
    const [tabSelected, setTabSelected] = useState(0)
    const [provinceData, setProvinceData] = useState(null)
    const [districtData, setDistrictData] = useState(null)
    const [wardData, setWardData] = useState(null)
    const marginRef = useRef()


    useEffect(() => {
        if(marginRef.current) {
            marginRef.current.style.marginLeft = `calc((100% / 3) * ${tabSelected})`
        }       
    }, [tabSelected, isVisible])


    const onChangeTab = (index) => {
        if (index === 0) {
            setTabSelected(index)
        }
        if (index === 1) {
            provinceData ? setTabSelected(index) : setTabSelected(prev => prev)
        }
        if (index === 2) {
            provinceData && districtData ? setTabSelected(index) : setTabSelected(prev => prev)
        }
    }


    const onProvinceHandler = (data) => {
        setProvinceData(data)
        onProvinceDataChange(data)
    }
    const onDistrictHandler = (data) => {
        setDistrictData(data)
        onDistrictDataChange(data)
    }
    const onWardHandler = (data) => {
        setWardData(data)
        onWardDataChange(data)
    }



    useEffect(() => {
        onChangeTab(1)
        setDistrictData(null)
        setWardData(null)
        onDistrictDataChange(null)
        onWardDataChange(null)
    }, [provinceData])



    useEffect(() => {
        onChangeTab(2)
        setWardData(null)
        onWardDataChange(null)
    }, [districtData])


    let renderComponent = null;
    switch (tabSelected) {
        case 0:
            renderComponent = <Province getData={onProvinceHandler} />
            break;
        case 1:
            renderComponent = <District getData={onDistrictHandler} provinceID={provinceData?.ProvinceID} />
            break;
        case 2:
            renderComponent = <Ward getData={onWardHandler} districtID={districtData?.DistrictID}/>
            break;
        default:
            renderComponent = null
    }


    if(!isVisible) return null
    return (
        <div className={styles.container}>
            <div className={styles.topTabContainer}>
                <div className={styles.boxTopTab}>
                    <div className={styles.viewTopTab} onClick={() => onChangeTab(0)}>
                        City
                    </div>
                    <div className={styles.viewTopTab} onClick={() => onChangeTab(1)} style={{ cursor: provinceData ? 'pointer' : 'not-allowed' }}>
                        District
                    </div>
                    <div className={styles.viewTopTab} onClick={() => onChangeTab(2)} style={{ cursor: provinceData && districtData ? 'pointer' : 'not-allowed' }}>
                        Ward
                    </div>
                </div>
                <div className={styles.sliderTab} ref={marginRef}>
                </div>
            </div>

            <div className={styles.viewData}>
                {
                    renderComponent
                }
            </div>
        </div>
    )
}
