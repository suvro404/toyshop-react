import { useState, useReducer, ChangeEvent } from 'react';
import 'modules/auth/styles/Auth.css';
import {useAuth} from "modules/auth/contexts/AuthContext";
import LoadingSpinner from "libs/loading-spinner/LoadingSpinner";
import AuthResultModal from "modules/auth/components/AuthResultModal";
import {IKeyable, ICredentials} from "type.global";


function Auth() {
    const [authType, setAuthType] = useState('Log In');
    const {setCredentials, setAuthAction, loading, setLoading, authMsg, showAuthResultModal} = useAuth();
    
    const [userInput, setUserInput] = useReducer(
        (state:IKeyable, newState:IKeyable) => ({...state, ...newState}), {
            email: '',
            password: ''
        }
    );

    const handleUserInputChange = (evt:ChangeEvent<HTMLInputElement>) => {
        const name = evt.target.name;
        const newValue = evt.target.value;
        setUserInput({[name]: newValue});
    }

    function changeAuthType(type:string) {
        setAuthType(type);
    }

    function submit() {
        setLoading(true);
        setCredentials(userInput as ICredentials);
        setAuthAction(getActionName(authType));
    }


    function getActionName(authType:string):string {
        return (authType === 'Log In' ? 'login' : 'register');
    }

    return (
        <div>
            {
                loading ? (
                    <LoadingSpinner />
                ) : (
                    <div>
                        <div className="auth-main-container flex-container">
                            <div className="auth-wrapper">
                                <h2>{authType}</h2>
                                <div className="auth-form log-in">
                                    <div className="auth-form-item-container">
                                        <div className="auth-form-label">Email</div>
                                        <input type="email" name="email" className="auth-form-input" autoComplete="off"
                                                value={userInput.email} onChange={handleUserInputChange}
                                                data-test="email"
                                        />
                                    </div>
                                    <div className="auth-form-item-container">
                                        <div className="auth-form-label">Password</div>
                                        <input type="password" name="password" className="auth-form-input" autoComplete="off"
                                                value={userInput.password} onChange={handleUserInputChange}
                                                data-test="password"
                                        />
                                    </div>
                                    <div>
                                        <button className="auth-form-action-btn" onClick={() => submit()}
                                            data-test="submit"
                                        >
                                            SUBMIT
                                        </button>
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
                        <div>
                            {showAuthResultModal && <AuthResultModal msg={authMsg} />}
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default Auth;