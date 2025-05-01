
import React, { createContext, useContext } from 'react';
const AuthContext = createContext();

// Custom hook to use the AuthContext
export const useAuthContext = () => {
    return useContext(AuthContext);
};



export const AuthProvider = ({ children }) => {

    const [auth, setAuth] = React.useState(null);
    React.useEffect(() => {
        const loggedInUser = sessionStorage.getItem('loggedInUser');
        if (loggedInUser) {
            setAuth(JSON.parse(loggedInUser));
        }
    }, []);

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    )

}