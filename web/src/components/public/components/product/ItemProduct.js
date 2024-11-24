import React, { useEffect, useState } from 'react'
import styles from './ItemProduct.module.css'
import { CiStar } from "react-icons/ci";
import { IoEyeOutline } from "react-icons/io5";
import { BsArrowsMove } from "react-icons/bs";
import { Link } from 'react-router-dom';
export default function ItemProduct({ name, brand, price, id, images }) {
    const [avatarProduct, setAvatarProduct] = useState(null)
    useEffect(() => {
        if (Array.isArray(images)) {
            const avatar = images[0].url
            setAvatarProduct(avatar)
        }
    }, [images])
    return (
        <div className={styles.container}>
            <Link 
                to={'/product-detail'}
                state={{id, name}}
                className={styles.productImg}>
                <img alt='' src={avatarProduct} loading='lazy' />
                <div className={styles.accessOptions}>
                    <div className={styles.iconView}>
                        <div className={styles.itemIconView}>
                            <CiStar className={styles.icon} />
                        </div >
                        <div className={styles.itemIconView}>
                            <BsArrowsMove className={styles.icon} />
                        </div >
                        <div className={styles.itemIconView}>
                            <IoEyeOutline className={styles.icon} />
                        </div>
                    </div>
                    <button>Add to Cart</button>
                </div>
            </Link>
            <div className={styles.infoProduct}>
                <p className={styles.name} style={{ fontWeight: 550 }}>
                    {name}
                </p>
                <p className={styles.price}>
                    ${price}.00
                </p>
            </div>
        </div>
    )
}
export const products = [
    {
        id: "1",
        brand: "Roadstar",
        name: "Printed Cotton T-Shirt",
        price: "38"
    },
    {
        id: "2",
        brand: "Allen Solly",
        name: "Women Textured Handled Bag",
        price: "80"
    },
    {
        id: "3",
        brand: "Louis Philippe Sport",
        name: "Polo Colla T-Shirt",
        price: "50"
    },
    {
        id: "4",
        brand: "Adidas",
        name: "Adidas Running Shoes",
        price: "60"
    },
    {
        id: "5",
        brand: "Trendyol",
        name: "Flora Embroidered Maxi Dress",
        price: "35"
    },
    {
        id: "6",
        brand: "YK Disney",
        name: "Girls Pink Moana Printed Dress",
        price: "80"
    },
    {
        id: "7",
        brand: "US Polo",
        name: "Tailored Cotton Casual Shirt",
        price: "40"
    },
    {
        id: "8",
        brand: "Zyla",
        name: "Women Sandals",
        price: "35"
    },
]
