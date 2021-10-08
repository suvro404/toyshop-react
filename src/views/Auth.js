import { useEffect, useState, createRef } from 'react'
import '../assets/styles/Auth.css'
import {useAuth} from "../context/AuthContext";
import LoadingSpinner from "../components/LoadingSpinner";

function Auth() {
    let emailRef = createRef();
    let passwordRef = createRef();
    const [authType, setAuthType] = useState('Log In');
    const {setCredential, setActionName} = useAuth();

    function changeAuthType(type) {
        setAuthType(type);
    }

    function submit() {
        let credential = {
            email: emailRef.value,
            password: passwordRef.value
        }
        setCredential({credential});
        setActionName(getActionName(authType));
    }

    function getActionName(authType) {
        return (authType === 'Log In' ? 'login' : 'register');
    }

    return (
        <div className="auth-main-container flex-container">
            <div className="auth-wrapper">
                <h2>{authType}</h2>
                <div className="auth-form log-in">
                    <div className="auth-form-item-container">
                        <div className="auth-form-label">Email</div>
                        <input type="email" name="email" className="auth-form-input" autoComplete="off"
                               ref={node => emailRef = node} />
                    </div>
                    <div className="auth-form-item-container">
                        <div className="auth-form-label">Password</div>
                        <input type="password" name="password" className="auth-form-input" autoComplete="off"
                               ref={node => passwordRef = node} />
                    </div>
                    <div>
                        <button className="auth-form-action-btn" onClick={() => submit()}>SUBMIT</button>
                    </div>
                    {
                        authType === 'Log In' ? (
                            <div className="auth-msg">
                                Don't have an account? Please
                                <span className="auth-highlighted-text" onClick={() => changeAuthType('Sign Up')}>
                                    Sign Up
                                </span>
                            </div>
                        ):(
                            <div className="auth-msg">
                                Already have an account? Please
                                <span className="auth-highlighted-text" onClick={() => changeAuthType('Log In')}>
                                    Log In
                                </span>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default Auth;