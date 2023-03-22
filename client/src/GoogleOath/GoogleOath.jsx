import {useEffect, useState} from "react";
import jwt_decode from "jwt-decode"

export default function GoogleOath() {
    const [Email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);
    function handleCallbackResponse (response) {
        console.log("Encoded JWT ID token : " + response.credential)
        let userObject = jwt_decode(response.credential)
        console.log (userObject)
        setEmail(userObject.email)
        console.log (Email)
    }
    useEffect(() => {
        /*global google*/
        google.accounts.id.initialize({
            client_id: "791692667249-nmnqlc4hngv4uj591103ba96arn0vloa.apps.googleusercontent.com",
            callback: handleCallbackResponse
        })

        google.accounts.id.renderButton(
            document.getElementById("signInDiv"),
            {theme: "outline", size: "large"}
        )
    }, [])

    return (
        <div>
            <div id="signInDiv"></div>
        </div>
    )
}