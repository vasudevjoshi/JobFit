import { createContext, useContext, useState } from 'react';
const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = (props)=>{
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const[token,setToken] = useState(null);
    return <AuthContext.Provider 
        value ={{
            user,
            setUser,
            loading,
            setLoading,
            isAuthenticated,
            setIsAuthenticated,
            token,
            setToken
        }}
    >
        {props.children}
    </AuthContext.Provider>
}

