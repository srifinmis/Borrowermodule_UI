import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Logo from "../Images/srifin_final.svg";
import "./Login.css";
const Login = () => {
    const [emp_id, setEmpId] = useState("");
    const [passwd, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();
    const API_URL = process.env.REACT_APP_API_URL;
    // console.log('app_url: ', API_URL)

    const handleLogin = async (e) => {
        e.preventDefault();
        setMessage("");
        try {
            const response = await fetch(`${API_URL}/Login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ emp_id, passwd }),
            });
            const data = await response.json();
            // console.log('data is: ', data)
            if (response.ok) {
                localStorage.setItem("isLoggedIn", "true");
                localStorage.setItem("loginSuccess", "true");
                localStorage.setItem("loginTime", Date.now().toString());
                localStorage.setItem("token", data.token)
                navigate("/dashboard");
            } else {
                toast.error("Login failed! Please check your credentials.");
            }
        } catch (error) {
            toast.error("Error connecting to the server");
        }
    };

    return (
        <div className="main-div">
            <div className="login-container">
                {/* Left Section */}
                <div className="login-left">
                    <img src={Logo} alt="Logo" className="logo" />
                    <h2>BORROWING MANAGEMENT</h2>
                    <p>Effortlessly manage your loan repayments and track your applications with ease!</p>
                    <h3>Log in to access your account</h3>
                </div>

                {/* Right Section */}
                <div className="login-right">
                    <form onSubmit={handleLogin}>
                        <h2>LOGIN</h2>
                        <input
                            type="text"
                            placeholder="User Name"
                            required
                            value={emp_id}
                            onChange={(e) => setEmpId(e.target.value)}
                        />
                        <input
                            type="Password"
                            placeholder="Password"
                            required
                            value={passwd}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button type="submit" className="login-btn">LOGIN</button>
                    </form>
                    {message && <p className="message">{message}</p>}

                    {/* <Link to="/ForgotPassword" className="forgot-password">
                        Forgot Password?
                    </Link> */}
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default Login;
