import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    useLocation,
} from "react-router-dom";
import { Home } from "./pages/Home";
import { Song } from "./pages/Song";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route>
            {/* jika admin */}
            <Route path="/" element={<Home />} />
            <Route path="/song" element={<Song />} />
        </Route>
    )
);

export default router;
