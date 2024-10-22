import React, { useEffect, useRef } from 'react'

export default function ListRender({children, label, isTrue, className, isStartUp}) {
  const ref = useRef();
  useEffect(() => {
    if(ref.current) {
      ref.current.scrollTo({top: 0, behavior: 'smooth'})
    }
  }, [isStartUp])
  return (
    <div className={className} ref={ref}>
    { 
        isTrue ? children : <div>{label}</div>
    }
    </div>
  )
}
