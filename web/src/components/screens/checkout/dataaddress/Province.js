import React, { useEffect, useState } from 'react'
import AxiosInstance from './../../../../util/AxiosInstance';
import styles from './Item.module.css'
import CircleLoading from '../../../public/components/loading/CircleLoading';
export default function Province({ getData }) {
    const [dataProvince, setDataProvince] = useState([])
    useEffect(() => {
        const getProvinceFromGHN = async () => {
            try {
                const response = await AxiosInstance.get('https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/province',
                    {
                        headers: {
                            'token': `${process.env.REACT_APP_GHN_EXPRESS_API_KEY}`,
                            'Content-Type': 'application/json'
                        }
                    }
                )
                if (response.code === 200) {
                    
                    const sortedData = response.data.sort((a, b) => a.ProvinceName.localeCompare(b.ProvinceName, 'vi', { sensitivity: 'base' }));
                    setDataProvince(sortedData);
                }
            } catch (error) {
                console.log(error);
            }

        }
        getProvinceFromGHN()
    }, [])
    const onClickItem = (item) => {
        getData(item)
    }
    return (
        <div style={{ display: 'flex', flexDirection: 'column', rowGap: 2, height: 200, overflowY: 'scroll', paddingTop: 5 }}>
            {
                dataProvince.length > 0 ?
                    dataProvince.map(item =>
                        <div key={item.ProvinceID} className={styles.item} onClick={() => onClickItem(item)}>{item.ProvinceName}</div>
                    ) : <div style={{ padding: 10, letterSpacing: 0.7 }}><CircleLoading /> Data loading...</div>
            }
        </div>
    )
}
