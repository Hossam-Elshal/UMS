import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AuthLayout from './components/AuthLayout/AuthLayout'
import Login from './components/Login/Login'
import MasterLayout from './components/MasterLayout/MasterLayout'
import Home from './components/Home/Home'
import UsersList from './components/UsersList/UsersList'
import UserData from './components/UserData/UserData'
import Profile from './components/Profile/Profile'
import Notfound from './components/Notfound/Notfound'
import {ToastContainer } from 'react-toastify'

function App() {

  const routes = createBrowserRouter([
    {
      path:'/',
      element:<AuthLayout/>,
      errorElement:<Notfound/>,
      children:[
        {index:true, element:<Login/>},
        {path:'login', element:<Login/>},
      ]
    },
    {
      path:'dashboard',
      element:<MasterLayout/>,
      errorElement:<Notfound/>,
      children:[
        {index:true, element:<Home/>},
        {path:'home', element:<Home/>},
        {path:'users', element:<UsersList/>},
        {path:'userData/new-user', element:<UserData/>},
        {path:'userData/:id?', element:<UserData/>},
        {path:'profile', element:<Profile/>},
      ]
    }
  ])

  return(
    <>
        <ToastContainer />
        <RouterProvider router={routes}></RouterProvider>
    </>
  ) 
}

export default App
