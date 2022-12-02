import { createContext } from "preact";
import { useCallback, useContext, useEffect, useState } from "preact/hooks";
import { API } from "./API";

const UserContextState = {
    user: {
        user_id: "",
        username: "",
        email: "",
        name: "",
        isAdmin: false,
    },
    /** @type StateUpdater */
    setUser: null,
}

const AuthContext = createContext(UserContextState);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(UserContextState.user);
    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </AuthContext.Provider>
    );
};

const getUserFromToken = (token) => {
    return JSON.parse(atob(token.split(".")[1]));
};
        

export const useAuth = () => {
    const { user, setUser } = useContext(AuthContext);

    useEffect(async () => {
        let resp = await API.post("/users/authorize");
        if (resp.data?.accessToken)
            localStorage.setItem("token", resp.data.accessToken);
            setUser(getUserFromToken(resp.data.accessToken));
    }, []);

    const isLoggedIn = useCallback(() => {
        return user.user_id !== "";
    }, [user.user_id]);

    const login = useCallback(async (username, password) => {
        let resp = await API.post("/users/login", {
            username,
            password
        });
        if (resp.data?.accessToken) {
            localStorage.setItem("token", resp.data.accessToken);
            setUser(getUserFromToken(resp.data.accessToken));
        }
    }, []);

    const register = useCallback(async (username, email, password, confirm_pass) => {
        let resp = await API.post("/users/", {
            username,
            email,
            password,
            confirm_pass,
        })
        if (resp.data && resp.data.accessToken) {
            localStorage.setItem("token", resp.data.accessToken);
            setUser(getUserFromToken(resp.data.accessToken));
        }
    }, []);

    const logout = useCallback(() => {
        localStorage.removeItem("token");
        setUser(UserContextState.user);
    }, []);

    return {
        authMethod: { login, logout, register, isLoggedIn },
        user
    }
};
