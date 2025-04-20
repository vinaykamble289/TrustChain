import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import TrustChainBot from './components/TrustChainBot.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    {/* <TrustChainBot />  */}
  </StrictMode>,
)
