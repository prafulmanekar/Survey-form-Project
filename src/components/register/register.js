import React, { useState } from "react"
import "./register.css"
import axios from "axios"
import { useNavigate } from "react-router-dom"

const Register = () => {

    const navigate = useNavigate()

    const [user, setUser] = useState({
        username: "",
        email: "",
        phone: '',
        profession: '',
        password: "",
        reEnterPassword: ""
    })

    const handleChange = e => {
        const { name, value } = e.target
        setUser({
            ...user,
            [name]: value
        })
    }

    const register = () => {
        const { username, email, phone, profession, password, reEnterPassword } = user

        if (username && email && password && (password === reEnterPassword) && phone.length === 10) {
            axios.post("https://survey-form-project-backend.onrender.com/register", user)
                .then(res => {
                    navigate("/login")
                })
        } else {
            alert("invalid input")
        }

    }

    return (<div className="register-container">
        <div className="register-flavor-text">
            Welcome to
            Create Survey
            WebSite
        </div>
        <div className="register">
            <h1>Register</h1>
            <input type="text" name="username" value={user.username} placeholder="Your Name" onChange={handleChange}></input>
            <input type="text" name="email" value={user.email} placeholder="Your Email" onChange={handleChange}></input>
            <input type="number" name="phone" value={user.phone} placeholder="Your Phone" onChange={handleChange}></input>
            <input type="text" name="profession" value={user.profession} placeholder="Your Profession" onChange={handleChange}></input>
            <input type="text" name="password" value={user.password} placeholder="Your Password" onChange={handleChange}></input>
            <input type="text" name="reEnterPassword" value={user.reEnterPassword} placeholder="Re-enter Password" onChange={handleChange}></input>
            <div className="button" onClick={register} >Register</div>
            <div>or</div>
            <div className="button" onClick={() => navigate("/login")}>Login</div>
        </div>
    </div>
    )


}

export default Register