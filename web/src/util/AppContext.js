import React, { createContext, useEffect, useState } from 'react'
export const AppContext = createContext()
export default function AppContextProvider(props) {
  const { children } = props;
  const getUserFromLocalStorage = () => JSON.parse(localStorage.getItem('user'));
  const getTokenFromLocalStorage = () => JSON.parse(localStorage.getItem('token'));

  const [dataUser, setDataUser] = useState(getUserFromLocalStorage());
  const [token, setToken] = useState(getTokenFromLocalStorage());

  // Lắng nghe sự kiện thay đổi của localStorage
  // useEffect(() => {
  //   const handleStorageChange = () => {
  //     const updatedUser = getUserFromLocalStorage();
  //     const updatedToken = getTokenFromLocalStorage();

  //     setDataUser(updatedUser);
  //     setToken(updatedToken);
  //     if (!updatedUser && updatedToken) {
  //       localStorage.removeItem('token');
  //       setToken(null);
  //     }

  //     if (!updatedToken && updatedUser) {
  //       localStorage.removeItem('user');
  //       setDataUser(null);
  //     }
  //     if (!updatedUser || !updatedToken) {
  //       alert('Bạn cần đăng nhập lại!');
  //     }
  //   };

  //   window.addEventListener('storage', handleStorageChange);

  //   // Cleanup khi component unmount
  //   return () => {
  //     window.removeEventListener('storage', handleStorageChange);
  //   };
  // }, []);
  return (
    <AppContext.Provider value={{ dataUser, setDataUser, token, setToken }}>
      {children}
    </AppContext.Provider>
  )
}
