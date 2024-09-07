import React, { createContext, useState } from 'react'
export const AppContext = createContext()
export default function AppContextProvider(props) {
    const {children} = props;
    const [isLogin, setIsLogin] = useState(true)
    const [dataUser, setDataUser] = useState(() => {
      return JSON.parse(localStorage.getItem('user'))
    })
  return (
    <AppContext.Provider value={{isLogin, setIsLogin, dataUser, setDataUser}}>
      {children}
    </AppContext.Provider>
  )
}
