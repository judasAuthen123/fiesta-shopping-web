import React, { useEffect, useRef } from 'react'
import { PiSmileyXEyesBold } from "react-icons/pi";
export default function ListRender({ children, label, isTrue, className, isStartUp }) {
  const ref = useRef();
  useEffect(() => {
    if (ref.current) {
      ref.current.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [isStartUp])
  return (
    <div className={className} ref={ref}>
      {
        isTrue ? children : <div style={{
          display: 'flex', alignItems: 'center', 
          columnGap: 10, justifyContent: 'center', marginTop: 50,
          width: '100%', fontSize: 17}}><PiSmileyXEyesBold size={35}/> {label}</div>
      }
    </div>
  )
}
