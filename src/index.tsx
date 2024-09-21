import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { CssBaseline } from "@mui/material";
import { BrowserRouter } from "react-router-dom";
import { AppLoaderProvider } from "./components/contexts/AppLoaderContext"; // Yeni dosyadan içe aktarıyoruz

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <React.StrictMode>
    <CssBaseline />
    <BrowserRouter>
      <AppLoaderProvider>
        <App />
      </AppLoaderProvider>
    </BrowserRouter>
  </React.StrictMode>
);
