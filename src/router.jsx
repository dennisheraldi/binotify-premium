import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    useLocation,
} from "react-router-dom";
import { Subscriber } from "./pages/Subscriber";
import { Song } from "./pages/Song";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route>
            <Route path="/" element={<Subscriber />} />
            <Route path="/song" element={<Song />} />
        </Route>
    )
);

export default router;
