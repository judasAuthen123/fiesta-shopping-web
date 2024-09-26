import React, { useState } from 'react'
import styles from './ProfileNav.module.css'
import { HiOutlineUser } from "react-icons/hi2";
import { PiCubeLight } from "react-icons/pi";
import { PiMapPin } from 'react-icons/pi';
import { IoCardOutline } from 'react-icons/io5'
import { PiBellRingingLight } from "react-icons/pi";
import { IoSettingsOutline } from "react-icons/io5";
import { RxExit } from "react-icons/rx";
export default function ProfileNav({onChange, keyRender}) {
    const onChangeId = (id) => {
        onChange(id)
    }
    const navList = [
        {
            id: 1,
            name: 'Information',
            icon: HiOutlineUser
        },
        {
            id: 2,
            name: 'My Orders',
            icon: PiCubeLight
        },
        {
            id: 3,
            name: 'Addresses',
            icon: PiMapPin
        },
        {
            id: 4,
            name: 'Saved Cards',
            icon: IoCardOutline
        },
        {
            id: 5,
            name: 'Notifications',
            icon: PiBellRingingLight
        },
        {
            id: 6,
            name: 'Settings',
            icon: IoSettingsOutline
        },
        {
            id: 7,
            name: 'Sign out',
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
