import React, { useEffect, useState } from 'react'
import AxiosInstance from './../../../../util/AxiosInstance';
import styles from './Item.module.css'
import CircleLoading from '../../../public/components/loading/CircleLoading';
export default function Ward({ getData, districtID }) {
    const [dataWard, setDataWard] = useState([])
    useEffect(() => {
        const getProvinceFromGHN = async () => {
            try {
                if (districtID) {
                    const response = await AxiosInstance.post('https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/ward?district_id',
                        {
                            district_id: districtID
                        },
                        {
                            headers: {
                                'token': `${process.env.REACT_APP_GHN_EXPRESS_API_KEY}`,
                                'Content-Type': 'application/json',
                            }
                        }
                    )
                    if (response.code === 200) {
                        const sortedData = response.data.sort((a, b) => a.WardName.localeCompare(b.WardName, 'vi', { sensitivity: 'base' }));
                        setDataWard(sortedData);             
                    }
                }
            } catch (error) {
                console.log(error);
            }

        }
        getProvinceFromGHN()
    }, [districtID])
    const onClickItem = (item) => {
        getData(item)
    }
    return (
        <div style={{ display: 'flex', flexDirection: 'column', rowGap: 2, height: 200, overflowY: 'scroll', paddingTop: 5 }}>
            {
                dataWard && dataWard.length > 0 ?
                    dataWard.map(item =>
                        <div key={item.WardCode} className={styles.item} onClick={() => onClickItem(item)}>{item.WardName}</div>
                    ) : <div style={{padding:10, letterSpacing:0.7}}><CircleLoading /> Data loading...</div>
            }
        </div>
    )
}