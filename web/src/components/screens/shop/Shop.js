import React, { useCallback, useEffect, useMemo, useState } from 'react'
import styles from './Shop.module.css'
import Header from '../../public/components/header/Header'
import Footer from '../../public/components/footer/Footer'
import { GrNext } from "react-icons/gr";
import BoxFilter from './filters/BoxFilter';
import ItemProduct from '../../public/components/product/ItemProduct';
import { useDispatch, useSelector } from 'react-redux';
import { currentFilterSelectedForShopByCategory, filterSelectedForShopByCategory } from '../../redux/selector';
import filtersSlice from './filters/filtersSlice';
import _ from 'lodash';
import { LuFilter } from "react-icons/lu";
import { RxCaretSort } from "react-icons/rx";
import AxiosInstance from './../../../util/AxiosInstance';
import PaginationsBar from './pagination/PaginationsBar';
import { useTranslation } from 'react-i18next';
import InputSearch from './filters/InputSearch';
import { sortArray } from './filters/sortData';
import MovePageAccess from './pagination/MovePageAccess';
import { useLocation } from 'react-router-dom';
import { debounce } from 'lodash';
import ShineProductListLoading from '../../public/components/loading/shineLoading/ShineProductListLoading';
import PolicyFooter from '../../public/components/footer/PolicyFooter';
function Shop() {
    const location = useLocation()
    const { t } = useTranslation()
    const [documents, setDocuments] = useState(null)
    const [productList, setProductList] = useState([])
    const filters = useSelector(filterSelectedForShopByCategory)
    const currentFilters = useSelector(currentFilterSelectedForShopByCategory)
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        /* 
        Check if the user navigated back to /shop from /shop-category.
        - If the user visits /shop-category, store a confirmation status in sessionStorage.
        - If the user returns to /shop and the confirmation status exists, resetFilters and remove the status from sessionStorage.
        */
        if (location.pathname === '/shop' && sessionStorage.getItem('fromShopCategory') === 'true') {
            dispatch(filtersSlice.actions.resetFilters());

            sessionStorage.removeItem('fromShopCategory')
        }
    }, [location, dispatch])

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }, [filters])

    const searchProduct = async () => {
        try {
            console.log('searched');

            setLoading(true)
            const { category, ...destroyCategory } = filters;
            const response = await AxiosInstance.get(`/productApi/searchProducts`, {
                params: destroyCategory
            });
            if (response.data) {
                setProductList(response.data);
                setDocuments(response.documents);
                setLoading(false)
            }
        } catch (error) {
            console.log(error);
            setLoading(false)
        }
    }


    const debounceSearchProduct = useMemo(() => debounce(searchProduct, 20), [filters])


    const sortNameLabel = t('MongoTranslator.nameCtg')
    const pages = (Math.ceil(documents / filters?.limit));



    const onChangeFilters = useCallback(async () => {
        dispatch(filtersSlice.actions.onApplySearchFields())
    }, [dispatch])


    // main searchProduct fuction here
    useEffect(() => {
        debounceSearchProduct()
    }, [debounceSearchProduct]);


    const onChangeSortBy = debounce((data) => {
        const { sortBy, sortOrder } = data
        const sortData = { sortBy, sortOrder }
        dispatch(filtersSlice.actions.onChangeSort(sortData))
    }, 300)


    const isFilterChange = _.isEqual(filters, currentFilters)


    return (
        <div className={styles.container}>
            <Header />
            <div className={styles.box} style={{ marginTop: 50, marginBottom: 30 }}>
                <div className={styles.title}>
                    {t('Shop.home')} <GrNext className={styles.icon} /> {t('Shop.shop')}
                </div>
            </div>
            <div className={styles.box} style={{ marginTop: 0, marginBottom: 0 }}>
                <div className={styles.viewSearch}>
                    <div className={styles.filterTitle}>
                        {t('Shop.filter.title')} <LuFilter size={20} />
                    </div>
                    <InputSearch />
                </div>
            </div>
            <div className={styles.box} style={{ marginTop: 0 }}>
                <div className={styles.layoutContent}>
                    <div className={styles.boxFilter}>
                        <BoxFilter label={t('Shop.filter.categories')} filterMethod={'categories'} />
                        <div className={styles.line} />
                        <BoxFilter label={t('Shop.filter.price')} filterMethod={'price'} />
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
                                    <div>
                                        <RxCaretSort size={20} /> {t('Shop.filter.sortBy')}
                                    </div>
                                    <div className={styles.viewDataSort}>
                                        {
                                            sortArray && sortArray.map(item =>
                                                <div
                                                    key={item.name.viName}
                                                    className={`${currentFilters?.sortBy === item.formattedObject.value &&
                                                        currentFilters?.sortOrder === item.formattedObject.order ? styles.sortIn : styles.sortOut}`}
                                                    onClick={() => onChangeSortBy(item, 400)}> {item.name[sortNameLabel]} </div>
                                            )
                                        }
                                    </div>
                                </div>
                                <div className={styles.layoutShowing2}>
                                    <MovePageAccess pages={pages} loading={loading} />
                                </div>
                            </div>
                            {
                                loading ? <ShineProductListLoading /> :
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
                            }

                            <PaginationsBar pages={pages} />
                        </div>
                    </div>
                </div>
            </div>
            <PolicyFooter />
            <Footer />
        </div>
    )
}
export default React.memo(Shop)
