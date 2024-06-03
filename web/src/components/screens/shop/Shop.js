import React from 'react'
import styles from './Shop.module.css'
import Header from '../../public/components/header/Header'
import Footer from '../../public/components/footer/Footer'
import { GrNext } from "react-icons/gr";
import { CiGrid41 } from "react-icons/ci";
import { PiChartBarHorizontalThin } from "react-icons/pi";
import BoxFilter from './filters/BoxFilter';
import ItemProduct, { products } from '../../public/components/product/ItemProduct';
import { IoIosArrowDown } from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux';
import { filterSelected } from '../../redux/selector';
import filtersSlice from './filters/filtersSlice';
export default function Shop() {
    const dispatch = useDispatch();
    const selector = useSelector(filterSelected);
    const onChangeName = () => {
        console.log(selector);
    }
    return (
        <div className={styles.container}>
            <Header />
            <div className={styles.box}>
                <div className={styles.title}>
                    Shop <GrNext className={styles.icon} />
                </div>
            </div>
            <div className={styles.box}>
                <div className={styles.layoutContent}>
                    <div className={styles.boxFilter}>
                        <BoxFilter label={'Filter by Categories'} filterMethod={'categories'} />
                        <div className={styles.line} />
                        <BoxFilter label={'Filter by Price'} filterMethod={'price'}/>
                        <div className={styles.line} />
                        <BoxFilter label={'Filter by Color'} />
                        <div className={styles.line} />
                        <BoxFilter label={'Filter by Size'} />
                        <div className={styles.line} />
                        <button>Apply</button>
                    </div>
                    <div className={styles.boxProducts}>
                        <div className={styles.headBoxProducts}>
                            <div className={styles.layoutShowing}>
                                <div className={styles.layoutShowing1}>
                                    <div className={styles.iconView}>
                                        <CiGrid41 className={styles.icon}/>
                                        <PiChartBarHorizontalThin className={styles.icon}/>
                                    </div>
                                    <div>
                                        Showing 1-16 of 72 results
                                    </div>
                                </div>
                                <div className={styles.layoutShowing2}>
                                    Sort by latest <IoIosArrowDown className={styles.icon}/>
                                </div>
                            </div>
                            <div className={styles.viewProducts}>
                                {
                                    products && products.length > 0 ?
                                        products.map(item =>
                                            <ItemProduct
                                                name={item.name}
                                                brand={item.brand}
                                                price={item.price}
                                            />
                                        ) : null
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
