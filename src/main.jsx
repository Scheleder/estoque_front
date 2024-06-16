import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Header from './modules/header.jsx'
import Footer from './modules/footer.jsx'
import Sidebar from './modules/sidebar.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Header/>   
    <App />
    <Sidebar />
    <Footer/>
  </React.StrictMode>
)
