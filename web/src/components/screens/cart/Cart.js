import React, { useCallback, useContext, useEffect, useState } from 'react'
import Header from '../../public/components/header/Header'
import Footer from '../../public/components/footer/Footer'
import styles from './Cart.module.css'
import ItemCart from './ItemCart';
import AxiosInstance from './../../../util/AxiosInstance';
import Dialog from '../../public/components/dialog/Dialog';
import { useNavigate } from 'react-router-dom';
import ErrorDialog from './ErrorDialog';
import { AppContext } from '../../../util/AppContext';
import PolicyFooter from '../../public/components/footer/PolicyFooter';
export default function Cart() {
    const [cartList, setCartList] = useState([])
    const [updateCart, setUpdateCart] = useState(false)
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [selectedItems, setSelectedItems] = useState([])
    const [selectedAll, setSelectedAll] = useState(false)
    const [total, setTotal] = useState(0)
    const [totalItem, setTotalItem] = useState(0)
    const {dataUser} = useContext(AppContext)
    const navigate = useNavigate()
    const [errorDialogVisible, setErrorDialogVisible] = useState(false)


    useEffect(() => {
        const getCart = async () => {
            const response = await AxiosInstance.get(`/cart/getBypage/1/${dataUser?._id}`)
            if (response.result) {
                if (response.data) {
                    setCartList(response.data.result)
                }
            }
        }
        getCart()
    }, [updateCart])


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
                setUpdateCart(prev => !prev);
                setIsModalVisible(prev => !prev)
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
        if(selectedItems.length > 0) {
            navigate('/checkout', { state: { selectedItems, productTotal: selectedItems.length, total, totalItem } })
        } else {
            setErrorDialogVisible(true)
        }
        
    }

    return (
        <div className={styles.container}>
            <Header />
            <Dialog isVisible={isModalVisible} status={'Đã xóa sản phẩm khỏi giỏ hàng'} />
            <ErrorDialog isVisible={errorDialogVisible} onClose={setErrorDialogVisible}/>
            <div className={styles.box}>
                <div className={styles.title}>
                    Your Cart
                </div>
            </div>
            <div className={styles.box}>
                <div className={styles.layoutContent}>
                    <table cellPadding="5" cellSpacing="0" border="1">
                        <thead>
                            <tr>
                                <th style={{ display: 'flex', alignItems: 'center', columnGap: 11 }}><input style={{ width: 15, height: 15 }} type='checkbox' onChange={checkAll} checked={selectedAll} /> Products</th>
                                <th>Unit Price</th>
                                <th>Quantity</th>
                                <th>Subtotal</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cartList && cartList.length > 0 ?
                                cartList.map(item =>
                                    <ItemCart key={item._id} data={item} onDelete={deleteCartItem} onCheck={handleCheck} checkAll={selectedAll} />
                                ) : null
                            }
                        </tbody>
                    </table>
                    <div className={styles.barCheckout}>
                        <div style={{padding:10}}>
                            <div style={{ display: 'flex', alignItems: 'center', columnGap: 11 }}>
                                <input style={{ width: 15, height: 15 }} type='checkbox' onChange={checkAll} checked={selectedAll} />
                                Products</div>
                        </div>
                        <div className={styles.boxBuy}>
                            <div>
                                Total ({selectedItems.length} items): ${total}
                            </div>
                            <button onClick={moveToCheckout}>
                                Checkout
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
