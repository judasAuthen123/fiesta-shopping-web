import React from 'react'

export default function ContainerLoading({ children, background }) {
    return (
        <div style={{ 
            background: background, 
            position: 'absolute', top: 0, left: 0,
             bottom: 0, right: 0, display: 'flex',
             justifyContent: 'center', alignItems: 'center',
             zIndex:3 }}>
            {children}
        </div>
    )
}
