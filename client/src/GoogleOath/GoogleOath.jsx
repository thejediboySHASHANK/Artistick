import {useEffect, useState} from "react";
import jwt_decode from "jwt-decode"
import axios from "axios";
import Swal from "sweetalert2";
import {useNavigate} from "react-router-dom";
import GoogleOathLogin from "./GoogleOathLogin.jsx";

export default function GoogleOath() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);
    const navigate = useNavigate()
    function handleCallbackResponse (response) {
        console.log("Encoded JWT ID token : " + response.credential)
        let userObject = jwt_decode(response.credential)
        console.log (userObject)
        setName(userObject.given_name+ ' ' + userObject.family_name)
        setEmail(userObject.email)
        setPassword(userObject.given_name+ userObject.email + userObject.family_name)
        RegisterUser()
        async function RegisterUser() {
            try {
                await axios.post('/register', {
                    name,
                    email,
                    password
                })
                Swal.fire(
                    'Good job!',
                    'You can now login!',
                    'success'
                )
                GoogleOathLogin({email, password})

            } catch (e) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: e
                })
            }

        }

    }
    console.log (password)
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