import {Link} from "react-router-dom";
import Head from "../Header";
import {useEffect, useState} from "react";
import axios from "axios";
import HeroAnimation from "../Hero/HeroAnimation.jsx";


export default function IndexPage() {
    const [designs, setDesigns] = useState([])
    const [cartItems, setCartItems] = useState([])
    useEffect(() => {
        axios.get('/places').then(res => {
            setDesigns(res.data)
        })
    }, [])

    function handleCartItems (ev, value) {
        ev.preventDefault()
        setCartItems ([...cartItems, value])
        console.log (value)
    }
    console.log (cartItems)

    return (
        <div>
            <HeroAnimation />
            <div className="spacing"><br/></div>
            <div className="mt-96 grid gap-x-6 gap-y-8 grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4">
                {designs.length > 0 && designs.map(design => (
                    <Link to={'/design/'+design._id}>
                        <div className="bg-gray-300 mb-2 rounded-2xl">
                            {design.photos?.[0] && (
                                <img className="rounded-2xl object-contain aspect-square"
                                     src={'http://localhost:4000/uploads/' + design.photos?.[0]} alt=''/>
                            )}
                        </div>
                        <div className="rounded-2xl px-4 py-2">
                            <h2 className="text-lg truncate mb-1"><a href={'/design/'+design._id} className="hover:text-primary">{design.title}</a></h2>
                            <div className="grid  border-t-4 md:grid-cols-2 lg:grid-cols-[2fr_1fr]">
                                <div className="mt-1 lg:text-2xl p-2">
                                    <span className="">₹{design.price}</span>
                                </div>
                                <div className="p-2">
                                    <button onClick={(ev) => handleCartItems(ev, design._id)} className="primary">Add To Cart</button>
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>

    );
}