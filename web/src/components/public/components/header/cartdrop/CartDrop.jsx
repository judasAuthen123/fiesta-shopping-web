import React, { useContext, useEffect, useState } from 'react'
import styles from './CartDrop.module.css'
import { FaBagShopping } from 'react-icons/fa6'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { arrCart, isNeedGetCategory } from '../../../../redux/selector'
import AxiosInstance from './../../../../../util/AxiosInstance';
import { AppContext } from '../../../../../util/AppContext'
import { cartSlice } from './cartSlice'
const CartDrop = () => {
    const navigate = useNavigate()
    const { dataUser } = useContext(AppContext)
    const arrId = useSelector(arrCart)
    const alreadyStart = useSelector(isNeedGetCategory)
    const dispatch = useDispatch()
    useEffect(() => {
        console.log(alreadyStart);
        if (!alreadyStart) {
            const getCart = async () => {
                try {
                    const response = await AxiosInstance.get(`/cart/getBypage/1/${dataUser?._id}`)
                    console.log(response);

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
        }
    }, [dataUser?._id, dispatch])
    return (
        <div onClick={() => navigate('/cart')} className={styles.iconView}>
            <FaBagShopping className={styles.icon} />
            <div className={styles.viewCount}>
                {arrId?.length}
            </div>
        </div>
    )
}
export default React.memo(CartDrop)
