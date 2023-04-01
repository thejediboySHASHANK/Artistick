import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import BookingWidget from "../BookingWidget.jsx";
import PlaceGallery from "../PlaceGallery.jsx";
import AddressLink from "../AddressLink.jsx";
import Layout from "../Layout.jsx";

export default function PlacePage() {
    const {id} = useParams()
    console.log(id)
    const [design, setDesign] = useState(null)
    useEffect(() => {
        if (!id) {
            return;
        }
        axios.get(`/places/${id}`).then(res => {
            setDesign(res.data)
        })
        // Increment view count
        axios.put(`/places/${id}/views`).then(res => {
            console.log('View count incremented');
        });

    }, [id])

    if (!design) {
        return ''
    }
    return (
        <div className="mt-4 mx-auto bg-gray-100 px-5 py-5 rounded-2xl md:px-8 md:py-8 lg:px-8 lg:py-8 "
             style={{maxWidth: "1000px"}}>
            <h1 className="text-3xl">{design.title}</h1>
            <AddressLink>{design.address}</AddressLink>
            <PlaceGallery design={design}/>
            <div className="mt-8 grid gap-8 grid-cols-1 md:grid-cols-[2fr_1fr]">
                <BookingWidget design={design}/>
                <div>
                    <div className="my-4">
                        <h2 className="font-semibold text-2xl">Description</h2>
                        {design.description}
                    </div>
                    <div className="text-xl text-gray-700 mt-5">Categories : {design.extraInfo}</div>
                </div>
            </div>

            <div className="bg-white mt-4 -mx-5 px-5 py-5 md:-mx-8 md:px-8 md:py-8 border-t">
                <div>
                    <h2 className="font-semibold text-2xl">Terms & Conditions : </h2>
                </div>
                <div className="mb-4 mt-2 text-sm text-gray-700 leading-5">Privacy Policy: We take your privacy
                    seriously and will never share your personal information with third parties. We only use your
                    information to process your orders and improve our services.
                </div>
                <div className="mb-4 mt-2 text-sm text-gray-700 leading-5">Dispute Resolution: Any disputes arising out
                    of or in connection with these Terms and Conditions shall be resolved in a polite manner through
                    negotiation between the parties. If the dispute cannot be resolved through negotiation, the parties
                    agree to submit to the exclusive jurisdiction of the courts in the jurisdiction in which our startup
                    is located.
                </div>

            </div>
        </div>

    )
}