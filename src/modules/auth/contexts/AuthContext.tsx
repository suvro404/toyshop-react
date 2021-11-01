import {useState, createContext, useContext, FC, ReactNode} from 'react';
import ApiService from 'api/ApiService';
import {SetBooleanFunction, SetStringFunction, ICredentials} from 'type.global'
import {SetCredentialsFunction} from 'modules/auth/types/auth.type'

export interface ContextInterface {
    authorized: boolean,
    setAuthorized: SetBooleanFunction,
    credentials: ICredentials,
    setCredentials: SetCredentialsFunction,
    authAction: string,
    setAuthAction: SetStringFunction,
    loading: boolean,
    setLoading: SetBooleanFunction,
    authMsg: string,
    setAuthMsg: SetStringFunction,
    showAuthResultModal: boolean,
    setShowAuthResultModal: SetBooleanFunction
}

const AuthContext = createContext<ContextInterface | null>(null);

export const AuthContextProvider: FC<ReactNode> = ({children}) => {
    const [authorized, setAuthorized] = useState(false);
    const [credentials, setCredentials] = useState({email: '', password: ''});
    const [authAction, setAuthAction] = useState('');
    const [loading, setLoading] = useState(false);
    const [authMsg, setAuthMsg] = useState('');
    const [showAuthResultModal, setShowAuthResultModal] = useState(false);
    const providerValues:ContextInterface = {authorized, setAuthorized, credentials, setCredentials, authAction, setAuthAction, loading, setLoading, authMsg, setAuthMsg, showAuthResultModal, setShowAuthResultModal};

    return (
        <AuthContext.Provider value={providerValues}>
            {children}
        </AuthContext.Provider>
    );
}

function authenticateUser(ctxValues:ContextInterface) {
    const apiService = new ApiService("auth");
    apiService.authenticate(ctxValues.authAction, ctxValues.credentials).then(d => {
        if(ctxValues.authAction === 'login') {
            ctxValues.setAuthorized(true);
            ctxValues.setAuthMsg('Log in Successful!');
        } else if(ctxValues.authAction === 'signup') {
            ctxValues.setAuthMsg('Sign Up Successful. Please log in to continue.');
        }
    }).catch(err => {
        //console.log("Error : ", err);
        if(ctxValues.authAction === 'login') {
            ctxValues.setAuthMsg('Log in Failed!');
        } else if(ctxValues.authAction === 'signup') {
            ctxValues.setAuthMsg('Sign Up Failed');
        }
    }).finally(() => {
        ctxValues.setLoading(false);
        ctxValues.setShowAuthResultModal(true);
        ctxValues.setAuthAction("");
    });
}

function isValidCredentail(creds:ICredentials) {
    return ((typeof creds === 'object' && Object.keys(creds).length && Object.values(creds).every(x => x != null && x !== '')));
}

export const useAuth = () => {
    let contextValues:ContextInterface | null = useContext<ContextInterface | null>(AuthContext);
    if(contextValues?.authAction.length) {
        isValidCredentail(contextValues.credentials) ? authenticateUser(contextValues) : console.log("credential not valid");
    }

    return contextValues as ContextInterface;
};