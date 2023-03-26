import {useContext, useEffect, useState} from "react";
import axios from "axios";
import {Navigate} from "react-router-dom";
import {useNavigate} from "react-router-dom";
import {UserContext} from "./UserContext.jsx";
import Swal from "sweetalert2";

export default function BookingWidget({design}) {
    const [numberOfOrders, setNumberOfOrders] = useState(1)
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [redirect, setRedirect] = useState('')
    const [address, setAddress] = useState('')
    const {user} = useContext(UserContext)
    const [deliveryStatus, setDeliveryStatus] = useState('Shipping')
    const [DateOfBooked, setDateOfBooked] = useState(new Date(new Date().getTime() - new Date().getTimezoneOffset()*60*1000))
    const Nav = useNavigate()
    useEffect(() => {
        if (user) {
            setName(user.name)
        }
    }, [user])

    function Check () {
        Swal.fire({
            title: 'Confirm Booking?',
            text: "You won't be able to revert this! " +
                "Payment will be done through Cash/UPI On Delivery",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, just order already'
        }).then((result) => {
            if (result.isConfirmed) {
                if (user === null) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Login/Signup Required',
                    })
                    Nav("/login")
                }
                else {
                    bookThisDesign()
                }

            }
        })
    }
    async function bookThisDesign() {
        if (name === '') {
            Swal.fire({
                icon: 'error',
                title: 'Field Missing',
                text: 'Name field is missing'
            })
            return;
        }
        if (phone === '') {
            Swal.fire({
                icon: 'error',
                title: 'Field Missing',
                text: 'Phone field is missing, we need phone number to process orders'
            })
            return;
        }
        if (address === ''){
            Swal.fire({
                icon: 'error',
                title: 'Field Missing',
                text: 'Address field is missing, we need address to process & deliver orders'
            })
            return;
        }

        const response = await axios.post('/orders', {
            numberOfOrders, name, phone,
            design: design._id,
            price: numberOfOrders * design.price,
            deliveryStatus,
            address,
            DateOfBooked
        })
        const newSales = design.sales + numberOfOrders

        await axios.put (`/places/${design._id}/sales`, {sales: newSales})
        const orderId = response.data._id
        setRedirect(`/account/orders/${orderId}`)
    }

    if (redirect) {
        return <Navigate to={redirect}/>

    }

    return (
        <div className="bg-white shadow p-4 rounded-2xl my-4">
            <div className="text-2xl text-center">
                Price : ₹{design.price}/per poster (COD)
            </div>
            <div className="border rounded-2xl mt-2">
                <div className="py-3 px-4">
                    <label>Number of orders:</label>
                    <input type="number" value={numberOfOrders} onChange={ev => setNumberOfOrders(ev.target.value)}/>
                </div>
                {numberOfOrders >= 1 && (
                    <div className="py-3 px-4 border-t">
                        <label>Your full name : </label>
                        <input type="text" value={name} onChange={ev => setName(ev.target.value)}/>
                        <label>Phone Number : </label>
                        <input type="tel" value={phone} onChange={ev => setPhone(ev.target.value)} required/>
                        <label>Hostel name and room : </label>
                        <input type="text" value={address} onChange={ev => setAddress(ev.target.value)} required/>
                    </div>
                )}
            </div>
            <button onClick={Check} className="primary my-2">
                Book Now :
                <span> ₹{numberOfOrders * design.price}</span>
            </button>
        </div>
    )
}