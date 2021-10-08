import {useState, createContext, useContext, useEffect} from 'react';
import {Authenticate, FetchItems} from "../helpers/basic-helpers";

const AuthContext = createContext(null);

const apiPrefix = 'https://reqres.in';

export const AuthContextProvider = ({status, children}) => {
    const [authorized, setAuthorized] = useState(status);
    const [credential, setCredential] = useState({});
    const [actionName, setActionName] = useState('login');
    console.log("at AuthContext : ", credential, actionName);

    return (
        <AuthContext.Provider value={{authorized, setAuthorized, credential, actionName, setCredential, setActionName}}>
            {children}
        </AuthContext.Provider>
    );
}

function authenticateUser(credential, actionName) {
    console.log({credential}, ", x", actionName);
    let url = apiPrefix + "/api/"+ actionName;
    console.log("url : ", url);
    Authenticate(url, credential, (d => {
        console.log(d);
    }));
}

function isValidOb(obj) {
    return ((typeof obj === 'object' && Object.keys(obj).length && Object.values(obj).every(x => x != null && x !== '')));
}

export const useAuth = () => {
    let {credential, actionName} = useContext(AuthContext);
    isValidOb(credential) ? authenticateUser(credential, actionName) : console.log("credential not valid");

    return useContext(AuthContext);
};