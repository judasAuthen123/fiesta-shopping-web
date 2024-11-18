import React, { useContext, useEffect, useState, useCallback } from 'react'
import styles from './ProductDetail.module.css'
import Header from '../../public/components/header/Header'
import Footer from '../../public/components/footer/Footer'
import { FaStar } from 'react-icons/fa'
import ColorList from './colorVariations/ColorList'
import SizeList from './sizeVaritations/SizeList'
import { useParams } from 'react-router-dom'
import AxiosInstance from './../../../util/AxiosInstance';
import { CiHeart } from 'react-icons/ci'
import Dialog from '../../public/components/dialog/Dialog'
import PlusAndMinus from './service/plusminus/PlusAndMinus'
import { AppContext } from '../../../util/AppContext'
import PolicyFooter from './../../public/components/footer/PolicyFooter';
import { useTranslation } from 'react-i18next'
export default function ProductDetail() {
    const { id } = useParams();
    const [product, setProduct] = useState({})
    const [colorList, setColorList] = useState([])
    const [sizeList, setSizeList] = useState([])
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [colorSelected, setColorSelected] = useState(null);
    const [sizeSelected, setSizeSelected] = useState(null)
    const [variationStock, setVariationStock] = useState(null)
    const [variationId, setVariationId] = useState(null)
    const [countBuy, setCountBuy] = useState(null)
    const { dataUser } = useContext(AppContext)
    const [imagesProduct, setImagesProduct] = useState([])
    const [avatarProduct, setAvatarProduct] = useState(null)
    const { t } = useTranslation()
    const onChangeQuantity = (count) => {
        setCountBuy(count)
    }

    const checkVariationStock = useCallback(async () => {
        console.log('variation checked');

        const response = await AxiosInstance.get('/productApi/checkVaritationProductStock', {
            params: { id: id, size: sizeSelected, color: colorSelected }
        });

        if (response.result === true) {
            setVariationId(response.data._id);
            setVariationStock(response.data.stock);
        }
    }, [id, sizeSelected, colorSelected]);

    useEffect(() => {
        if ((colorSelected || colorList.length === 0) && (sizeSelected || sizeList.length === 0)) {
            checkVariationStock()
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
                } else {
                    alert("Thiếu thông tin sản phẩm");
                }
            } catch (error) {
                console.error("Error adding product to cart:", error);
            }
        };
        addProductToCart();
    };

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'auto'
        })
    }, [])

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
                if (response.data) {
                    setProduct(response.data)
                    setImagesProduct(response.data.images)
                    setAvatarProduct(response.data.images[0].url)
                }
                if (response.data.variations?.length > 0) {
                    response.data.variations.forEach(variation => {
                        const color = variation.dimension.color;
                        const size = variation.dimension.size;

                        if (!colorArray.includes(color) && color) {
                            colorArray.push(color);
                        }

                        if (!sizeArray.includes(size) && size) {
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
            <Dialog isVisible={isModalVisible} status={t('ProductDetail.dialogAddToCard')} />
            <div className={styles.box}>
                <div className={styles.layoutContent}>
                    <div className={styles.imgProduct}>
                        <div className={styles.viewAvatarProduct}>
                            <img src={avatarProduct} alt='' />
                        </div>
                        <div className={styles.viewListImg}
                            onMouseLeave={() => setAvatarProduct(imagesProduct[0].url)}>
                            {
                                imagesProduct && imagesProduct.length > 0 ?
                                    imagesProduct.slice(1).map((item) =>
                                        <div
                                            key={item.id}
                                            onMouseEnter={() => setAvatarProduct(item.url)}
                                            className={styles.itemImg}>
                                            <img src={item.url} />
                                        </div>) : null
                            }
                        </div>
                    </div>
                    <div className={styles.productDetail}>
                        <div>
                            <p style={{ fontSize: 20, fontWeight: 600 }}>{product.Brand}</p>
                            <div className={styles.viewStatus}>
                                {
                                    product.stock && product.stock > 0 ?
                                        <div className={`${styles.viewStatus} ${styles.inStock}`}>
                                            <div>{t('ProductDetail.status.inStock')}</div>
                                        </div> :
                                        <div className={`${styles.viewStatus} ${styles.outStock}`}>
                                            <div>{t('ProductDetail.status.outStock')}</div>
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
                            In this article, we’ll dive into the art of writing product descriptions for your online store. We’ll also go over 10 product description examples that can help get you started.

                            Whether you’re just starting out or looking to revamp your current listings, these tips will help you create your own product descriptions that not only inform but also entice.
                        </div>
                        <ColorList data={colorList} onChange={onChangeColor} />
                        <SizeList data={sizeList} onChange={onChanSize} />
                        <div className={styles.viewBuy}>
                            <PlusAndMinus onChange={onChangeQuantity} />
                            <button onClick={addToCart}>{t('ProductDetail.buttonAddToCard')}</button>
                            <div className={styles.viewIcon}>
                                <CiHeart className={styles.icon} />
                            </div>
                            <div>
                                {
                                    variationStock !== null ?
                                        <div style={{ fontSize: 14, textAlign: 'end' }}>Stock: {variationStock} </div> : null
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.details}>
                    <div>
                        <p>
                            {t('ProductDetail.description')}
                        </p>
                        <p>
                            Product descriptions help visitors understand why a product is a good choice for them. Ecommerce business owners often make the mistake of thinking that their visitors have a similar level of understanding of the product as they do, so they simply list the product features or specs.

                            But most visitors don’t understand any of that, which means that it’s your job to package the product in a way that creates desire.
                        </p>
                    </div>
                    <div>
                        <p>
                            {t('ProductDetail.addtionalInfo')}
                        </p>
                        <div>
                            {
                                colorList.length > 0 ?
                                    <div style={{ display: 'flex', columnGap: 15, fontSize: 13 }}>
                                        Color:
                                        {
                                            colorList.map(item => <div key={item}>{item}</div>)
                                        }
                                    </div> : null
                            }
                            {
                                sizeList.length > 0 ?
                                    <div style={{ display: 'flex', columnGap: 15, fontSize: 13 }}>
                                        Size:
                                        {
                                            sizeList.map(item => <div key={item}>{item}</div>)
                                        }
                                    </div> : null
                            }
                        </div>
                    </div>
                </div>
            </div>
            <PolicyFooter />
            <Footer />
        </div>
    )
}
