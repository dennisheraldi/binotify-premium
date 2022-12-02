import { createContext } from "preact";
import { useCallback, useContext, useEffect, useState } from "preact/hooks";
import { API } from "./API";
import { useNavigate } from "react-router";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

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
    isFetching: true,
    /** @type StateUpdater */
    setIsFetching: null,
}

const AuthContext = createContext(UserContextState);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(UserContextState.user);
    const [isFetching, setIsFetching] = useState(UserContextState.isFetching);

    useEffect(async () => { // first fetch
        setIsFetching(true);
        try {
            let resp = await API.post("/users/authorize");
            if (resp.data?.accessToken)
                localStorage.setItem("token", resp.data.accessToken);
                setUser(getUserFromToken(resp.data.accessToken));
        } catch (e) {
            console.log(e);
        } finally {
            setIsFetching(false);
        }
    }, []);

    return (
        <AuthContext.Provider value={{ user, setUser, isFetching, setIsFetching }}>
            {children}
        </AuthContext.Provider>
    );
};

const getUserFromToken = (token) => {
    return JSON.parse(atob(token.split(".")[1]));
};
        

export const useAuth = () => {
    const { user, setUser, isFetching, setIsFetching } = useContext(AuthContext);

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
        fetcher: { isFetching, setIsFetching },
        user
    }
};

export const ProtectedRoute = ({ component, type="none" }) => {
    const { authMethod: auth, fetcher, user } = useAuth();
    const navigate = useNavigate();

    const NonAuthRoute = useCallback((navigate, isLogin, user) => {
        if (isLogin)
            navigate(user.isAdmin ? "/subscription" : "/song", { replace: true });
    }, []);

    const PenyanyiRoute = useCallback((navigate, isLogin, user) => {
        if (!isLogin)
            navigate("/login", { replace: true });
        else if (user.isAdmin)
            navigate("/subscription", { replace: true });
    }, []);

    const AdminRoute = useCallback((navigate, isLogin, user) => {
        if (!isLogin)
            navigate("/login", { replace: true });
        else if (!user.isAdmin)
            navigate("/song", { replace: true });
    }, []);

    useEffect(() => {
        switch (type) {
            case "none":
                break;
            case "nonAuth":
                NonAuthRoute(navigate, auth.isLoggedIn(), user);
                break;
            case "penyanyi":
                PenyanyiRoute(navigate, auth.isLoggedIn(), user);
                break;
            case "admin":
                AdminRoute(navigate, auth.isLoggedIn(), user);
                break;
        }
    }, [user.user_id])

    return (
        <>
        {
           fetcher.isFetching ? (
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={true}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
           ) : component
        }
        </>
    );
}
