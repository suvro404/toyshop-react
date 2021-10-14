import {useState, createContext, useContext, FC, ReactNode} from 'react';
import {Authenticate} from "../helpers/basic-helpers";

import {SetBooleanFunction, SetStringFunction} from '../type'

type SetCredentialsFunction = (a: Credentials) => void;

interface Credentials {
    username: string,
    password: string
}

const AuthContext = createContext<ContextInterface | null>(null);

const apiPrefix = 'https://reqres.in';

export interface ContextInterface {
    authorized: boolean,
    setAuthorized: SetBooleanFunction,
    credentials: Credentials,
    setCredentials: SetCredentialsFunction,
    actionName: string,
    setActionName: SetStringFunction,
    loading: boolean,
    setLoading: SetBooleanFunction,
    authMsg: string,
    setAuthMsg: SetStringFunction
}

export const AuthContextProvider: FC<ReactNode> = ({children}) => {
    const [authorized, setAuthorized] = useState(false);
    const [credentials, setCredentials] = useState({username: '', password: ''});
    const [actionName, setActionName] = useState('login');
    const [loading, setLoading] = useState(false);
    const [authMsg, setAuthMsg] = useState('');

    const providerValues:ContextInterface = {authorized, setAuthorized, credentials, setCredentials, actionName, setActionName, loading, setLoading, authMsg, setAuthMsg};

    return (
        <AuthContext.Provider value={providerValues}>
            {children}
        </AuthContext.Provider>
    );
}

function authenticateUser(ctxValues:ContextInterface) {
    let url = apiPrefix + "/api/"+ ctxValues.actionName;
    Authenticate(url, ctxValues.credentials, ((d:any) => {
        ctxValues.setLoading(false);
        //actionName === 'login' ? (d.token ? setAuthorized(true) : setAuthorized(false)):(setAuthorized(false));
        if(ctxValues.actionName === 'login') {
            if(d.token) {
                ctxValues.setAuthorized(true);
                ctxValues.setAuthMsg('Log in successful!');
            } else {
                ctxValues.setAuthMsg('Log in failed!');
            }
        } else {
            if(d.id) {
                ctxValues.setAuthMsg('Sign Up Successful. Please log in to continue.');
            } else {
                ctxValues.setAuthMsg('Sign Up failed!');
            }
        }
    }));
}

function isValidCredentail(creds:Credentials) {
    return ((typeof creds === 'object' && Object.keys(creds).length && Object.values(creds).every(x => x != null && x !== '')));
}

export const useAuth = () => {
    let contextValues:ContextInterface | null = useContext<ContextInterface | null>(AuthContext);

    if(contextValues) {
        isValidCredentail(contextValues.credentials) ? authenticateUser(contextValues) : console.log("credential not valid");
    }

    return contextValues;
};