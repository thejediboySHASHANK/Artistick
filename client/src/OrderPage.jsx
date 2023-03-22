import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import AddressLink from "./AddressLink.jsx";
import PlaceGallery from "./PlaceGallery.jsx";

export default function OrderPage() {
    const {id} = useParams()
    const [order, setOrder] = useState(null)
    useEffect(() =>{
        if (id) {
            axios.get('/orders').then(res => {
                const foundOrder = res.data.find(({_id}) => _id === id)
                if (foundOrder) {
                    setOrder(foundOrder)
                }
            })
        }
    }, [id])
    if (!order) {
        return ''
    }

    return (
        <div className="my-8 mx-auto" style={{maxWidth: "1000px"}}>
            <h1 className="text-3xl">{order.design.title}</h1>
            <AddressLink className="my-2 block">{order.design.address}</AddressLink>
            <div className="bg-gray-200 p-4 mb-4 rounded-2xl p-6 my-6 flex items-center justify-between">
                <div className="text-md gap-2 mt-2 block">
                    <h2 className="text-2xl">Your order information</h2>
                    <div className="flex mt-4 gap-2 text-lg">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                        </svg>
                        Delivery Status : <span className="underline">{order.deliveryStatus}</span> |
                        Number of order(s) : {order.numberOfOrders}
                    </div>
                    <div className="mt-2">Address : {order.address}</div>
                </div>
                <div className="mt-2 bg-primary p-6 text-white rounded-2xl">
                    <div>Total Price</div>
                    <div className="text-3xl">₹{order.price}</div>
                </div>
            </div>
            <PlaceGallery design={order.design}/>
        </div>
    )
}