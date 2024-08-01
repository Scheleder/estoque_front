import { Outlet } from 'react-router-dom';
import Header from './modules/header.jsx'
import Footer from './modules/footer.jsx'
import Sidebar from './modules/sidebar.jsx'
import { useApiInterceptor } from './services/api.jsx';
import { useAuth } from './lib/utils.js';

function App() {
  useApiInterceptor();
  useAuth()

  return (
    <>
      <Header />
      <Outlet/>
      <Sidebar />
      <Footer />
    </>
  )
}

export default App
