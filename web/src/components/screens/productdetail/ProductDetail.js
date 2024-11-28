import React, { useContext, useEffect, useState } from 'react'
import styles from './ProductDetail.module.css'
import Header from '../../public/components/header/Header'
import Footer from '../../public/components/footer/Footer'
import { FaStar } from 'react-icons/fa'
import ColorList from './colorVariations/ColorList'
import SizeList from './sizeVaritations/SizeList'
import { useLocation } from 'react-router-dom'
import AxiosInstance from './../../../util/AxiosInstance';
import { CiHeart } from 'react-icons/ci'
import Dialog from '../../public/components/dialog/Dialog'
import PlusAndMinus from './service/plusminus/PlusAndMinus'
import { AppContext } from '../../../util/AppContext'
import PolicyFooter from './../../public/components/footer/PolicyFooter';
import { useTranslation } from 'react-i18next'
import { validateAddToCart } from './validation'
import FiestaAlert from '../../public/components/dialog/FiestaAlert'
export default function ProductDetail() {
    const location = useLocation()
    const { id } = location.state || {}
    const [product, setProduct] = useState({})
    const [colorList, setColorList] = useState([])
    const [sizeList, setSizeList] = useState([])
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [colorSelected, setColorSelected] = useState(null);
    const [sizeSelected, setSizeSelected] = useState(null)
    const [selectedVariation, setSelectedVariation] = useState(null)
    const [countBuy, setCountBuy] = useState(null)
    const [errors, setErros] = useState(null)
    const { dataUser } = useContext(AppContext)
    const [imagesProduct, setImagesProduct] = useState([])
    const [avatarProduct, setAvatarProduct] = useState(null)
    const [isVisbileAlert, setIsVisibleAlert] = useState(false)
    const { t } = useTranslation()
    const onChangeQuantity = (count) => {
        setCountBuy(count)
    }
    const ctgName = t('MongoTranslator.nameCtg')
    useEffect(() => {
        setErros(null)
        if ((colorSelected || colorList.length === 0) && (sizeSelected || sizeList.length === 0)) {
            if (product.variations && Array.isArray(product.variations)) {
                const matchedVariation = product.variations.find((item) => {
                    const isSizeMatch = !sizeSelected || item.dimension.size === sizeSelected;
                    const isColorMatch = !colorSelected || item.dimension.color === colorSelected;
                    return isSizeMatch && isColorMatch;
                });
                setSelectedVariation(matchedVariation)
            }
        }
    }, [sizeSelected, colorSelected, id, sizeList.length, colorList.length, product?.variations])

    const addToCart = () => {
        if (dataUser) {
            const addProductToCart = async () => {
                try {
                    const validateFields = {
                        sizeSelected: sizeSelected, 
                        colorSelected: colorSelected, 
                        sizeList: sizeList, 
                        colorList: colorList, 
                        selectedVariation: selectedVariation, 
                        variation: product?.variations.length > 0
                    }
                    const err = validateAddToCart(validateFields)
                    if (!err) {
                        const response = await AxiosInstance.post('/cart/add', {
                            addFields: {
                                userId: dataUser?._id,
                                productId: id,
                                variationId: selectedVariation?._id,
                                quantity: countBuy
                            }
                        });
                        if (response.result === true) {
                            setIsModalVisible(true);
                        }
                    } else {
                        setErros(err)
                        console.log(err);
                        
                    }
                } catch (error) {
                    console.error(error);
                }
            };
            addProductToCart();
        } else {
            setIsVisibleAlert(true)
        }

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
            <FiestaAlert isVisible={isVisbileAlert} label={t('Components.alert.needLogin')} onClose={setIsVisibleAlert} />
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
                                            <img src={item.url} alt='' />
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
                        <div className={styles.viewVariations}>
                            <ColorList data={colorList} onChange={setColorSelected} />
                            <SizeList data={sizeList} onChange={setSizeSelected} />
                            <div className={styles.viewError}></div>
                            {
                                errors?.selectedVariation && <p className={styles.txtErr}>{errors.selectedVariation.message[ctgName]}</p>
                            }
                        </div>
                        <div className={styles.viewBuy}>
                            <PlusAndMinus onChange={onChangeQuantity} />
                            <button onClick={addToCart}>{t('ProductDetail.buttonAddToCard')}</button>
                            <div className={styles.viewIcon}>
                                <CiHeart className={styles.icon} />
                            </div>
                            <div>
                                {
                                    selectedVariation?.stock || selectedVariation?.stock === 0 ?
                                        <div style={{ fontSize: 14, textAlign: 'end' }}>{t('ProductDetail.stock')}: {selectedVariation?.stock} </div> : null
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
