import React from 'react'
import styles from './ProductDetail.module.css'
import Header from '../../public/components/header/Header'
import Footer from '../../public/components/footer/Footer'
import { FaStar } from 'react-icons/fa'
import ColorList from './colorVariations/ColorList'
import SizeList from './sizeVaritations/SizeList'
import { useParams } from 'react-router-dom'
export default function ProductDetail() {
    const {id} = useParams();
    return (
        <div className={styles.container}>
            <Header />
            <div className={styles.box}>
                <div className={styles.layoutContent}>
                    <div>
                        <div>
                        </div>
                    </div>
                    <div className={styles.productDetail}>
                        <h3>YK Disney</h3>
                        <p>
                            Girls Pink Moana Printed Dess
                        </p>
                        <div className={styles.viewRating}>
                            <div className={styles.viewStarRating}>
                                <FaStar className={styles.icon}/>
                                <FaStar className={styles.icon}/>
                                <FaStar className={styles.icon}/>
                                <FaStar className={styles.icon}/>
                                <FaStar className={styles.icon}/>
                            </div>
                            <div className={styles.reviewCount}>
                                5.0 (121 Reviews)
                            </div>
                        </div>
                        <p>
                            $80.00
                        </p>
                        <div className={styles.discription}>
                            its a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Lpsum is that it has a more-or-less normal distribution of letters
                        </div>
                        <ColorList />
                        <SizeList />
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}
