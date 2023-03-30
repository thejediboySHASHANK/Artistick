import {Link, Navigate, useNavigate} from "react-router-dom";
import {UserContext} from "./UserContext";
import {useContext, useEffect, useState} from "react";
import "./Responsive/Header.css"

export default function Head() {
    const {user} = useContext(UserContext);
    const [searchBar, setSearchBar] = useState(false)
    const [query, setQuery] = useState('')
    if (searchBar) {
        return (
            <div className="bg-gray-100 p-4 rounded-2xl md:p-28 lg:p-28">
                <button onClick={() => setSearchBar(false)}
                        className="fixed left-12 top-8 flex gap-1 py-2 px-4 rounded-2xl shadow shadow-black bg-white text-black">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                         className="w-6 h-6">
                        <path fillRule="evenodd"
                              d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
                              clipRule="evenodd"/>
                    </svg>
                    Close Search
                </button>
                <div className="flex justify-around gap-10 mt-16 md:-mt-10">
                    <input type={'text'} value={query} onChange={ev => setQuery(ev.target.value)} className="border border-gray-500"/>
                    <Link onClick={() => setSearchBar(false)} to={'/search/'+query}><button className="rounded-2xl text-sm p-4 bg-gray-300 hover:bg-black hover:text-white md:text-3xl lg:text-3xl">Search</button></Link>

                </div>
                    <div className="text-sm mt-14 flex justify-around md:text-2xl lg:text-2xl lg:mt-5">Choose Your Favourite Category</div>
                    <Link onClick={() => setSearchBar(false)} to={'/anime'} className="flex justify-around mt-4 rounded-2xl text-lg p-2 bg-gray-300 hover:bg-black hover:text-white md:text-3xl lg:text-3xl">Anime</Link>
                    <Link onClick={() => setSearchBar(false)} to={'/CyberPunk'} className="flex justify-around mt-4 rounded-2xl text-lg p-2 bg-gray-300 hover:bg-black hover:text-white md:text-3xl lg:text-3xl">Cyberpunk</Link>
                    <Link onClick={() => setSearchBar(false)} to={'/Cars'} className="flex justify-around mt-4 rounded-2xl text-lg p-2 bg-gray-300 hover:bg-black hover:text-white md:text-3xl lg:text-3xl">Cars</Link>
                    <Link onClick={() => setSearchBar(false)} to={'/Games'} className="flex justify-around mt-4 rounded-2xl text-lg p-2 bg-gray-300 hover:bg-black hover:text-white md:text-3xl lg:text-3xl">Games</Link>
                    <Link onClick={() => setSearchBar(false)} to={'/Motivational'} className="flex justify-around mt-4 rounded-2xl text-lg p-2 bg-gray-300 hover:bg-black hover:text-white md:text-3xl lg:text-3xl">Motivational</Link>
                    <Link onClick={() => setSearchBar(false)} to={'/Sports & Fitness'} className="flex justify-around mt-4 rounded-2xl text-lg p-2 bg-gray-300 hover:bg-black hover:text-white md:text-3xl lg:text-3xl">Sports & Fitness</Link>
                    <Link onClick={() => setSearchBar(false)} to={'/Movie'} className="flex justify-around mt-4 rounded-2xl text-lg p-2 bg-gray-300 hover:bg-black hover:text-white md:text-3xl lg:text-3xl">Movie</Link>
                    <Link onClick={() => setSearchBar(false)} to={'/K-Pop_K-Drama'} className="flex justify-around mt-4 rounded-2xl text-lg p-2 bg-gray-300 hover:bg-black hover:text-white md:text-3xl lg:text-3xl">K-Pop / K-Drama</Link>
                    <Link onClick={() => setSearchBar(false)} to={'/Music | Music_Bands'} className="flex justify-around mt-4 rounded-2xl text-lg p-2 bg-gray-300 hover:bg-black hover:text-white md:text-3xl lg:text-3xl">Music | Music_Bands</Link>
                    <Link onClick={() => setSearchBar(false)} to={'/Others'} className="flex justify-around mt-4 rounded-2xl text-lg p-2 bg-gray-300 hover:bg-black hover:text-white md:text-3xl lg:text-3xl">Others</Link>

            </div>

        )
    }
    return (
        <header className="flex justify-between">
            <Link to={'/'} href="" className="flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                     stroke="currentColor" className="w-8 h-8 -rotate-90">
                    <path strokeLinecap="round" strokeLinejoin="round"
                          d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"/>
                </svg>
                <span className="font-bold text-xl">Artistick</span>
            </Link>
            <div onClick={() => setSearchBar(true)} className="cursor-pointer flex gap-2 border border-gray-300 rounded-full py-2 px-4 shadow-md shadow-gray-300 md:py-4 lg:ml-44">
                <div className="hidden md:flex">Express, Explore</div>
                <div className="border-l border-gray-300 hidden md:flex"></div>
                <div className="hidden md:flex">Your Amazing</div>
                <div className="border-l border-gray-300 hidden md:flex"></div>
                <div className="hidden md:flex">Artistick</div>
                <button className="bg-primary text-white p-1 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                         stroke="currentColor" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round"
                              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"/>
                    </svg>
                </button>
            </div>

            <div className="mobile flex items-center rounded-full md:gap-2">
                <Link to={'/'} className="flex border border-gray-300 rounded-2xl py-2 px-4 items-center mr-2 md:mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                         stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round"
                              d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"/>
                    </svg>
                </Link>
                <Link to={'/cart'} className="flex border border-gray-300 rounded-2xl py-2 px-4 items-center mr-2 md:mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                    </svg>

                </Link>
                <Link to={user ? "/account" : "/login"}
                      className="flex py-2 px-4 border border-gray-300 rounded-full gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                         stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round"
                              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"/>
                    </svg>
                    <div className="bg-gray-500 text-white rounded-full border border-gray-500 overflow-hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                             className="w-6 h-6 relative top-1">
                            <path fillRule="evenodd"
                                  d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
                                  clipRule="evenodd"/>
                        </svg>
                    </div>
                    {!!user && (
                        <div>
                            {user.name.split(' ')[0]}
                        </div>
                    )}
                </Link>
            </div>

        </header>
    );
}