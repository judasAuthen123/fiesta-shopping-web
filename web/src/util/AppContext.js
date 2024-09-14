import React, { createContext, useEffect, useState } from 'react'
export const AppContext = createContext()
export default function AppContextProvider(props) {
    const {children} = props;
    const [dataUser, setDataUser] = useState(() => {
      return JSON.parse(localStorage.getItem('user'))
    })
    const [token, setToken] = useState(() => {
      return JSON.parse(localStorage.getItem('token'))
    })
    useEffect(() => {
      console.log(dataUser);
      console.log(token);
      
    }, [token, dataUser])
  return (
    <AppContext.Provider value={{ dataUser, setDataUser, token, setToken}}>
      {children}
    </AppContext.Provider>
  )
}
