import AccountNav from "./AccountNav.jsx";
import {useEffect, useState} from "react";
import axios from "axios";
import PlaceImg from "./PlaceImg.jsx";
import {Link} from "react-router-dom";

export default function OrdersPage() {
    const [orders, setOrders] = useState([])
    const [date, setDate] = useState(new Date())
    useEffect(() => {
        axios.get('/orders').then(res => {
            setOrders(res.data)
        })
    }, [])

    return (
        <div>
            <AccountNav />
            <div className="mx-auto" style={{maxWidth: "1000px"}}>
                {orders?.length > 0 && orders
                    .sort((a, b) => new Date(b.DateOfBooked) - new Date(a.DateOfBooked))
                    .map (order => (
                    <Link to={`/account/orders/${order._id}`} className="flex gap-4 bg-gray-200 rounded-2xl overflow-hidden mt-4">
                        <div className="w-28 md:w-48">
                            <PlaceImg place={order.design} />
                        </div>
                        <div className="py-3 grow">
                            <h2 className="text-xl">{order.design.title}</h2>
                            <div className="border-t border-gray-300 mt-2 py-5">
                                <div>
                                    Number Of Orders : {order.numberOfOrders} |
                                    Date Ordered :  {order.DateOfBooked}
                                </div>
                            </div>
                            <div className="text-sm flex gap-2 md:text-xl">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                                </svg>
                                <span className="hidden md:flex">Delivery Status : </span><span className="underline">{order.deliveryStatus}</span> |
                                Total price : ₹{order.price}<br/>
                            </div>
                            <div className="text-sm mt-2 text-gray-500">
                                (usually takes 1-2 days to deliver)
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}