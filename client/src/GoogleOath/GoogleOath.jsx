import {useEffect, useState} from "react";
import jwt_decode from "jwt-decode"
import axios from "axios";
import Swal from "sweetalert2";
import {useNavigate} from "react-router-dom";
import GoogleOathLogin from "./GoogleOathLogin.jsx";

export default function GoogleOath() {
    const [names, setName] = useState('')
    const [emails, setEmail] = useState('');
    const [passwords, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);
    const navigate = useNavigate()
    async function handleCallbackResponse (response) {
        try {
            console.log("Encoded JWT ID token : " + response.credential)
            let userObject = jwt_decode(response.credential)
            console.log (userObject)
            setName(userObject.given_name+ ' ' + userObject.family_name)
            setEmail(userObject.email)
            setPassword(userObject.given_name+ userObject.email + userObject.family_name)

            await axios.post('/register', {
                name:(userObject.given_name+ ' ' + userObject.family_name),
                email:(userObject.email),
                password:(userObject.given_name+ userObject.email + userObject.family_name)
            })
            Swal.fire(
                'Good job!',
                'You can now login!',
                'success'
            )
            navigate('/login')
        } catch (e) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Account Already Exists, Please Login'
            })
        }
    }

    console.log (passwords)
    useEffect(() => {
        /*global google*/
        google.accounts.id.initialize({
            client_id: "791692667249-nmnqlc4hngv4uj591103ba96arn0vloa.apps.googleusercontent.com",
            callback: handleCallbackResponse
        })

        google.accounts.id.renderButton(
            document.getElementById("signInDiv"),
            {theme: "outline", size: "large", customSize: "large"}
        )
    }, [])

    return (
        <div className="App">
            <div id="signInDiv">
            </div>
        </div>
    )
}