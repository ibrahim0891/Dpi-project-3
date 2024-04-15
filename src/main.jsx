import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { setOnline } from './Common/SetActiveStatue.jsx'
 
//Nothing need to be done here 
let handleLoad = () => {
    setOnline(localStorage.getItem('currentUser'))
}
window.addEventListener('load', handleLoad)
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
