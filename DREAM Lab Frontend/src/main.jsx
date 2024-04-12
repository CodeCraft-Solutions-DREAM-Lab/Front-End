import React from "react";

// Componente principal
import App from "./App.jsx";

// Para el enrutamiento
import ReactDOM from "react-dom/client";

// Para los estilos de NextUI
import { NextUIProvider } from "@nextui-org/react";

// Para los selectores de fecha y hora
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

// Para utilizar redux
import { Provider } from "react-redux";
import { store } from "./redux/store.js";

// Estilos
import "./index.css";



ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <NextUIProvider>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Provider store={store}>
          <App />
        </Provider>
      </LocalizationProvider>
    </NextUIProvider>
  </React.StrictMode>
);
