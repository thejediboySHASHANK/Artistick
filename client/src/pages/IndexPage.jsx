import {Link} from "react-router-dom";
import Head from "../Header";
import {useEffect, useState} from "react";
import axios from "axios";

export default function IndexPage() {
    const [designs, setDesigns] = useState([])
    useEffect(() => {
        axios.get('/places').then(res => {
            console.log([...res.data, ...res.data])
            setDesigns([...res.data, ...res.data])
        })
    }, [])
    return (
        <div className="mt-8 grid gap-x-6 gap-y-8 grid-cols-2 md:grid-cols-3 lg: grid-cols-4">
            {designs.length > 0 && designs.map(design => (
                <div>
                    <div className="bg-gray-500 mb-2 rounded-2xl">
                        {design.photos?.[0] && (
                            <img className="rounded-2xl object-cover aspect-square"
                                 src={'http://localhost:4000/uploads/' + design.photos?.[0]} alt=''/>
                        )}
                    </div>
                    <h2 className="text-lg truncate">{design.title}</h2>

                </div>
            ))}
        </div>
    );
}