import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { NextUIProvider } from "@nextui-org/react";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

ReactDOM.createRoot(document.getElementById('root')).render(
  <NextUIProvider>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <App />
    </LocalizationProvider>
  </NextUIProvider>
)
