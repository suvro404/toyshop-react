import {useState, createContext, useContext, ReactNode, FC} from 'react';
import {Authenticate} from "../helpers/basic-helpers";

type SetBooleanFunction = (a: boolean) => void;
type SetStringFunction = (a: string) => void;
type SetObjectFunction = (a: string) => void;

interface ContextInterface {
    authorized: boolean,
    setAuthorized: SetBooleanFunction,
    credential: object,
    setCredential: SetObjectFunction,
    actionName: string,
    setActionName: SetStringFunction,
    loading: boolean,
    setLoading: SetBooleanFunction,
    authMsg: string,
    setAuthMsg: SetStringFunction
}

const AuthContext = createContext<ContextInterface | null>(null);

const apiPrefix = 'https://reqres.in';

export const AuthContextProvider: FC<ContextInterface> = ({children}) => {
    const [authorized, setAuthorized] = useState(false);
    const [credential, setCredential] = useState({});
    const [actionName, setActionName] = useState('login');
    const [loading, setLoading] = useState(false);
    const [authMsg, setAuthMsg] = useState('');

    const providerValues:ContextInterface = {authorized, setAuthorized, credential, setCredential, actionName, setActionName, loading, setLoading, authMsg, setAuthMsg};

    return (
        <AuthContext.Provider value={providerValues}>
            {children}
        </AuthContext.Provider>
    );
}

function authenticateUser(ctxValues:ContextInterface) {
    let url = apiPrefix + "/api/"+ ctxValues.actionName;
    Authenticate(url, ctxValues.credential, ((d:any) => {
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

function isValidObj(obj:Object) {
    return ((typeof obj === 'object' && Object.keys(obj).length && Object.values(obj).every(x => x != null && x !== '')));
}

export const useAuth = () => {
    console.log("test : ", useContext(AuthContext));
    let contextValues:ContextInterface | null = useContext<ContextInterface | null>(AuthContext);

    if(contextValues) {
        isValidObj(contextValues.credential) ? authenticateUser(contextValues) : console.log("credential not valid");
    }

    return useContext(AuthContext);
};