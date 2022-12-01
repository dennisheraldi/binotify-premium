import { useCallback, useEffect, useState } from "preact/hooks";

export default useAuth = () => {
    const [user, setUser] = useState({
        user_id: "",
        email: "",
        password: "",
    });

    useEffect(() => {
        const userToken = localStorage.getItem("user");
        if (user) {
            setUser(JSON.parse(user));
        }
    }, []);

    const login = useCallback(() => {

    }, []);

    const register = useCallback(() => {

    }, []);

    const logout = useCallback(() => {

    }, []);

    return {
        authMethod: { login, logout, register },
        status: { isLoggedIn: false },
        user
    }
};
