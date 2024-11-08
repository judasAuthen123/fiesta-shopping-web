import React from 'react'
import { FiPhoneCall } from "react-icons/fi";
import { CiMail } from "react-icons/ci";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";
import styles from './Footer.module.css'
import { useTranslation } from 'react-i18next';
function Footer() {
    const {t} = useTranslation()
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
                            {t('Footer.Information.title')}
                        </h4>
                        <p>
                            <a href='#'>{t('Footer.Information.account')}</a>
                        </p>
                        <p>
                            <a href='#'>{t('Footer.Information.login')}</a>
                        </p>
                        <p>
                            <a href='#'>{t('Footer.Information.cart')}</a>
                        </p>
                        <p>
                            <a href='#'>{t('Footer.Information.wishlist')}</a>
                        </p>
                        <p>
                            <a href='#'>{t('Footer.Information.checkout')}</a>
                        </p>
                    </div>
                    <div className={styles.viewInfo1}>
                        <h4>
                        {t('Footer.Service.title')}
                        </h4>
                        <p>
                            <a href='#'>{t('Footer.Service.aboutUs')}</a>
                        </p>
                        <p>
                            <a href='#'>{t('Footer.Service.career')}</a>
                        </p>
                        <p>
                            <a href='#'>{t('Footer.Service.deliveryInformation')}</a>
                        </p>
                        <p>
                            <a href='#'>{t('Footer.Service.privacyPolicy')}</a>
                        </p>
                        <p>
                            <a href='#'>{t('Footer.Service.terms_conditions')}</a>
                        </p>
                    </div>
                    <div className={styles.viewSubEmail}>
                        <h4>
                        {t('Footer.Subrscribes.title')}
                        </h4>
                        <p>{t('Footer.Subrscribes.content')}</p>
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
