import {Link} from "react-router-dom";
import Head from "../Header";
import {useEffect, useState} from "react";
import axios from "axios";
import HeroAnimation from "../Hero/HeroAnimation.jsx";

export default function IndexPage() {
    const [designs, setDesigns] = useState([])
    useEffect(() => {
        axios.get('/places').then(res => {
            console.log(res.data)
            setDesigns(res.data)
        })
    }, [])
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
                        <h2 className="text-lg truncate">{design.title}</h2>
                        <div className="mt-1 lg: text-2xl">
                            <span className="">₹{design.price}</span>
                        </div>
                    </Link>
                ))}
            </div>
        </div>

    );
}