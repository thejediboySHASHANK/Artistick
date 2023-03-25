import './App.css'
import {Route, Routes} from "react-router-dom"
import IndexPage from './pages/IndexPage'
import LoginPage from './pages/LoginPage'
import Layout from './Layout'
import RegisterPage from './pages/RegisterPage'
import axios from 'axios'
import {UserContext, UserContextProvider} from './UserContext'
import ProfilePage from './pages/ProfilePage.jsx'
import PlacesPage from "./pages/PlacesPage.jsx";
import PlacesFormPage from "./pages/PlacesFormPage.jsx";
import PlacePage from "./pages/PlacePage.jsx";
import OrdersPage from "./OrdersPage.jsx";
import OrderPage from "./OrderPage.jsx";
import HeroAnimation from "./Hero/HeroAnimation.jsx";
import GoogleOath from "./GoogleOath/GoogleOath.jsx";
import Darkmode from "darkmode-js/src";
import Cart from "./Cart/Cart.jsx";
import {useEffect} from "react";
import SubPage from "./pages/Subpage.jsx";

axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL
axios.defaults.withCredentials = true

function App() {
    useEffect(() => {
        let isMobile = window.innerWidth <= 550;
        const options = {
            bottom: isMobile ? '5px' :  '32px', // default: '32px'
            right: isMobile ? 'unset' : '25px', // default: '32px'
            left: isMobile ? '25px' : 'unset', // default: 'unset'
            time: '0.5s', // default: '0.3s'
            mixColor: '#fff', // default: '#fff'
            backgroundColor: '#fff',  // default: '#fff'
            buttonColorDark: '#100f2c',  // default: '#100f2c'
            buttonColorLight: '#fff', // default: '#fff'
            saveInCookies: true, // default: true,
            label: '🌓', // default: ''
            autoMatchOsTheme: true // default: true
        }
        new Darkmode(options).showWidget();
    }, [])

    return (
        <UserContextProvider>
            <Routes>
                <Route path="/" element={<Layout/>}>
                    <Route index element={<IndexPage/>}/>
                    <Route path="/login" element={<LoginPage/>}/>
                    <Route path="/register" element={<RegisterPage/>}/>
                    <Route path="/account/" element={<ProfilePage/>}/>
                    <Route path="/account/places" element={<PlacesPage/>}/>
                    <Route path="/account/places/form" element={<PlacesFormPage/>}/>
                    <Route path="/account/places/:id" element={<PlacesFormPage/>}/>
                    <Route path="/design/:id" element={<PlacePage/>}/>
                    <Route path="/:category" element={<SubPage/>}/>
                    <Route path="/account/orders" element={<OrdersPage/>}/>
                    <Route path="/account/orders/:id" element={<OrderPage/>}/>
                    <Route path="/beta" element={<HeroAnimation/>}/>
                    <Route path="/google" element={<GoogleOath/>}/>
                    <Route path="/cart" element={<Cart/>}/>
                </Route>
            </Routes>
        </UserContextProvider>
    )
}

export default App
