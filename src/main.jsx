import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {createBrowserRouter, RouterProvider, Navigate} from 'react-router-dom'
import About from './pages/About.jsx'
import BrandDetails from './pages/BrandDetails.jsx'
import Home from './pages/Home.jsx'
import Settings from './pages/Settings.jsx'
import Items from './pages/Items.jsx'
import Users from './pages/Users.jsx'
import Moves from './pages/Movements.jsx'
import Supply from './pages/Supply.jsx'
import Takeout from './pages/Takeout.jsx'
import ItemDetails from './pages/ItemDetails.jsx'
import MoveDetails from './pages/MoveDetails.jsx'
import UserDetails from './pages/UserDetails.jsx'
import Logout from './pages/Logout.jsx'
import ComponentDetails from './pages/ComponentDetails.jsx'
import LocalDetails from './pages/LocalDetails.jsx'
import CategoryDetails from './pages/CategoryDetails.jsx'
import UnityDetails from './pages/UnityDetails.jsx'
import ErrorPage from './pages/ErrorPage.jsx'

const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage error='Página não encontrada' />,
    children:[      
        {
          path: "/",
          element: <Home />                 
        },
        {
          path: "/items",
          element: <Items />
        },  
        {
          path: "/users",
          element: <Users />
        },
        {
          path: "/moves",
          element: <Moves />
        },  
        {
          path: "/supply",
          element: <Supply />
        }, 
        {
          path: "/takeout",
          element: <Takeout />
        },  
        {
          path: "/about",
          element: <About />
        },  
        {
          path: "/settings",
          element: <Settings />
        },
        {
          path: "/logout",
          element: <Logout />
        },
        {
          path:"items/:id",
          element: <ItemDetails />
        },
        {
          path:"moves/:id",
          element: <MoveDetails />
        },
        {
          path:"users/:id",
          element: <UserDetails />
        },
        {
          path:"brands/:id",
          element: <BrandDetails />
        },
        {
          path:"components/:id",
          element: <ComponentDetails />
        },
        {
          path:"locals/:id",
          element: <LocalDetails />
        },
        {
          path:"categories/:id",
          element: <CategoryDetails />
        },
        {
          path:"units/:id",
          element: <UnityDetails />
        },
        {
          path:"/oldroute",
          element: <Navigate to="/contact"/>
        }
    ],
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={routes}/>
  </React.StrictMode>
)
