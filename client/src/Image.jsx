export default function Image({src, ...rest}) {
    src = src && src.includes('https://')
        ? src
        : 'http://localhost:4000/API/uploads/'+src
    return (
        <img {...rest} src={src} alt={''} />
    )
}