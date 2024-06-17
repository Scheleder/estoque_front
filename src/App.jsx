import { Outlet } from 'react-router-dom';
import Header from './modules/header.jsx'
import Footer from './modules/footer.jsx'
import Sidebar from './modules/sidebar.jsx'

function App() {


  return (
    <>
      <Header />
      <Outlet />
      <Sidebar />
      <Footer />
    </>
  )
}

export default App
