import {useContext, useEffect, useState} from "react";
import jwt_decode from "jwt-decode"
import axios from "axios";
import Swal from "sweetalert2";
import {useNavigate} from "react-router-dom";
import {UserContext} from "../UserContext.jsx";

export default function GoogleOathLogin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {setUser} = useContext(UserContext);
    const navigate = useNavigate()
    function handleCallbackResponse (response) {
        console.log("Encoded JWT ID token : " + response.credential)
        let userObject = jwt_decode(response.credential)
        console.log (userObject)
        setEmail(userObject.email)
        setPassword(userObject.given_name+ userObject.email + userObject.family_name)
        handleLoginSubmit()
        async function handleLoginSubmit() {
            try {
                const {data} = await axios.post('/login', { email, password })
                setUser(data);
                Swal.fire(
                    'Good job!',
                    'Login Successful',
                    'success'
                )
                navigate('/')
            } catch (e) {
                console.log (e);
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: e.response.data
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