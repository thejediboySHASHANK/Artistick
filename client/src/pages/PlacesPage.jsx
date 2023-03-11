import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import Perks from "../Perks";
import axios from "axios";

export default function PlacesPage() {
    const { action } = useParams();
    const [title, setTitle] = useState('')
    const [address, setAddress] = useState('')
    const [addedPhotos, setAddedPhotos] = useState([])
    const [photoLink, setPhotoLink] = useState('')
    const [description, setDescription] = useState('')
    const [perks, setPerks] = useState([])
    const [extrainfo, setExtraInfo] = useState('')

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
    async function addPhotoByLink(ev) {
        ev.preventDefault()
        const { data: filename } = await axios.post('/upload-by-link', { link: photoLink })
        setAddedPhotos(prev => {
            return [...prev, filename]
        })
        setPhotoLink('')
    }
    function uploadPhoto(ev) {
        const files = ev.target.files
        const data = new FormData()
        for (let i = 0; i < files.length; i++) {
            data.append('photos', files[i])

        }
        axios.post('/upload', data, {
            headers: { 'Content-Type': 'multipart/form-data' }
        }).then(response => {
            const { data: filenames } = response
            setAddedPhotos(prev => {
                return [...prev, ...filenames]
            })
        })
    }

    return (
        <div>
            {action !== 'form' && (
                <div className="text-center">
                    <Link className="inline-flex gap-1 bg-primary text-white py-2 px-6 rounded-full" to={'/account/places/form'}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>

                        Add New Design
                    </Link>
                </div>
            )}
            {action === 'form' && (
                <div>
                    <form>
                        {preInput('Title', 'Title for your design, try to make it catchy for better advertisment')}
                        {/* <h2 className="text-2xl mt-4">Title</h2>
                        <p className="text-gray-500 text-sm">Title for your design, try to make it catchy for better advertisment</p> */}
                        <input type="text" value={title} onChange={ev => setTitle(ev.target.value)} placeholder="title, for example: My dashing design" />

                        {preInput('Address', 'Please Enter your city/district')}
                        {/* <h2 className="text-2xl mt-4">Address</h2>
                        <p className="text-gray-500 text-sm">Please Enter your city/district</p> */}
                        <input type="text" value={address} onChange={ev => setAddress(ev.target.value)} placeholder="city" />

                        {preInput('Photos', 'more = better')}
                        {/* <h2 className="text-2xl mt-4">Photos</h2>
                        <p className="text-gray-500 text-sm">more = better</p> */}
                        <div className="flex gap-2">
                            <input
                                value={photoLink}
                                onChange={ev => setPhotoLink(ev.target.value)}
                                type="text" placeholder={'Add using a link...jpg'} />
                            <button onClick={addPhotoByLink} className="bg-gray-200 px-4 rounded-2xl">Add&nbsp;photo</button>
                        </div>
                        <div className="mt-2 grid gap-2 grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                            {addedPhotos.length > 0 && addedPhotos.map(link => (
                                <div className="h-32 flex">
                                    <img className="rounded-2xl w-full object-cover" src={'http://localhost:4000/uploads/' + link} alt="" />
                                </div>
                            ))}
                            <label className="h-32 cursor-pointer flex items-center gap-1 justify-center border bg-transparent rounded-2xl p-2 text-2xl text-gray-600">
                                <input type="file" multiple className="hidden" onChange={uploadPhoto} />
                                <svg xmlns="https://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
                                </svg>
                                Upload
                            </label>
                        </div>

                        {preInput('Description', 'description of the design')}
                        {/* <h2 className="text-2xl mt-4">Description</h2>
                        <p className="text-gray-500 text-sm">description of the design</p> */}
                        <textarea value={description} onChange={ev => setDescription(ev.target.value)} />

                        {preInput('Features', 'select all the Features you would like to have')}
                        {/* <h2 className="text-2xl mt-4">Features</h2>
                        <p className="text-gray-500 text-sm">select all the Features you would like to have</p> */}
                        <div className="grid mt-2 gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
                            <Perks selected={perks} onChange={setPerks} />
                        </div>

                        {preInput('Extra info', 'Genre of poster, eg : Anime, cyberpunk, etc...')}
                        {/* <h2 className="text-2xl mt-4">Extra info</h2>
                        <p className="text-gray-500 text-sm">Genre of poster, eg : Anime, cyberpunk, etc...</p> */}
                        <textarea value={extrainfo} onChange={ev => setExtraInfo(ev.target.value)} />
                        <button className="primary my-4">Save</button>
                    </form>
                </div>
            )}
        </div>
    )
}