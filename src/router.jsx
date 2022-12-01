import { createBrowserRouter, createRoutesFromElements, Route, useLocation } from "react-router-dom";
import {Subscriber} from "./pages/Subscriber";


const router = createBrowserRouter(createRoutesFromElements(
    <Route>
        {/* jika admin */}
        <Route path="/" element={<Subscriber />} />
    </Route>
));

export default router;