import {useState, createContext, useContext, FC, ReactNode} from 'react';
import {Authenticate} from "../helpers/basic-helpers";

import {SetBooleanFunction, SetStringFunction} from '../type'

type SetCredentialsFunction = (a: ICredentials) => void;

export interface ICredentials {
    email: string,
    password: string
}

export interface ContextInterface {
    authorized: boolean,
    setAuthorized: SetBooleanFunction,
    credentials: ICredentials,
    setCredentials: SetCredentialsFunction,
    actionName: string,
    setActionName: SetStringFunction,
    loading: boolean,
    setLoading: SetBooleanFunction,
    authMsg: string,
    setAuthMsg: SetStringFunction,
    showAuthResultModal: boolean,
    setShowAuthResultModal: SetBooleanFunction
}

const AuthContext = createContext<ContextInterface | null>(null);

const apiPrefix = 'https://reqres.in';

export const AuthContextProvider: FC<ReactNode> = ({children}) => {
    const [authorized, setAuthorized] = useState(true);
    const [credentials, setCredentials] = useState({email: '', password: ''});
    const [actionName, setActionName] = useState('login');
    const [loading, setLoading] = useState(false);
    const [authMsg, setAuthMsg] = useState('');
    const [showAuthResultModal, setShowAuthResultModal] = useState(false);
    const providerValues:ContextInterface = {authorized, setAuthorized, credentials, setCredentials, actionName, setActionName, loading, setLoading, authMsg, setAuthMsg, showAuthResultModal, setShowAuthResultModal};

    return (
        <AuthContext.Provider value={providerValues}>
            {children}
        </AuthContext.Provider>
    );
}

function authenticateUser(ctxValues:ContextInterface) {
    let url = apiPrefix + "/api/"+ ctxValues.actionName;
    Authenticate(url, ctxValues.credentials).then(d => {
        if(ctxValues.actionName === 'login') {
            ctxValues.setAuthorized(true);
            ctxValues.setAuthMsg('Log in Successful!');
        } else if(ctxValues.actionName === 'signup') {
            ctxValues.setAuthMsg('Sign Up Successful. Please log in to continue.');
        }
    }).catch(err => {
        //console.log("Error : ", err);
        if(ctxValues.actionName === 'login') {
            ctxValues.setAuthMsg('Log in Failed!');
        } else if(ctxValues.actionName === 'signup') {
            ctxValues.setAuthMsg('Sign Up Failed');
        }
    }).finally(() => {
        ctxValues.setLoading(false);
        ctxValues.setShowAuthResultModal(true);
    });
}

function isValidCredentail(creds:ICredentials) {
    return ((typeof creds === 'object' && Object.keys(creds).length && Object.values(creds).every(x => x != null && x !== '')));
}

export const useAuth = () => {
    let contextValues:ContextInterface | null = useContext<ContextInterface | null>(AuthContext);

    if(contextValues) {
        isValidCredentail(contextValues.credentials) ? authenticateUser(contextValues) : console.log("credential not valid");
    }

    return contextValues as ContextInterface;
};