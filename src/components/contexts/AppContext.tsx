import React, { ReactNode, PropsWithChildren, useEffect, useState } from "react";
import { Backdrop, CircularProgress } from "@mui/material";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import Navbar from "../Navbar/Navbar";
import { AppContextType, CartDto, CustomModalProps, NavbarProps } from "../../types/types";
import CustomModal from "../CustomModal/CustomModal";


  export const AppContext = React.createContext<AppContextType>({
  loading: false,
  startLoading: () => {},
  stopLoading: () => {},
  setModal1State: (modalProps: Omit<CustomModalProps, 'onClose'>)=> {},
  setModal2State: (modalProps: Omit<CustomModalProps, 'onClose'>)=> {},
  navbarProps: {itemCount:0},
  refreshNavbar: () => {},
  setIsLoggedIn: () => {},
  isLoggedIn:false
});

export const AppProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [navbarState, setNavbarState] = useState<NavbarProps>({itemCount:0});
  const [loadingCount, setLoadingCount] = useState(0);
  const [modal1State, setModal1State] = useState<CustomModalProps>({
    isOpen: false,
    title: '',
    message: undefined,
    okButtonText: undefined,
    okButtonClick: undefined,
    leftButtonText: undefined,
    leftButtonClick: undefined,
    rightButtonText: undefined,
    rightButtonClick: undefined,
    children:undefined
    
  });
  const [modal2State, setModal2State] = useState<CustomModalProps>({
    isOpen: false,
    title: '',
    message: undefined,
    okButtonText: undefined,
    okButtonClick: undefined,
    leftButtonText: undefined,
    leftButtonClick: undefined,
    rightButtonText: undefined,
    rightButtonClick: undefined,
    children:undefined
    
  });
  const startLoading = () => setLoadingCount((prev) => prev + 1);
  
  const stopLoading = () => {
    debugger;

      setLoadingCount((prev) => prev - 1);
    
  };

  useEffect(() => {
    return () => console.log("destroyed");
  }, []);
const refreshNavbar= ()=> {


    startLoading(); // İşlem başlamadan önce loading durumunu aktif et


    fetch(`${baseUrl}/api/cart`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },      
    })
      .then((response) => {

        if(response.ok){
return response.json().then(x=> setNavbarState( {itemCount: ((x as CartDto).cartItemDetailDtoList.length)}))
}     

else {
        // response.text().then(x=>     setError(x || "Giriş başarısız"))

      }   })      
      .catch((error) => {

      })
      .finally(() => {

        stopLoading(); // İşlem tamamlandıktan sonra loading durumunu kapat
      });
  };
  return (<LocalizationProvider  dateAdapter={AdapterDayjs}>



    <AppContext.Provider value={{
      loading: loadingCount > 0,
      startLoading:startLoading,
      stopLoading:stopLoading,
      setModal1State:setModal1State ,
      setModal2State:setModal2State ,
      navbarProps:navbarState,
      refreshNavbar:refreshNavbar ,
      setIsLoggedIn:setIsLoggedIn,
      isLoggedIn:isLoggedIn
    }}>
            <Navbar  itemCount={navbarState.itemCount}/>
      {children}
      <Backdrop
        sx={{
          color: '#fff',
          zIndex: (theme) => theme.zIndex.drawer + 1,
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
        }}
        open={loadingCount > 0}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    
        <CustomModal
         isOpen={modal1State.isOpen}
         title={modal1State.title}
         message={modal1State.message}
         leftButtonClick={modal1State.leftButtonClick}
         leftButtonText={modal1State.leftButtonText}
         rightButtonClick={modal1State.rightButtonClick}
         rightButtonText={modal1State.rightButtonText}
         okButtonClick={modal1State.okButtonClick}
         okButtonText={modal1State.okButtonText} >

          {modal1State.children}
         </CustomModal>
         <CustomModal
         isOpen={modal2State.isOpen}
         title={modal2State.title}
         message={modal2State.message}
         leftButtonClick={modal2State.leftButtonClick}
         leftButtonText={modal2State.leftButtonText}
         rightButtonClick={modal2State.rightButtonClick}
         rightButtonText={modal2State.rightButtonText}
         okButtonClick={modal2State.okButtonClick}
         okButtonText={modal2State.okButtonText} >

          {modal2State.children}
         </CustomModal>
      )
    </AppContext.Provider>
    </LocalizationProvider>
  );
};
