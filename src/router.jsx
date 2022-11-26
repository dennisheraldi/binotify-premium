import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import { App } from "./app";

const router = createBrowserRouter(createRoutesFromElements(
    <Route>
        <Route path="/" element={<App />} />
    </Route>
));

export default router;