import {useState, createContext, useContext, useEffect} from 'react';
import {Authenticate, FetchItems} from "../helpers/basic-helpers";

const AuthContext = createContext(null);

const apiPrefix = 'https://reqres.in';

export const AuthContextProvider = ({status, children}) => {
    const [authorized, setAuthorized] = useState(status);
    const [credential, setCredential] = useState({});
    const [actionName, setActionName] = useState('login');
    const [loading, setLoading] = useState(false);
    const [authMsg, setAuthMsg] = useState('');

    return (
        <AuthContext.Provider value={{authorized, setAuthorized, credential, actionName, setCredential, setActionName, loading, setLoading, authMsg, setAuthMsg}}>
            {children}
        </AuthContext.Provider>
    );
}

function authenticateUser(credential, actionName, setAuthorized, setLoading, setAuthMsg, authMsg, setCredential) {
    let url = apiPrefix + "/api/"+ actionName;
    Authenticate(url, credential, (d => {
        setLoading(false);
        //actionName === 'login' ? (d.token ? setAuthorized(true) : setAuthorized(false)):(setAuthorized(false));
        if(actionName === 'login') {
            if(d.token) {
                setAuthorized(true);
                setAuthMsg('Log in successful!');
            } else {
                setAuthMsg('Log in failed!');
            }
        } else {
            if(d.id) {
                setAuthMsg('Sign Up Successful. Please log in to continue.');
            } else {
                setAuthMsg('Sign Up failed!');
            }
        }
    }));
}

function isValidObj(obj) {
    return ((typeof obj === 'object' && Object.keys(obj).length && Object.values(obj).every(x => x != null && x !== '')));
}

export const useAuth = () => {
    let {credential, actionName, setAuthorized, setLoading, setAuthMsg, authMsg, setCredential} = useContext(AuthContext);
    isValidObj(credential) ? authenticateUser(credential, actionName, setAuthorized, setLoading, setAuthMsg, authMsg, setCredential) : console.log("credential not valid");
    return useContext(AuthContext);
};