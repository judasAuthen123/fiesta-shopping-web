import React, { useEffect, useState } from 'react'
import AxiosInstance from './../../../../util/AxiosInstance';
import styles from './Item.module.css'
import CircleLoading from './../../../public/components/loading/CircleLoading';
export default function District({ getData, provinceID }) {
    const [dataDistrict, setDataDistrict] = useState([])
    useEffect(() => {
        const getProvinceFromGHN = async () => {
            try {
                if (provinceID) {
                    const response = await AxiosInstance.get('https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/district',
                        {
                            params: {
                                province_id: provinceID
                            },
                            headers: {
                                'token': `${process.env.REACT_APP_GHN_EXPRESS_API_KEY}`,
                                'Content-Type': 'application/json',
                            }
                        }
                    )

                    if (response.code === 200) {
                        const filteredData = response.data.filter(item => item.Code !== '9505');
                        const sortedData = filteredData.sort((a, b) => a.DistrictName.localeCompare(b.DistrictName, 'vi', { sensitivity: 'base' }));
                        setDataDistrict(sortedData);
                    }
                }
            } catch (error) {
                console.log(error);
            }

        }
        getProvinceFromGHN()
    }, [provinceID])
    const onClickItem = (item) => {
        getData(item)
    }
    return (
        <div style={{ display: 'flex', flexDirection: 'column', rowGap: 2, height: 200, overflowY: 'scroll', paddingTop: 5 }}>
            {
                dataDistrict && dataDistrict.length > 0 ?
                    dataDistrict.map(item =>
                        <div key={item.DistrictID} className={styles.item} onClick={() => onClickItem(item)}>{item.DistrictName}</div>
                    ) : <div style={{ padding: 10, letterSpacing: 0.7 }}><CircleLoading /> Data loading...</div>
            }
        </div>
    )
}