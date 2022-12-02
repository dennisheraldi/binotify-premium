import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    useLocation,
} from "react-router-dom";
import { Subscriber } from "./pages/Subscriber";
import { Song } from "./pages/Song";
import { Login } from "./pages/Login";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route>
            <Route path="/subscriber" element={<Subscriber />} />
            <Route path="/song" element={<Song />} />
            <Route path="/login" element={<Login />} />
        </Route>
    )
);

export default router;
