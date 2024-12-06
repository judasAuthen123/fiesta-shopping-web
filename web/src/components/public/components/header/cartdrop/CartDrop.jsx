import React, { useContext, useEffect, useState } from 'react'
import styles from './CartDrop.module.css'
import { FaBagShopping } from 'react-icons/fa6'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { arrCart } from '../../../../redux/selector'
import AxiosInstance from './../../../../../util/AxiosInstance';
import { AppContext } from '../../../../../util/AppContext'
import { cartSlice } from './cartSlice'
export default function CartDrop() {
    const navigate = useNavigate()
    const { dataUser } = useContext(AppContext)
    const arrId = useSelector(arrCart)
    const dispatch = useDispatch()
    useEffect(() => {
        const getCart = async () => {
            try {
                const response = await AxiosInstance.get(`/cart/getBypage/1/${dataUser?._id}`)
                if (response.result) {
                    if (response.data) {                     
                        const arrId = response.data.result.map((item) => {
                            return {
                                _id: item._id,
                                variationId: item.variationId
                            }
                        })                                             
                        dispatch(cartSlice.actions.onApplyDataCart({
                            arrId: arrId
                        }))
                    }
                }
            } catch (error) {
                console.log(error);
            }

        }
        getCart()
    }, [dataUser?._id])
    return (
        <div onClick={() => navigate('/cart')} className={styles.iconView}>
            <FaBagShopping className={styles.icon} />
            <div className={styles.viewCount}>
                {arrId?.length}
            </div>
        </div>
    )
}
