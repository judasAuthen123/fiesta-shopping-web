import React, { useState } from 'react'
import styles from './ProfileNav.module.css'
import { HiOutlineUser } from "react-icons/hi2";
import { PiCubeLight } from "react-icons/pi";
import { CiHeart } from "react-icons/ci";
import { PiMapPin } from 'react-icons/pi';
import { IoCardOutline } from 'react-icons/io5'
import { PiBellRingingLight } from "react-icons/pi";
import { IoSettingsOutline } from "react-icons/io5";
export default function ProfileNav({onChange, keyRender}) {
    const onChangeId = (id) => {
        onChange(id)
    }
    const navList = [
        {
            id: 1,
            name: 'Presonal Information',
            icon: HiOutlineUser
        },
        {
            id: 2,
            name: 'My Orders',
            icon: PiCubeLight
        },
        {
            id: 3,
            name: 'My Wishlists',
            icon: CiHeart
        },
        {
            id: 4,
            name: 'Manage Addresses',
            icon: PiMapPin
        },
        {
            id: 5,
            name: 'Saved Cards',
            icon: IoCardOutline
        },
        {
            id: 6,
            name: 'Notifications',
            icon: PiBellRingingLight
        },
        {
            id: 7,
            name: 'Settings',
            icon: IoSettingsOutline
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
