import React from 'react'
import styles from './Home.module.css'
import Header from '../../public/components/header/Header'
import { GrLinkNext, GrLinkPrevious } from "react-icons/gr";
import { subCategory } from '../../public/components/header/menudrop/MenuDrop';
import { appReviews } from './reviews/ItemAppReview';
import ItemProduct, { products } from '../../public/components/product/ItemProduct';
import ItemSubCategory from './categories/ItemSubCategory';
import Footer from '../../public/components/footer/Footer';
export default function Home() {
  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.box}>
        <div className={styles.headBanner}>
          <div className={styles.boxText}>
            <p className={styles.text1}>Classic Exclusive</p>
            <p className={styles.text2}>Women's Collection</p>
            <p className={styles.text3}>UPTO 40% OFF</p>
            <button>Shop now <GrLinkNext /></button>
          </div>
        </div>
      </div>
      <div className={styles.box}>
        <div className={styles.categories}>
          <div className={styles.headCategories}>
            <text className={styles.titleHeadCategories}>Shop by Categories</text>
            <div className={styles.viewPagination}>
              <button>
                <GrLinkPrevious />
              </button>
              <button>
                <GrLinkNext />
              </button>
            </div>
          </div>
          <div className={styles.viewCategories}>
            {
              subCategory ?
                subCategory.map(item =>
                  <ItemSubCategory key={item.id} name={item.name} />
                ) : <div />
            }
          </div>
        </div>
      </div>
      <div className={styles.box}>
        <div className={styles.products}>
          <div className={styles.headProducts}>
            <text className={styles.titleHeadProducts}>
              Our Bestsellers
            </text>
          </div>
          <div className={styles.viewProducts}>
            {
              products ?
                products.map(item =>
                  <ItemProduct name={item.name} brand={item.brand} price={item.price} />
                ) : <div />
            }
          </div>
        </div>
      </div>
      <div className={styles.box}>
        <div className={styles.categories}>
          <div className={styles.headCategories}>
            <text className={styles.titleHeadCategories}>What our Customer say's</text>
            <div className={styles.viewPagination}>
              <button>
                <GrLinkPrevious />
              </button>
              <button>
                <GrLinkNext />
              </button>
            </div>
          </div>
          <div className={styles.viewAppReviews}>
            {
              
            }
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}