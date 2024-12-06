import React, { useEffect, useState } from 'react'
import { MdKeyboardArrowUp } from "react-icons/md";
export default function BackToTopButton() {
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => {
        if (window.scrollY > 800) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'auto'
        });
    };

    useEffect(() => {
        window.addEventListener('scroll', toggleVisibility);
        return () => {
            window.removeEventListener('scroll', toggleVisibility);
        };
    }, []);
    return (
        <div style={{
            position: 'fixed',
            right: 50,
            bottom: 50,
            zIndex: 50
        }}>
            {isVisible &&
                <button onClick={scrollToTop} style={{width:35, height:35, borderRadius: '50%', backgroundColor:'#000000d9', border:'none'}}>
                    <MdKeyboardArrowUp color='white' size={32}/>
                </button>
            }
        </div>
    )
}
