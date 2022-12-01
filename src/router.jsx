import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    useLocation,
} from "react-router-dom";
import { Subscriber } from "./pages/Subscriber";
import { Song } from "./pages/Song";
import { Login } from "./pages/authentication/Login";
import { Register } from "./pages/authentication/Register";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route>
            <Route path="/" element={<Subscriber />} />
            <Route path="/song" element={<Song />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
        </Route>
    )
);

export default router;
