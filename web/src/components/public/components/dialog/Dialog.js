import React from 'react'
import { BsCheckCircleFill } from "react-icons/bs";

export default function Dialog({isVisible, status}) {
  if(!isVisible) return null
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0)', // Màu nền xám với độ mờ
      zIndex: 100, // Đảm bảo lớp phủ nằm dưới modal
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      userSelect: 'none'
    }}>
      <div style={{
        position: 'fixed',
        height: 190,
        width: 380,
        outline: 'none',
        background: 'rgba(0, 0, 0, 0.65)', display: 'flex', alignItems: 'center', justifyContent: 'center',
        zIndex: 200,
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)'
      }}>
        <div style={{
          height: 190,
          width: 380,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          rowGap: 20
        }}>
          <div style={{
            background: 'white', // Màu nền hình tròn
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxSizing: 'unset'
          }}>
            <BsCheckCircleFill size={50} color='#00ffbf' /> {/* Màu của dấu tích */}
          </div>
          <p style={{ fontSize: 15, color: 'white' }}>{status}</p>
        </div>
      </div>
    </div>

  )
}
