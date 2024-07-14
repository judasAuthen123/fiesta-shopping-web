import React from 'react'
import Header from '../../public/components/header/Header'
import Footer from '../../public/components/footer/Footer'
import styles from './Checkout.module.css'
import { products } from '../../public/components/product/ItemProduct'
import ItemCheckout from './ItemCheckout'
export default function Checkout() {
    return (
        <div>
            <Header />
            <div className={styles.box}>
                <div className={styles.title}>
                    Checkout
                </div>
            </div>
            <div className={styles.box}>
                <div className={styles.layoutContent}>
                    <table cellPadding="5" cellSpacing="0" border="1">
                        <thead>
                            <tr>
                                <th>Products</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Subtotal</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products && products.length > 0 ?
                                products.map(item =>
                                    <ItemCheckout data={item}/>
                                ) : null
                            }
                        </tbody>
                    </table>
                    <div className={styles.viewFromCheckout}>
                        <div className={styles.viewSubtotal}>
                            <p>
                                Subtotal
                            </p>
                            <p>
                                $200.00
                            </p>
                        </div>
                        <div className={styles.viewCodeDiscout}>
                            <label>Enter discount code</label>
                            <div className={styles.enterCodeDiscout}>
                                <input/>
                                <button>Apply</button>
                            </div>
                        </div>
                        <div className={styles.viewSubtotal} style={{fontWeight:'normal'}}>
                            <p>
                                Delivery charge
                            </p>
                            <p>
                                $5.00
                            </p>
                        </div>
                        <div className={styles.viewSubtotal} style={{borderBottomWidth: 0}}>
                            <p>
                                Grand Total
                            </p>
                            <p>
                                $205.00
                            </p>
                        </div>
                        <button>Proceed to Checkout</button>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}
