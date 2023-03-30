import {Link, useLocation} from "react-router-dom";
import Head from "../Header";
import {useEffect, useRef, useState} from "react";
import axios from "axios";
import HeroAnimation from "../Hero/HeroAnimation.jsx";
import Cart from "../Cart/Cart.jsx";
import Image from "../Image.jsx";
import Loading from "../Components/Loading.jsx";


export default function IndexPage() {
    const [designs, setDesigns] = useState([])
    const [cartItems, setCartItems] = useState([])
    const [value, setValue] = useState(1)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        axios.get(`/places/scroll/${value}`).then(res => {
            setDesigns([...designs, ...res.data])
            setLoading(false)
        })

    }, [value])

    const handleInfiniteScroll = async () => {
        try {
            if (window.innerHeight + document.documentElement.scrollTop + 1 >= document.documentElement.scrollHeight) {
                setLoading(true)
                setValue((prev) => prev + 1)
            }
        } catch (error) {
            console.log (error)
        }
    }

    useEffect(() => {
        window.addEventListener("scroll", handleInfiniteScroll)
        return () => window.removeEventListener("scroll", handleInfiniteScroll)
    }, [])

    function handleCartItems(ev, value) {
        ev.preventDefault()
        setCartItems([...cartItems, value])
    }

    console.log(cartItems)
    return (
        <div className="mb-10 md:-mb-10">
            <HeroAnimation/>
            <div className="spacing"><br/></div>
            <h2 className="text-3xl flex justify-center gap-5 italic rounded-2xl py-3">
                <div className="py-1">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                        <path fillRule="evenodd"
                              d="M14.615 1.595a.75.75 0 01.359.852L12.982 9.75h7.268a.75.75 0 01.548 1.262l-10.5 11.25a.75.75 0 01-1.272-.71l1.992-7.302H3.75a.75.75 0 01-.548-1.262l10.5-11.25a.75.75 0 01.913-.143z"
                              clipRule="evenodd"/>
                    </svg>
                </div>
                Best Selling Posters
                <div className="py-1">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                        <path fillRule="evenodd"
                              d="M14.615 1.595a.75.75 0 01.359.852L12.982 9.75h7.268a.75.75 0 01.548 1.262l-10.5 11.25a.75.75 0 01-1.272-.71l1.992-7.302H3.75a.75.75 0 01-.548-1.262l10.5-11.25a.75.75 0 01.913-.143z"
                              clipRule="evenodd"/>
                    </svg>
                </div>

            </h2>
            <div
                className="mt-6 grid gap-x-6 gap-y-8 grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4"
                style={{marginBottom: '40px'}}
            >
                {designs.length > 0 && designs
                    // .sort((a, b) => (0.6*b.views+0.4*b.sales)-(0.6*a.views+0.4*a.sales))
                    .map(design => (
                        <Link to={'/design/' + design._id}>
                            <div className="bg-gray-300 mb-2 rounded-2xl">
                                {design.photos?.[0] && (
                                    <Image className="rounded-2xl object-contain aspect-square"
                                           src={design.photos?.[0]} alt=''/>
                                )}
                            </div>
                            <div className="rounded-2xl px-4 py-2">
                                <h2 className="text-lg truncate mb-1"><a href={'/design/' + design._id}
                                                                         className="hover:text-primary">{design.title}</a>
                                </h2>
                                <div className="grid grid-cols-[1fr_2fr]  border-t-4 md:grid-cols-2 lg:grid-cols-2">
                                    <div className="mt-1 lg:text-2xl p-2">
                                        <span className="">₹{design.price}</span>
                                    </div>
                                    <Link to={'/design/' + design._id} className="p-2">
                                        <button className="primary p-2">Book Now</button>
                                    </Link>
                                </div>
                            </div>
                        </Link>
                    ))}
            </div>
            <Loading />
            <div className="flex justify-center rounded-2xl bg-gray-100 mb-4 p-2 md:text-md md:-p-2">Thanks for scrolling through our posters! Keep an eye out for new releases and contact us if you need help finding the perfect one.</div>
        </div>

    );
}