import "./hero.css"
import {useEffect} from "react";

export default function HeroAnimation() {
    useEffect(() => {
        const left = document.getElementById("left-side");

        const handleMove = e => {
            left.style.width = `${e.clientX / window.innerWidth * 100}%`;
        }

        document.onmousemove = e => handleMove(e);

        document.ontouchmove = e => handleMove(e.touches[0]);
    }, [])
    return (
        <div className="mt-6 relative">
            <div id="left-side" className="side rounded-3xl">
                <h2 className="title p-4">
                    Upload, Refer and Earn with
                    <span className="fancy"> Artistick.com<span className="tick"></span></span>
                </h2>
                {/*<h2 className="flex relative text-white">Know More</h2>*/}
            </div>
            <div id="right-side" className="side rounded-3xl">
                <h2 className="title p-4">
                    Express, Explore Your Amazing
                    <span className="fancy underline"> Posters</span>
                </h2>
                {/*<h2 className="flex relative text-white">Know More</h2>*/}
            </div>
        </div>
    )
}