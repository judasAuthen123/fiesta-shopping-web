import React from 'react'
import { FiPhoneCall } from "react-icons/fi";
import { CiMail } from "react-icons/ci";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";
import styles from './Footer.module.css'
function Footer() {
    return (
        <div className={styles.container}>
            <div className={styles.contentLayout}>
                <div className={styles.infoAndOptions}>
                    <div className={styles.viewOwnerInfo}>
                        <h2>Fiesta</h2>
                        <div className={styles.item}>
                            <FiPhoneCall className={styles.icon} /> 0358856753
                        </div>
                        <div className={styles.item}>
                            <CiMail className={styles.icon} /> fiesta2102@gmail.com
                        </div>
                        <div className={styles.item}>
                            <HiOutlineLocationMarker size={30} className={styles.icon} /> 3891 Ranchview Dr.Richardson, California 62939
                        </div>
                    </div>
                    <div className={styles.viewInfo1}>
                        <h4>
                            Information
                        </h4>
                        <p>
                            <a href='#'>My Account</a>
                        </p>
                        <p>
                            <a href='#'>login</a>
                        </p>
                        <p>
                            <a href='#'>My Cart</a>
                        </p>
                        <p>
                            <a href='#'>My Wishlist</a>
                        </p>
                        <p>
                            <a href='#'>Checkout</a>
                        </p>
                    </div>
                    <div className={styles.viewInfo1}>
                        <h4>
                            Service
                        </h4>
                        <p>
                            <a href='#'>About Us</a>
                        </p>
                        <p>
                            <a href='#'>Careeer</a>
                        </p>
                        <p>
                            <a href='#'>Delivery Information</a>
                        </p>
                        <p>
                            <a href='#'>Privacy Policy</a>
                        </p>
                        <p>
                            <a href='#'>Termns & Conditions</a>
                        </p>
                    </div>
                    <div className={styles.viewSubEmail}>
                        <h4>
                            Subscribe
                        </h4>
                        <p>Enter your email below to be the first to know about new collections and product launches.</p>
                        <div className={styles.emailForm}>
                            <CiMail className={styles.icon} /> Your Email
                        </div>
                    </div>
                </div>
                <div className={styles.bottomFooter}>
                    <div className={styles.payment}>
                        <FaFacebookF className={styles.icon} />
                        <FaInstagram className={styles.icon} />
                        <FaTwitter className={styles.icon} />
                        <FaFacebookF className={styles.icon} />
                        <FaInstagram className={styles.icon} />
                        <FaTwitter className={styles.icon} />
                    </div>
                    <div className={styles.title}>
                        2024 Fiesta All Rights are reserved
                    </div>
                    <div className={styles.contact}>
                        <FaFacebookF className={styles.icon} />
                        <FaInstagram className={styles.icon} />
                        <FaTwitter className={styles.icon} />
                    </div>
                </div>
            </div>
        </div>
    )
}
export default React.memo(Footer)
