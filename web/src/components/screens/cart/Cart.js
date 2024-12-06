import React, { useCallback, useContext, useEffect, useState } from 'react'
import Header from '../../public/components/header/Header'
import Footer from '../../public/components/footer/Footer'
import styles from './Cart.module.css'
import ItemCart from './ItemCart';
import AxiosInstance from './../../../util/AxiosInstance';
import Dialog from '../../public/components/dialog/Dialog';
import { Link, useNavigate } from 'react-router-dom';
import ErrorDialog from './ErrorDialog';
import { AppContext } from '../../../util/AppContext';
import PolicyFooter from '../../public/components/footer/PolicyFooter';
import { PiSmileyXEyesBold } from "react-icons/pi";
import { useTranslation } from 'react-i18next';
import CircleLoading from './../../public/components/loading/CircleLoading';
import { useDispatch } from 'react-redux';
import { cartSlice } from '../../public/components/header/cartdrop/cartSlice';
export default function Cart() {
    const [cartList, setCartList] = useState([])
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [selectedItems, setSelectedItems] = useState([])
    const [selectedAll, setSelectedAll] = useState(false)
    const [total, setTotal] = useState(0)
    const [totalItem, setTotalItem] = useState(0)
    const [loading, setLoading] = useState(false)
    const { dataUser } = useContext(AppContext)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [errorDialogVisible, setErrorDialogVisible] = useState(false)
    const { t } = useTranslation()

    useEffect(() => {
        const getCart = async () => {
            try {
                setLoading(true)
                const response = await AxiosInstance.get(`/cart/getBypage/1/${dataUser?._id}`)
                if (response.result) {
                    if (response.data) {
                        setCartList(response.data.result)
                        setLoading(false)
                    }
                }
            } catch (error) {
                console.log(error);            
            }

        }
        getCart()
    }, [dataUser?._id])


    useEffect(() => {
        if (isModalVisible) {
            const timer = setTimeout(() => {
                setIsModalVisible(false);
            }, 1800);
            return () => clearTimeout(timer);
        }
    }, [isModalVisible]);


    const deleteCartItem = useCallback((_idCart) => {
        const request = async () => {
            const response = await AxiosInstance.post('/cart/delete?cartID=' + _idCart);
            if (response.result) {
                setCartList(prevCartList => {
                    return prevCartList.filter(item => item._id !== _idCart)
                })
                setIsModalVisible(prev => !prev)
                setSelectedItems(prevSelectedItems =>
                    prevSelectedItems.filter(item => item !== _idCart)
                );
                dispatch(cartSlice.actions.onChangeDataCart({
                    updateType: "remove",
                    _id: _idCart
                }))
            }
        };
        request();
    }, [])


    const handleCheck = (_idCart) => {
        setSelectedItems(prevItems => {
            if (prevItems.includes(_idCart)) {
                return prevItems.filter(_id => _id !== _idCart);
            } else {
                return [...prevItems, _idCart];
            }
        });
    };


    useEffect(() => {
        if (cartList && cartList.length > 0) {
            const selectedProducts = cartList.filter(product => selectedItems.includes(product._id));
            setTotal(prevTotal => {
                const totalPrice = selectedProducts.reduce((sum, product) => {
                    if (Array.isArray(product.products.variations) && product.products.variations.length > 0) {
                        return sum + (product.products.variations[0].price * product.quantity);
                    }
                    return sum + (product.products.price * product.quantity);
                }, 0);
                return totalPrice;
            })
            // Tính tổng số lượng sản phẩm
            setTotalItem(prevTotalItem => {
                const totalQuantity = selectedProducts.reduce((sum, product) => {
                    return sum + product.quantity; // Sửa ở đây, trả giá trị tổng
                }, 0);
                return totalQuantity;
            });
        }
    }, [selectedItems, cartList, selectedAll])


    const checkAll = () => {
        setSelectedAll(prev => !prev);
        setSelectedItems(prev => {
            if (cartList && cartList.length > 0) {
                if (!selectedAll) {
                    return cartList.map(item => item._id);
                } else {
                    return [];
                }
            }
            return prev;
        });
    }

    const moveToCheckout = () => {
        if (selectedItems.length > 0) {
            navigate('/checkout', { state: { selectedItems, productTotal: selectedItems.length, total, totalItem } })
        } else {
            setErrorDialogVisible(true)
        }

    }

    const updateCheckoutData = (newQuantity, id) => {
        const updatedCartList = cartList.map(item =>
            item._id === id ? { ...item, quantity: newQuantity } : item
        );
        setCartList(updatedCartList);
    };

    return (
        <div className={styles.container}>
            <Header />
            <Dialog isVisible={isModalVisible} status={'Đã xóa sản phẩm khỏi giỏ hàng'} />
            <ErrorDialog isVisible={errorDialogVisible} onClose={setErrorDialogVisible} />
            <div className={styles.box} style={{ marginTop: 80 }}>
                <div className={styles.title} style={{ paddingBottom: 40 }}>
                    {t('Cart.title')}
                </div>
            </div>
            <div className={styles.box} style={{ marginBottom: 120 }}>
                <div className={styles.layoutContent}>
                    <table cellPadding="5" cellSpacing="0" border="1">
                        <thead>
                            <tr>
                                <th style={{ display: 'flex', alignItems: 'center', columnGap: 11 }}><input style={{ width: 15, height: 15 }} type='checkbox' onChange={checkAll} checked={selectedAll} /> {t('Cart.products')}</th>
                                <th>{t('Cart.unitPrice')}</th>
                                <th>{t('Cart.quantity')}</th>
                                <th>{t('Cart.subTotal')}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                !loading ? (cartList && cartList.length > 0 ?
                                    cartList.map(item =>
                                        <ItemCart key={item._id}
                                            data={item}
                                            onDelete={deleteCartItem}
                                            onCheck={handleCheck}
                                            checkAll={selectedAll}
                                            onRefreshDataCheckout={updateCheckoutData} />
                                    ) : <div className={styles.viewNoneCart} style={{ display: 'flex', flexDirection: 'column' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', columnGap: 10 }}>
                                            <PiSmileyXEyesBold size={40} /> {t('Cart.listEmpty')}
                                        </div>
                                        <Link to={'/shop'}>{t('Cart.shoppingnow')}</Link>
                                    </div>
                                ) :
                                    <div className={styles.viewNoneCart}>
                                        <CircleLoading width={30} height={30} /> {t('Loading.title')}
                                    </div>

                            }

                        </tbody>
                    </table>
                    <div className={styles.barCheckout}>
                        <div style={{ padding: 10 }}>
                            <div style={{ display: 'flex', alignItems: 'center', columnGap: 11 }}>
                                <input style={{ width: 15, height: 15 }} type='checkbox' onChange={checkAll} checked={selectedAll} />
                                {t('Cart.products')}</div>
                        </div>
                        <div className={styles.boxBuy}>
                            <div>
                                {t('Cart.total')} ({selectedItems.length}): ${total}
                            </div>
                            <button onClick={moveToCheckout}>
                                {t('Cart.checkout')}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <PolicyFooter />
            <Footer />
        </div>
    )
}
