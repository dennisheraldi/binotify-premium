import { createBrowserRouter, createRoutesFromElements, Route, useLocation } from "react-router-dom";
import {Home} from "./pages/Home";


const router = createBrowserRouter(createRoutesFromElements(
    <Route>
        {/* jika admin */}
        <Route path="/" element={<Home />} />
    </Route>
));

export default router;