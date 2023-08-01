import { Navigate, Route, Routes } from "react-router";
import { NotFoundPage } from "..";
import AuthPage from "../../pages/authPage";

const UNLOGGED_ROUTES = [
    { path: '/signin', element: <AuthPage />},
    { path: '/*', element: <Navigate replace to="/signin"/>},
]

export default function UnauthorizedRoutes() {
    return (
        <Routes>
            {UNLOGGED_ROUTES.map((item, index) => (
                <Route key={index} path={item.path} element={item.element}/>
            ))}
            <Route path="/*" element={<NotFoundPage />}/>
        </Routes>
    )
}