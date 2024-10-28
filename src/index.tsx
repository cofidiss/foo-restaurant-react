import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { CssBaseline } from "@mui/material";
import { BrowserRouter } from "react-router-dom";
import { AppProvider } from "./components/contexts/AppContext"; // Yeni dosyadan içe aktarıyoruz

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
<div style={{ height:"100vh"}}> 

    <BrowserRouter>
      <AppProvider>
        <App />
      </AppProvider>
    </BrowserRouter>
    </div>
);
