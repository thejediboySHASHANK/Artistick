import { useState } from "react";
import {Link, Navigate} from "react-router-dom";
import axios from "axios"
import Swal from "sweetalert2";
import {useNavigate} from "react-router-dom";

export default function RegisterPage() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()
    async function RegisterUser(ev) {
        ev.preventDefault();
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
            navigate('/login')

        } catch (e) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: e
            })
        }

    }

    return (
        <div className="mt-4 grow flex items-center justify-around">
            <div className="mb-64">
                <h1 className="text-4xl text-center mb-4">Register</h1>
                <form className="max-w-xl mx-auto" onSubmit={RegisterUser}>
                    <input type="text"
                        placeholder="Your Name"
                        value={name}
                        onChange={ev => setName(ev.target.value)} />

                    <input type="email"
                        placeholder="your@email.com"
                        value={email}
                        onChange={ev => setEmail(ev.target.value)} />

                    <input type="password"
                        placeholder="password"
                        value={password}
                        onChange={ev => setPassword(ev.target.value)} />

                    <button className="primary">Register</button>
                    <div className="text-center py-2 text-gray-500">
                        Already a member? <Link className="underline text-black" to={"/login"}>Login</Link>
                    </div>
                </form>

            </div>

        </div>
    );
}