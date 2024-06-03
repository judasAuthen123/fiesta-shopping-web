import React from 'react'
import { FaStar } from "react-icons/fa";
export default function Star({ count }) {
    const star = Array.from({ length: count }, (_, index) => index);
    return (
        <div style={{display:'flex'}}>
            {star.map((star, index) => (
                <FaStar color='#eac334' key={index}/>
            ))}
        </div>
    )
}

