import { Navigate, Route, Routes } from "react-router";
import { NotFoundPage, Sidebar } from "../";
import ApartmentsPage from "../../pages/ApartmentsPage";
import ManagersPage from "../../pages/ManagersPage";
import styles from './style.module.scss';

const LOGGED_ROUTES = [
    { path: '/', element: <></>},
    { path: '/apartments', element: <ApartmentsPage />},
    { path: '/managers', element: <ManagersPage />},
    { path: '/signin/*', element: <Navigate replace to="/"/>},
]

export default function AuthorizedRoutes() {
    return (
        <div className={styles.page_holder}>
            <Sidebar />
            <Routes>
                {LOGGED_ROUTES.map((item, index) => (
                    <Route key={index} path={item.path} element={item.element}/>
                ))}
                <Route path="/*" element={<NotFoundPage />}/>
            </Routes>
        </div>
    )
}