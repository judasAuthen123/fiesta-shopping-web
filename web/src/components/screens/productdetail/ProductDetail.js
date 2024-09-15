import React, { useContext, useEffect, useState } from 'react'
import styles from './ProductDetail.module.css'
import Header from '../../public/components/header/Header'
import Footer from '../../public/components/footer/Footer'
import { FaStar } from 'react-icons/fa'
import ColorList from './colorVariations/ColorList'
import SizeList from './sizeVaritations/SizeList'
import { useParams } from 'react-router-dom'
import AxiosInstance from './../../../util/AxiosInstance';
import image from '../../assets/images/th.png'
import { CiHeart } from 'react-icons/ci'
import Dialog from '../../public/components/dialog/Dialog'
import PlusAndMinus from './service/plusminus/PlusAndMinus'
import { AppContext } from '../../../util/AppContext'
export default function ProductDetail() {
    const { id } = useParams();
    const [product, setProduct] = useState({})
    const [colorList, setColorList] = useState([])
    const [sizeList, setSizeList] = useState([])
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [colorSelected, setColorSelected] = useState(null);
    const [sizeSelected, setSizeSelected] = useState(null)
    const [variationStock, setVariationStock] = useState(null)
    const [variationId, setVariationId] = useState('')
    const [countBuy, setCountBuy] = useState(null)
    const {dataUser} = useContext(AppContext)


    const onChangeQuantity = (count) => {
        setCountBuy(count)
    }

    useEffect(() => {
        if (sizeSelected || colorSelected) {
            const checkVariattionStock = async () => {
                const response = await AxiosInstance.get('/productApi/checkVaritationProductStock', { params: { id: id, size: sizeSelected, color: colorSelected } })
                console.log(response);
                if (response.result === true) {
                    if (response.data) {
                        setVariationId(response.data._id)
                        setVariationStock(response.data.stock)
                    }
                }
            }
            checkVariattionStock()
        }
    }, [sizeSelected, colorSelected, id])


    const onChangeColor = (color) => {
        setColorSelected(color)
    }


    const onChanSize = (size) => {
        setSizeSelected(size)
    }

    const addToCart = () => {
        const hasColorVariation = product.variations?.dimension?.color;
        const hasSizeVariation = product.variations?.dimension?.size;

        if (variationStock === 0) {
            alert("Sản phẩm đã hết hàng");
            return false;
        }

        if (hasColorVariation && colorSelected === null) {
            alert("Vui lòng chọn loại phân hàng");
            return false;
        }

        if (hasSizeVariation && sizeSelected === null) {
            alert("Vui lòng chọn loại phân hàng");
            return false;
        }

        if (countBuy === 0) {
            alert("Vui lòng chọn số lượng phù hợp");
            return false
        }
        const addProductToCart = async () => {
            try {
                if (id, variationId) {
                    const response = await AxiosInstance.post('/cart/add', {
                        addFields: {
                            userId: dataUser?._id,
                            productId: id,
                            variationId: variationId,
                            quantity: countBuy
                        }
                    });
                    if (response.result === true) {
                        setIsModalVisible(true);
                    } else {
                        alert("Không thể thêm sản phẩm vào giỏ hàng. Vui lòng thử lại.");
                    }
                }else {
                    alert("Thiếu thông tin sản phẩm");
                }
            } catch (error) {
                console.error("Error adding product to cart:", error);
            }
        };
        addProductToCart();
    };


    useEffect(() => {
        if (isModalVisible) {
            const timer = setTimeout(() => {
                setIsModalVisible(false);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [isModalVisible]);



    // process product data
    useEffect(() => {
        const colorArray = []
        const sizeArray = []
        const getProductByID = async () => {
            const response = await AxiosInstance.get('/productApi/getProductByID?id=' + id)
            if (response.result === true) {
                if (response.data)
                    setProduct(response.data)
                if (response.data.variations?.length > 0) {
                    response.data.variations.forEach(variation => {
                        const color = variation.dimension.color;
                        const size = variation.dimension.size;

                        if (!colorArray.includes(color) && color != null) {
                            colorArray.push(color);
                        }

                        if (!sizeArray.includes(size) && size != null) {
                            sizeArray.push(size);
                        }
                    });
                    setColorList(colorArray)
                    setSizeList(sizeArray)
                }
            } else {
                console.log('getProductByID failed');
            }
        }
        getProductByID()
    }, [id])
    return (
        <div className={styles.container}>
            <Header />
            <Dialog isVisible={isModalVisible} status={'Sản phẩm đã được thêm vào giỏ hàng'}/>
            <div className={styles.box}>
                <div className={styles.layoutContent}>
                    <div className={styles.imgProduct}>
                        <div style={{ backgroundColor: '#f9f9f9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <img style={{ width: 280, height: 400 }} src={image} alt='' />
                        </div>
                        <div>
                        </div>
                    </div>
                    <div className={styles.productDetail}>
                        <div>
                            <p style={{ fontSize: 20, fontWeight: 600 }}>YK Disney</p>
                            <div className={styles.viewStatus}>
                                {
                                    product.stock && product.stock > 0 ?
                                        <div className={`${styles.viewStatus} ${styles.inStock}`}>
                                            <div>In Stock</div>
                                        </div> :
                                        <div className={`${styles.viewStatus} ${styles.outStock}`}>
                                            <div>Inprocess</div>
                                        </div>
                                }
                            </div>
                        </div>
                        <p>
                            {product.name}
                        </p>
                        <div className={styles.viewRating}>
                            <div className={styles.viewStarRating}>
                                <FaStar className={styles.icon} />
                                <FaStar className={styles.icon} />
                                <FaStar className={styles.icon} />
                                <FaStar className={styles.icon} />
                                <FaStar className={styles.icon} />
                            </div>
                            <div className={styles.reviewCount}>
                                5.0 (121 Reviews)
                            </div>
                        </div>
                        <p>
                            ${product.price}.00
                        </p>
                        <div className={styles.discription}>
                            its a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Lpsum is that it has a more-or-less normal distribution of letters
                        </div>
                        <ColorList data={colorList} onChange={onChangeColor} />
                        <SizeList data={sizeList} onChange={onChanSize} />
                        <div className={styles.viewBuy}>
                            <PlusAndMinus onChange={onChangeQuantity} />
                            <button onClick={addToCart}>Add to Cart</button>
                            <div className={styles.viewIcon}>
                                <CiHeart className={styles.icon} />
                            </div>
                            <div>
                                {
                                    variationStock ?
                                        <div style={{ fontSize: 14, textAlign: 'center' }}>Stock: {variationStock} </div> : null
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}
