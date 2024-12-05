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
import _, { } from 'lodash';
import { LuFilter } from "react-icons/lu";
import AxiosInstance from './../../../util/AxiosInstance';
import { useLocation } from 'react-router-dom';
import ItemCategory from './categories/ItemCategory';
import PaginationsBar from './pagination/PaginationsBar';
import { useTranslation } from 'react-i18next';
import InputSearch from './filters/InputSearch';
import { RxCaretSort } from 'react-icons/rx';
import MovePageAccess from './pagination/MovePageAccess';
import ShineProductListLoading from '../../public/components/loading/shineLoading/ShineProductListLoading';
import { debounce } from 'lodash';
import PolicyFooter from '../../public/components/footer/PolicyFooter';
import { PiSmileyXEyesBold } from 'react-icons/pi';
import SortList from './sort/SortList';
import BackToTopButton from '../../public/components/button/BackToTopButton';
function ShopByCategories() {
    const { t } = useTranslation()
    const location = useLocation()
    const { id } = location.state || {}
    const [documents, setDocuments] = useState(null)
    const [productList, setProductList] = useState([])
    const filters = useSelector(filterSelectedForShopByCategory)
    const currentFilters = useSelector(currentFilterSelectedForShopByCategory)
    const [categoryName, setCategoryName] = useState({})
    const [subCategoryList, setSubCategoryList] = useState([])
    const [loading, setLoading] = useState(false)
    const [sideAction, setSideAction] = useState(false)
    const [sizeResponsive, setSizeResponsive] = useState(window.innerWidth <= 800)
    const ctgName = t('MongoTranslator.nameCtg')
    const dispatch = useDispatch()





    const searchProduct = async () => {
        try {
            setLoading(true)
            const newFilters = {
                ...filters, category: {
                    ...filters.category, mainCategory: id
                }
            }
            const response = await AxiosInstance.get(`/productApi/searchProducts`, {
                params: newFilters
            })
            if (response.data) {
                setProductList(response.data)
                setDocuments(response.documents)
                setLoading(false)
            }
        } catch (error) {
            console.log(error);
            setLoading(false)
        }
    }
    const debounceSearchProduct = useMemo(() => debounce(searchProduct, 20), [filters])
    useEffect(() => {
        if (location.pathname === '/shop-category') {
            sessionStorage.setItem('fromShopCategory', 'true')
        }
    }, [location, dispatch])


    useEffect(() => {
        setSideAction(false)
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }, [filters])

    const pages = Math.ceil(documents / filters.limit)

    useEffect(() => {
        if (id) {
            const getCategoryByID = async () => {
                const response = await AxiosInstance.get('/category/getCategoryByID?id=' + id)
                if (response.result === true && response.data) {
                    setCategoryName(response.data.name)
                    setSubCategoryList(response.data.subCategory)
                }
            }
            getCategoryByID()
        }
    }, [id])

    const onChangeFilters = useCallback(async () => {
        dispatch(filtersSlice.actions.onApplySearchFields())
    }, [dispatch])

    // main searchProduct fuction here
    useEffect(() => {
        debounceSearchProduct();
    }, [debounceSearchProduct]);


    useEffect(() => {
        const handlerSideAction = debounce(() => {
            if (window.innerWidth > 800) {
                setSideAction(false)
                setSizeResponsive(false)
            } else {
                setSizeResponsive(true)
            }
        }, 20)
        window.addEventListener('resize', handlerSideAction)
        return () => window.removeEventListener('resize', handlerSideAction)
    }, [])

    const isFilterChange = _.isEqual(filters, currentFilters)

    return (
        <div className={`${styles.container} ${sideAction ? styles.containerOverflow : ''}`}>
            <BackToTopButton />
            <Header />
            {sideAction && sizeResponsive && <div className={styles.containerSidebar} onClick={() => setSideAction(false)}></div>}
            <div className={styles.box} style={{ marginTop: 50, marginBottom: 30 }}>
                <div className={styles.title}>
                    {t('Shop.home')} <GrNext className={styles.icon} /> {t('Shop.shop')} <GrNext className={styles.icon} /> {categoryName?.[ctgName]}
                    <div className={styles.boxFilterDisplayButton} onClick={() => setSideAction(true)}>
                        <LuFilter size={20} /> {t('Shop.filter.title')}
                    </div>
                </div>

            </div>
            <div className={styles.box} style={{ marginTop: 0 }}>
                <div className={styles.layoutContent}>
                    <div className={`${styles.boxFilter} ${sideAction ? styles.show : ''}`}>
                        <div className={styles.filterTitle}>
                            {t('Shop.filter.title')} <LuFilter size={20} />
                        </div>
                        <div className={styles.boxSubCategory}>
                            <p>{t('Shop.filter.categories')}</p>
                            {
                                subCategoryList && subCategoryList.length > 0 ?
                                    subCategoryList.map(item =>
                                        <ItemCategory key={item._id} name={item.name?.[ctgName]} id={item._id} />
                                    ) : null
                            }
                        </div>
                        <div className={styles.line} />
                        <BoxFilter label={t('Shop.filter.price')} filterMethod={'price'} />
                        <div className={styles.line} />
                        <button onClick={onChangeFilters} disabled={isFilterChange}
                            style={
                                isFilterChange ?
                                    { background: 'grey' } :
                                    { background: 'black' }
                            }>Apply
                        </button>
                    </div>
                    <div className={styles.boxProducts}>
                        <div className={styles.headBoxProducts}>
                            <InputSearch />
                            <div className={styles.layoutShowing}>
                                <div className={styles.layoutShowing1}>
                                    <div className={styles.viewTitleSort}>
                                        <RxCaretSort size={20} /> {t('Shop.filter.sortBy')}
                                    </div>
                                    <SortList />
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
                                                ) : <div className={styles.viewNoResult}>
                                                    <PiSmileyXEyesBold size={25} /> {t('Shop.noResult')}
                                                </div>
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
export default React.memo(ShopByCategories)