import React, { useCallback, useEffect, useState } from 'react'
import styles from './Shop.module.css'
import Header from '../../public/components/header/Header'
import Footer from '../../public/components/footer/Footer'
import { GrNext } from "react-icons/gr";
import { CiGrid41 } from "react-icons/ci";
import { PiChartBarHorizontalThin } from "react-icons/pi";
import BoxFilter from './filters/BoxFilter';
import ItemProduct from '../../public/components/product/ItemProduct';
import { useDispatch, useSelector } from 'react-redux';
import { currentFilterSelectedForShopByCategory, filterSelectedForShopByCategory } from '../../redux/selector';
import filtersSlice from './filters/filtersSlice';
import _ from 'lodash';
import AxiosInstance from './../../../util/AxiosInstance';
import PaginationsBar from './pagination/PaginationsBar';
import { useTranslation } from 'react-i18next';
function Shop() {
    const {t} = useTranslation()
    const [documents, setDocuments] = useState(null)
    const [productList, setProductList] = useState([])
    const filters = useSelector(filterSelectedForShopByCategory)
    const currentFilters = useSelector(currentFilterSelectedForShopByCategory)
    const dispatch = useDispatch()
    const searchProduct = useCallback(async () => {
        const {category, ...destroyCategory} = filters
        const response = await AxiosInstance.get(`/productApi/searchProducts`, {
            params: destroyCategory
        })
        if (response.data) {
            setProductList(response.data)
            setDocuments(response.documents)
        }
    }, [filters])
    const pages = (Math.ceil(documents/filters.limit));
    const onChangeFilters = useCallback(async () => {
        dispatch(filtersSlice.actions.onApplySearchFields())
    }, [dispatch])

    useEffect(() => {
        searchProduct();
    }, [searchProduct, filters]);

    const isFilterChange = _.isEqual(filters, currentFilters)

    return (
        <div className={styles.container}>
            <Header />
            <div className={styles.box}>
                <div className={styles.title}>
                    {t('Shop.home')} <GrNext className={styles.icon} /> {t('Shop.shop')} 
                </div>
            </div>
            <div className={styles.box}>
                <div className={styles.layoutContent}>
                    <div className={styles.boxFilter}>
                        <BoxFilter label={t('Shop.filter.categories')} filterMethod={'categories'} />
                        <div className={styles.line} />
                        <BoxFilter label={t('Shop.filter.price')} filterMethod={'price'} />
                        <div className={styles.line} />
                        <BoxFilter label={t('Shop.filter.color')} />
                        <div className={styles.line} />
                        <BoxFilter label={t('Shop.filter.size')} />
                        <div className={styles.line} />
                        <button onClick={onChangeFilters} disabled={isFilterChange}
                            style={
                                isFilterChange ?
                                    { background: 'grey' } :
                                    { background: 'black' }
                            }>{t('Shop.filter.apply')}
                        </button>
                    </div>
                    <div className={styles.boxProducts}>
                        <div className={styles.headBoxProducts}>
                            <div className={styles.layoutShowing}>
                                <div className={styles.layoutShowing1}>
                                    <div className={styles.iconView}>
                                        <CiGrid41 className={styles.icon} />
                                        <PiChartBarHorizontalThin className={styles.icon} />
                                    </div>
                                    <div>
                                    {t('Shop.listShow.string1')} 16 {t('Shop.listShow.string2')} {documents} {t('Shop.listShow.string3')}
                                    </div>
                                </div>
                                <div className={styles.layoutShowing2}>

                                </div>
                            </div>
                            <div className={styles.viewProducts}>
                                {
                                    productList && productList.length > 0 ?
                                        productList.map(item =>
                                            <ItemProduct
                                                key={item._id}
                                                id={item._id}
                                                name={item.name}
                                                images={item.images}
                                                brand={item.Brand}
                                                price={item.price}
                                            />
                                        ) : null
                                }
                            </div>
                            <PaginationsBar pages={pages} />
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}
export default React.memo(Shop)
