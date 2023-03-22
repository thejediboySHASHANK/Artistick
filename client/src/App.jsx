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

axios.defaults.baseURL = 'http://10.6.134.197:4000'
axios.defaults.withCredentials = true

function App() {
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
                    <Route path="/account/orders" element={<OrdersPage/>}/>
                    <Route path="/account/orders/:id" element={<OrderPage/>}/>
                    <Route path="/beta" element={<HeroAnimation/>}/>


                </Route>
            </Routes>
        </UserContextProvider>
    )
}

export default App
