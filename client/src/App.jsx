import './App.css'
import { Route, Routes } from "react-router-dom"
import IndexPage from './pages/IndexPage'
import LoginPage from './pages/LoginPage'
import Layout from './Layout'
import RegisterPage from './pages/RegisterPage'
import axios from 'axios'
import { UserContext, UserContextProvider } from './UserContext'
import { useEffect } from 'react'
import AccountPage from './pages/AccountPage'

// axios.defaults.baseURL = 'http://10.7.222.128:4000'
axios.defaults.baseURL = 'http://192.168.94.65:4000'
axios.defaults.withCredentials = true

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<IndexPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/account/:subpage?" element={<AccountPage/>} />
          <Route path="/account/:subpage/:action" element={<AccountPage/>} />
          {/* <Route path="/account/orders" element={<AccountPage/>} />
          <Route path="/account/places" element={<AccountPage/>} /> */}



        </Route>
      </Routes>
    </UserContextProvider>
  )
}

export default App
