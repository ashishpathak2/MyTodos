import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'
import Context from './contexts/Context.jsx'
import ForgotPassword from './components/ForgotPassword.jsx'
import ResetPasword from './components/ResetPasword.jsx'


const router = createBrowserRouter([


  {
    path: "/",
    element: <App />
  },

  {
    path: "/forgetPassword",
    element: <ForgotPassword />
  },

  
  {
    path: "/resetPassword",
    element: <ResetPasword/>
  }





])


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Context>
      {/* <App /> */}
      <RouterProvider router={router} />

    </Context>
  </React.StrictMode>,
)


