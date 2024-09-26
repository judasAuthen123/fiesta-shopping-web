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
import _, {} from 'lodash';
import AxiosInstance from './../../../util/AxiosInstance';
import { useParams } from 'react-router-dom';
import ItemCategory from './categories/ItemCategory';
import PaginationsBar from './pagination/PaginationsBar';
function ShopByCategories() {
    const { id } = useParams()
    const [documents, setDocuments] = useState(null)
    const [productList, setProductList] = useState([])
    const filters = useSelector(filterSelectedForShopByCategory)
    const currentFilters = useSelector(currentFilterSelectedForShopByCategory)
    const [categoryName, setCategoryName] = useState('')
    const [subCategoryList, setSubCategoryList] = useState([])
    // const productList = useSelector(productListSelected)
    const dispatch = useDispatch()
    const searchProduct = useCallback(async () => {
        const response = await AxiosInstance.get(`/productApi/searchProducts`, {
            params: filters
        })
        if (response.data) {
            setProductList(response.data)
            setDocuments(response.documents)
        }
    }, [filters])
    const pages = Math.ceil(documents/filters.limit)
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

    useEffect(() => {
        searchProduct();
    }, [searchProduct, filters]);

    const isFilterChange = _.isEqual(filters, currentFilters)

    return (
        <div className={styles.container}>
            <Header />
            <div className={styles.box}>
                <div className={styles.title}>
                Home <GrNext className={styles.icon} /> Shop <GrNext className={styles.icon} /> {categoryName}
                </div>
            </div>
            <div className={styles.box}>
                <div className={styles.layoutContent}>
                    <div className={styles.boxFilter}>
                        <div className={styles.boxSubCategory}>
                            <p>Product Categories</p>
                            {
                                subCategoryList && subCategoryList.length > 0 ?
                                    subCategoryList.map(item =>
                                        <ItemCategory key={item._id} name={item.name} id={item._id} />
                                    ) : null
                            }
                        </div>
                        <div className={styles.line} />
                        <BoxFilter label={'Filter by Price'} filterMethod={'price'} />
                        <div className={styles.line} />
                        <BoxFilter label={'Filter by Color'} />
                        <div className={styles.line} />
                        <BoxFilter label={'Filter by Size'} />
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
                            <div className={styles.layoutShowing}>
                                <div className={styles.layoutShowing1}>
                                    <div className={styles.iconView}>
                                        <CiGrid41 className={styles.icon} />
                                        <PiChartBarHorizontalThin className={styles.icon} />
                                    </div>
                                    <div>
                                        Showing 16 items of {documents} results
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
                            <PaginationsBar pages={pages}/>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}
export default React.memo(ShopByCategories)