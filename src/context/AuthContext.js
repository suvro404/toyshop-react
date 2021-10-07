import {useState, createContext, useContext, useEffect} from 'react';

const AuthContext = createContext(null);

export const AuthContextProvider = ({status, children}) => {
    const [authStatus, setAuthStatus] = useState(status);
    //console.log("at AuthContext : ", status, authStatus);

    return (
        <AuthContext.Provider value={{authStatus, setAuthStatus}}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);