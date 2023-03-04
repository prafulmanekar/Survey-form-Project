import React, { useState } from "react"
import "./login.css"
import axios from "axios"
import { useNavigate } from "react-router-dom"

const Login = () => {

    const navigate = useNavigate()

    const [user, setUser] = useState({
        email: "",
        password: ""
    })

    const handleChange = e => {
        const { name, value } = e.target
        setUser({
            ...user,
            [name]: value
        })
    }

    const login = () => {
        axios.post("https://survey-form-project-backend.onrender.com/login", user)
            .then(res => {
                if (res.data === "ok") {
                    localStorage.setItem("isLoggedIn", true)
                    navigate('/dashboard')
                } else {
                    alert("Wrong credentials")
                    navigate("/login")
                }

            })
    }

    return (
        <div className="login-container">
            <div className="login-flavor-text">
                Welcome to
                Create Survey
                WebSite
            </div>
            <div className="login">
                <h1>Login</h1>
                <input type="text" name="email" value={user.email} onChange={handleChange} placeholder="Enter your Email"></input>
                <input type="text" name="password" value={user.password} onChange={handleChange} placeholder="Enter your Password" ></input>
                <div className="button" onClick={login}>Login</div>
                <div>or</div>
                <div className="button" onClick={() => navigate("/register")}>Register</div>
            </div>
        </div>

    )
}

export default Login