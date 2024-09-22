import React, { ReactNode,PropsWithChildren } from "react";
import { Backdrop, CircularProgress } from "@mui/material";

export const AppLoaderContext = React.createContext<{
  loading: boolean;
  startLoading: () => void;
  stopLoading: () => void;
}>({
  loading: false,
  startLoading: () => {},
  stopLoading: () => {},
});

export const AppLoaderProvider: React.FC<PropsWithChildren> = ( {children} ) => {
  const [loadingCount, setLoadingCount] = React.useState(0);

  const startLoading = () => setLoadingCount((prev) => prev + 1);
  const stopLoading = () => setLoadingCount((prev) => {
    if(prev<1){
throw new Error("loadingcount 0 altına düşemez.");
  }
  return prev - 1;}
); // 0'dan aşağıya düşmez

  return (
    <AppLoaderContext.Provider value={{ loading: loadingCount > 0, startLoading, stopLoading }}>
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
    </AppLoaderContext.Provider>
  );
};
