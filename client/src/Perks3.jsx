export default function Perks3({selected, onChange}) {
    function handleCbClick (ev) {
        const {checked, name} = ev.target;
        if (checked) {
            onChange([...selected, name])
        } else {
            onChange([...selected.filter(selectedName => selectedName != name)])
        }
        // onChange([...selected, name])

    }
    return (
        <>
            <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
                <input type="checkbox" checked={selected.includes("Anime | ")} name="Anime | " onChange={handleCbClick} />
                <span>Anime</span>
            </label>
            <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
                <input type="checkbox" checked={selected.includes("Cyberpunk | ")} name="Cyberpunk | " onChange={handleCbClick} />
                <span>Cyberpunk</span>
            </label>
            <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
                <input type="checkbox" checked={selected.includes("Cars | ")} name="Cars | " onChange={handleCbClick} />
                <span>Cars</span>
            </label>
            <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
                <input type="checkbox" checked={selected.includes("Motivational | ")} name="Motivational | " onChange={handleCbClick} />
                <span>Motivational</span>
            </label>
            <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
                <input type="checkbox" checked={selected.includes("Sports & Fitness | ")} name="Sports & Fitness | " onChange={handleCbClick} />
                <span>Sports & Fitness</span>
            </label>
            <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
                <input type="checkbox" checked={selected.includes("Movie | ")} name="Movie | " onChange={handleCbClick} />
                <span>Movie</span>
            </label>
            <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
                <input type="checkbox" checked={selected.includes("K-Pop_K-Drama | ")} name="K-Pop_K-Drama | " onChange={handleCbClick} />
                <span>K-Pop_K-Drama</span>
            </label>
            <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
                <input type="checkbox" checked={selected.includes("Games | ")} name="Games | " onChange={handleCbClick} />
                <span>Games</span>
            </label>
            <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
                <input type="checkbox" checked={selected.includes("Music | Music_Bands | ")} name="Music | Music_Bands | " onChange={handleCbClick} />
                <span>Music | Music_Bands</span>
            </label>
            <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
                <input type="checkbox" checked={selected.includes("Others | ")} name="Others | " onChange={handleCbClick} />
                <span>Others</span>
            </label>
        </>
    )
}