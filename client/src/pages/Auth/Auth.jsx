import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import "./Auth.css"
import icon from '../../assets/icon.png'
import Aboutauth from './Aboutauth'
import { signup, login } from '../../action/auth'
import GoogleAuthButton from '../../Comnponent/GoogleAuthenticationButton/GoogleButton'
import { staticTranslator } from '../../services'
const Auth = () => {
    const [issignup, setissignup] = useState(false)
    const [name, setname] = useState("");
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("")
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const targetLang = localStorage.getItem("lang") || "";
    const handlesubmit = (e) => {
        e.preventDefault();
        if (!email && !password) {
            alert(staticTranslator("Enter email and password", targetLang))
        }
        if (issignup) {
            if (!name) {
                alert(staticTranslator("Enter a name to continue", targetLang))
            }
            dispatch(signup({ name, email, password }, navigate))
            
        } else {
            dispatch(login({ email, password }, navigate))
        
        }
    }
    const handleswitch = () => {
        setissignup(!issignup);
        setname("");
        setemail("");
        setpassword("")

    }
    useEffect(()=>{
        if(!!(JSON.parse(localStorage.getItem('Profile'))?.token)){
            navigate("/");
        }
    },[navigate])
    return (
        <section className="auth-section">
            {issignup && <Aboutauth />}
            <div className="auth-container-2">
                <img src={icon} alt="icon" className='login-logo' />
                <form onSubmit={handlesubmit}>
                    {issignup && (
                        <label htmlFor="name">
                            <h4>{staticTranslator("Display Name", targetLang)}</h4>
                            <input type="text" id='name' name='name' value={name} onChange={(e) => {
                                setname(e.target.value);
                            }} />
                        </label>
                    )}
                    <label htmlFor="email">
                        <h4>{staticTranslator("Email", targetLang)}</h4>
                        <input type="email" id='email' name='email' value={email} onChange={(e) => {
                            setemail(e.target.value);
                        }} />
                    </label>
                    <label htmlFor="password">
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <h4>{staticTranslator("Password", targetLang)}</h4>
                            {!issignup && (
                                <p style={{ color: "#007ac6", fontSize: "13px" }}>
                                    {staticTranslator("Forgot Password?", targetLang)}
                                </p>
                            )}
                        </div>
                        <input type="password" name="password" id="password" value={password} onChange={(e) => {
                            setpassword(e.target.value)
                        }} />
                    </label>
                    <button type='submit' className='auth-btn' >
                        {issignup ? staticTranslator("Sign up", targetLang) : staticTranslator("Log in", targetLang)}
                    </button>
                </form>
                <p>
                    {issignup ? staticTranslator("Already have an account?", targetLang) : staticTranslator("Don't have an account", targetLang)}
                    <button type='button' className='handle-switch-btn' onClick={handleswitch}>
                        {issignup ? staticTranslator("Log in", targetLang) : staticTranslator("Sign up", targetLang)}
                    </button>
                </p>
                <GoogleAuthButton />
            </div>
        </section>
    )
}

export default Auth