import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    useLocation,
} from "react-router-dom";
import { Subscriber } from "./pages/Subscriber";
import { Song } from "./pages/Song";
import { Login } from "./pages/Login";
import { ProtectedRoute } from "./context/Auth";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route>
            <Route path="/subscription" element={<ProtectedRoute component={<Subscriber />} type="admin" />} />
            <Route path="/song" element={<ProtectedRoute component={<Song />} type="penyanyi" />} />
            <Route path="/login" element={<ProtectedRoute component={<Login />} type="nonAuth" />} />
        </Route>
    )
);

export default router;
