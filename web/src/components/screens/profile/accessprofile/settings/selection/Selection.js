import React, { useEffect, useRef, useState } from 'react'
import { MdKeyboardArrowUp, MdKeyboardArrowDown } from 'react-icons/md'
import styles from './Selection.module.css'
import { MdOutlineDone } from "react-icons/md";
export default function Selection({ optionsData, typeData }) {
    const [selectedOption, setselectedOption] = useState(localStorage.getItem(typeData) ? localStorage.getItem(typeData) : optionsData[0])
    const [isOpen, setisOpen] = useState(false);
    const heightRef = useRef();
    const boderRef = useRef();
    const containerRef = useRef()

    const onChangeOption = (data) => {
        setselectedOption(data)
    }
    useEffect(() => {
        localStorage.setItem(typeData, selectedOption)
    }, [selectedOption, typeData])


    const openSelection = () => {
        setisOpen(!isOpen)
    }






    useEffect(() => {
        const scrollHeight = heightRef.current.scrollHeight;
        if (isOpen) {
            heightRef.current.style.maxHeight = `${scrollHeight}px`
            heightRef.current.style.borderBottom = `1px solid black`
            boderRef.current.style.borderBottomLeftRadius = `0px`
            boderRef.current.style.borderBottomRightRadius = `0px`
        } else {
            heightRef.current.style.maxHeight = `0px`
            heightRef.current.style.borderBottom = `none`
            boderRef.current.style.borderBottomLeftRadius = `5px`
            boderRef.current.style.borderBottomRightRadius = `5px`
        }
    }, [isOpen])





    const handleClickOutside = (event) => {
        if (containerRef.current && !containerRef.current.contains(event.target)) {
            setisOpen(false);
        }
    };
    





    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);







    return (
        <div className={styles.container} ref={containerRef}>
            <div className={styles.selection} onClick={openSelection} ref={boderRef}>
                {selectedOption} {isOpen ? <MdKeyboardArrowDown /> : <MdKeyboardArrowUp />}
            </div>
            <div className={styles.options} ref={heightRef}>
                <div className={styles.listOption}>
                    {
                        optionsData && optionsData.length ?
                            optionsData.map(item =>
                                <div
                                    key={item}
                                    onClick={() => {
                                        openSelection()
                                        onChangeOption(item)
                                    }} >
                                    {item} {selectedOption === item ? <MdOutlineDone className={styles.icon}/> : null}
                                </div>
                            ) : null
                    }
                </div>
            </div>
        </div>
    )
}
