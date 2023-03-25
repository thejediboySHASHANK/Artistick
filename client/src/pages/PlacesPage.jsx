import {Link, Navigate, useParams} from "react-router-dom";
import AccountNav from "../AccountNav.jsx";
import {useEffect, useState} from "react";
import axios from "axios";
import PlaceImg from "../PlaceImg.jsx";
import HeroAnimation from "../Hero/HeroAnimation.jsx";


export default function PlacesPage() {
    const [places, setPlaces] = useState([])
    useEffect(() => {
        axios.get('/user-designs').then(({data}) => {
            setPlaces(data)
        })
    }, [])

    return (
        <div className="mx-auto" style={{maxWidth: "1000px"}}>
            <AccountNav/>
            {/*<HeroAnimation />*/}
            <div className="text-center">

                <Link className="inline-flex gap-1 bg-primary text-white py-2 px-6 rounded-full"
                      to={'/account/places/form'}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                         stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15"/>
                    </svg>

                    Add New Design
                </Link>
            </div>
            <div className="mt-4">
                {places.length > 0 && places.map(place => (
                    <Link to={'/account/places/'+place._id} className="flex cursor-pointer gap-4 bg-gray-100 p-4 rounded-2xl mt-4">
                        <div className="flex w-30 h-48 bg-gray-300 aspect-auto shrink-0 md:w-48">
                            {/*{place.photos.length > 0 && (*/}
                            {/*    <img className='object-cover aspect-square' src={'http://localhost:4000/uploads/' + place.photos[0]}*/}
                            {/*         alt=""/>*/}
                            {/*)}*/}
                            <PlaceImg place={place}/>
                        </div>
                        <div className="grow-0 shrink">
                            <h2 className="text-xl">{place.title}</h2>
                            <p className="text-sm mt-2">{place.description}</p>
                            <p className="text-sm mt-2">Public : {place.visibility}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}