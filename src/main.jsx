import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { PrimeReactProvider } from "primereact/api";
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
    <PrimeReactProvider value={{ripple: true}}>
      <App />
    </PrimeReactProvider>
)
