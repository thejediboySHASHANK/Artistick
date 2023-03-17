import PhotosUploader from "../PhotosUploader.jsx";
import Perks from "../Perks.jsx";
import {useState} from "react";
import axios from "axios";
import AccountNav from "../AccountNav.jsx";

export default function PlacesFormPage() {
    const [title, setTitle] = useState('')
    const [address, setAddress] = useState('')
    const [addedPhotos, setAddedPhotos] = useState([])
    const [description, setDescription] = useState('')
    const [perks, setPerks] = useState([])
    const [extrainfo, setExtraInfo] = useState('')
    const [redirect, setRedirect] = useState(false)
    function inputHeader(text) {
        return (
            <h2 className="text-2xl mt-4">{text}</h2>
        )
    }

    function inputDescription(text) {
        return (
            <p className="text-gray-500 text-sm">{text}</p>
        )
    }

    function preInput(header, description) {
        return (
            <>
                {inputHeader(header)}
                {inputDescription(description)}
            </>
        )
    }

    async function addNewPlace(ev) {
        ev.preventDefault();

        await axios.post('/places', {
            title, address, addedPhotos,
            description, perks, extrainfo
        })
        setRedirectToPlacesList(true)
    }

    return (
        <div>
            <AccountNav/>
            <form onSubmit={addNewPlace}>
                {preInput('Title', 'Title for your design, try to make it catchy for better advertisment')}
                <input type="text" value={title} onChange={ev => setTitle(ev.target.value)}
                       placeholder="title, for example: My dashing design"/>

                {preInput('Address', 'Please Enter your city/district')}
                <input type="text" value={address} onChange={ev => setAddress(ev.target.value)} placeholder="city"/>

                {preInput('Photos', 'more = better')}
                <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos}/>

                {preInput('Description', 'description of the design')}
                <textarea value={description} onChange={ev => setDescription(ev.target.value)}/>

                {preInput('Features', 'select all the Features you would like to have')}
                <div className="grid mt-2 gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
                    <Perks selected={perks} onChange={setPerks}/>
                </div>

                {preInput('Extra info', 'Genre of poster, eg : Anime, cyberpunk, etc...')}
                <textarea value={extrainfo} onChange={ev => setExtraInfo(ev.target.value)}/>
                <button className="primary my-4">Save</button>
            </form>
        </div>
    );


}