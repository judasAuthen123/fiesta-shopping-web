import React, { useEffect, useState } from 'react'
import styles from './Home.module.css'
import Header from '../../public/components/header/Header'
import { GrLinkNext, GrLinkPrevious } from "react-icons/gr";
import { subCategory } from '../../public/components/header/menudrop/MenuDrop';
import ItemProduct, { products } from '../../public/components/product/ItemProduct';
import ItemSubCategory from './categories/ItemSubCategory';
import Footer from '../../public/components/footer/Footer';
import BackToTopButton from '../../public/components/button/BackToTopButton';
import { useTranslation } from 'react-i18next';
import AxiosInstance from '../../../util/AxiosInstance';
import PolicyFooter from './../../public/components/footer/PolicyFooter';
export default function Home() {
  const { t } = useTranslation()
  const [categoryList, setCategoryList] = useState([])
  const [bestSellersList, setBestSellersList] = useState([])
  const ctgName = t('MongoTranslator.nameCtg')

  const getCategory = async () => {
    try {
      const response = await AxiosInstance.get('/category/getCategory')
      if (response.result === true && response.data) {
        setCategoryList(response.data)
      }
    } catch (error) {
      console.log(error);

    }
  }

  const getProduct = async () => {
    try {
      const response = await AxiosInstance.get('/productApi/searchProducts', {
        params: {
          page: 1,
          limit: 8,
          sortBy: 'sold',
          sortOrder: 'desc'
        }
      })
      if (response.result) {
        setBestSellersList(response.data)
      }
    } catch (error) {

    }
  }

  useEffect(() => {
    getCategory()
    getProduct()
  }, [])

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'auto'
    })
  }, [])
  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.box}>
        <div className={styles.headBanner}>
          <div className={styles.boxText}>
            <p className={styles.text1}>Classic Exclusive</p>
            <p className={styles.text2}>Women's Collection</p>
            <p className={styles.text3}>UPTO 40% OFF</p>
          </div>
        </div>
      </div>
      <div className={styles.box}>
        <div className={styles.categories}>
          <div className={styles.headCategories}>
            <div className={styles.titleHeadCategories}>{t('Home.shopByCategories')}</div>

          </div>
          <div className={styles.viewCategories}>
            {
              categoryList ?
                categoryList.map(item =>
                  <ItemSubCategory key={item._id} name={item.name[ctgName]} image={item.image} id={item._id} />
                ) : <div />
            }
          </div>
        </div>
      </div>
      <div className={styles.box}>
        <div className={styles.products}>
          <div className={styles.headProducts}>
            <div className={styles.titleHeadProducts}>
              {t('Home.bestsellers')}
            </div>
          </div>
          <div className={styles.viewProducts}>
            {
              bestSellersList ?
                bestSellersList.map(item =>
                  <ItemProduct key={item._id} name={item.name} brand={item.Brand} price={item.price} id={item._id} images={item.images} />
                ) : <div />
            }
          </div>
        </div>
      </div>
      <BackToTopButton />
      <PolicyFooter />
      <Footer />
    </div>
  )
}
