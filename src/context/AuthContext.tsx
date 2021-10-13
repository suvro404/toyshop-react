import {useState, createContext, useContext, ReactNode, FC} from 'react';
import {Authenticate} from "../helpers/basic-helpers";

const AuthContext = createContext<any>(null);

const apiPrefix:string = 'https://reqres.in';

type SetBooleanFunction = (a: boolean) => void;
type SetStringFunction = (a: string) => void;
type SetObjectFunction = (a: string) => void;

export const AuthContextProvider: FC<ReactNode> = ({children}) => {
    const [authorized, setAuthorized] = useState<boolean>(true);
    const [credential, setCredential] = useState<object>({});
    const [actionName, setActionName] = useState<string>('login');
    const [loading, setLoading] = useState<boolean>(false);
    const [authMsg, setAuthMsg] = useState<string>('');

    return (
        <AuthContext.Provider value={{authorized, setAuthorized, credential, actionName, setCredential, setActionName, loading, setLoading, authMsg, setAuthMsg}}>
            {children}
        </AuthContext.Provider>
    );
}

function authenticateUser(credential:object, actionName:string, setAuthorized:SetBooleanFunction, setLoading:SetBooleanFunction, 
    setAuthMsg:SetStringFunction, authMsg:string, setCredential:SetObjectFunction) {
    let url = apiPrefix + "/api/"+ actionName;
    Authenticate(url, credential, ((d:any) => {
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

function isValidObj(obj:Object) {
    return ((typeof obj === 'object' && Object.keys(obj).length && Object.values(obj).every(x => x != null && x !== '')));
}

export const useAuth = () => {
    let {credential, actionName, setAuthorized, setLoading, setAuthMsg, authMsg, setCredential}:
    {credential:object, actionName:string, setAuthorized:SetBooleanFunction, setLoading:SetBooleanFunction, setAuthMsg:SetStringFunction, authMsg:string, setCredential:SetObjectFunction} = useContext<any>(AuthContext);
    isValidObj(credential) ? authenticateUser(credential, actionName, setAuthorized, setLoading, setAuthMsg, authMsg, setCredential) : console.log("credential not valid");
    return useContext(AuthContext);
};