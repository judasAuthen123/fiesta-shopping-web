import React from 'react'
import Header from '../../public/components/header/Header'
import Footer from '../../public/components/footer/Footer'
import styles from './ShippingAddress.module.css'
import ItemAddress, { address } from './address/ItemAddress'
import StepOrder from './step/StepOrder'
export default function ShippingAddress() {
    return (
        <div className={styles.container}>
            <Header />
            <div className={styles.box}>
                <div className={styles.title}>
                    Shipping Address
                </div>
            </div>
            <div className={styles.box}>
                <div className={styles.layoutContent}>
                    <div>
                        <StepOrder state={'shipping'} />
                        <div className={styles.boxText}>
                            <h4>Select a delivery address</h4>
                            <p>Is the address you'd like to use displayed below? If so, click the crorresponding "Deliver to this address" button, or you can enter a new delivery address.</p>
                        </div>
                        <div className={styles.boxAddress}>
                            {
                                address && address.length > 0 ?
                                    address.map(item =>
                                        <ItemAddress data={item} />
                                    ) : null
                            }
                        </div>
                        <form>
                            <h5>Add a new address</h5>
                            <div className={styles.boxInput}>
                                <div className={styles.viewInput}>
                                    <label>
                                        Name
                                    </label>
                                    <input />
                                </div>
                                <div className={styles.viewInput}>
                                    <label>
                                        Phone Number
                                    </label>
                                    <input />
                                </div>
                                <div className={styles.viewInput}>
                                    <label>
                                        City
                                    </label>
                                    <input />
                                </div>
                                <div className={styles.viewInput}>
                                    <label>
                                        Street, ward, distric
                                    </label>
                                    <input />
                                </div>
                                <div className={styles.viewInput}>
                                    <label>
                                        Pin Code
                                    </label>
                                    <input />
                                </div>
                                <div className={styles.viewDefault}>
                                    <input type='checkbox' /> <label>Use as my default address</label>
                                </div>
                                <button>Add New Address</button>
                            </div>
                        </form>
                    </div>
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
                                <input />
                                <button>Apply</button>
                            </div>
                        </div>
                        <div className={styles.viewSubtotal} style={{ fontWeight: 'normal' }}>
                            <p>
                                Delivery charge
                            </p>
                            <p>
                                $5.00
                            </p>
                        </div>
                        <div className={styles.viewSubtotal} style={{ borderBottomWidth: 0 }}>
                            <p>
                                Grand Total
                            </p>
                            <p>
                                $205.00
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}
