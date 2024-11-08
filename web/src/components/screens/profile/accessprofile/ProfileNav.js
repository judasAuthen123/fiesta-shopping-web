import React, { useState } from 'react'
import styles from './ProfileNav.module.css'
import { HiOutlineUser } from "react-icons/hi2";
import { PiCubeLight } from "react-icons/pi";
import { PiMapPin } from 'react-icons/pi';
import { IoCardOutline } from 'react-icons/io5'
import { PiBellRingingLight } from "react-icons/pi";
import { IoSettingsOutline } from "react-icons/io5";
import { RxExit } from "react-icons/rx";
import { useTranslation } from 'react-i18next';
export default function ProfileNav({onChange, keyRender}) {
    const {t} = useTranslation()
    const onChangeId = (id) => {
        onChange(id)
    }
    const navList = [
        {
            id: 1,
            name: t('Profile.Nav.information'),
            icon: HiOutlineUser
        },
        {
            id: 2,
            name: t('Profile.Nav.orders'),
            icon: PiCubeLight
        },
        {
            id: 3,
            name: t('Profile.Nav.address'),
            icon: PiMapPin
        },
        {
            id: 4,
            name: t('Profile.Nav.cards'),
            icon: IoCardOutline
        },
        {
            id: 5,
            name: t('Profile.Nav.notifications'),
            icon: PiBellRingingLight
        },
        {
            id: 6,
            name: t('Profile.Nav.settings'),
            icon: IoSettingsOutline
        },
        {
            id: 7,
            name: t('Profile.Nav.signOut'),
            icon: RxExit
        }
    ]
    return (
        <nav className={styles.container}>
            <ul className={styles.viewItem}>
                {
                    navList.map(item => {
                        const active = item.id === keyRender ? true : false
                        return (
                            <li key={item.id} 
                            className={active ? styles.active : styles.inActive}
                            onClick={() => onChangeId(item.id)}>
                                <item.icon className={styles.icon} color={active ? 'white' : 'black'} />
                                <div style={{ fontSize: 14, color: active ? 'white' : 'black' }}>
                                    {item.name}
                                </div>
                            </li>
                        );
                    })
                }
            </ul>
        </nav>
    )
}
