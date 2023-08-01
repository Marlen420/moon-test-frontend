import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { Input } from '..';
import { logout } from '../../auth';
import Button from '../Button';
import styles from './style.module.scss';

const NAV_LIST = [
    { title: 'Главная', path: '/' },
    { title: 'Отчеты', path: '/reports' },
    { title: 'Квартиры', path: '/apartments' },
    { title: 'Менеджеры', path: '/managers' },
    { title: 'Бронирования', path: '/booking' },
]

export default function Sidebar() {
    const location = useLocation();
    const dispatch = useDispatch();
    const [activeTab, setActiveTab] = useState(null);
    
    useEffect(() => {
        const index = NAV_LIST.findIndex(item => item.path === location.pathname);
        if (index > -1) {
            setActiveTab(index);
        }
        else if (location.pathname === '/notification') {
            setActiveTab(-1);
        }
    }, [location]);

    const handleLogout = () => {
        dispatch(logout());
    }

    return (
        <div className={styles.sidebar}>
            <div className={styles.sidebar_header}>
                <div className={styles.search_bar}>
                    <Input projectType={['search-bar']}/>
                    <span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                        </svg>
                    </span>
                </div>
            </div>
            <div className={styles.sidebar_content}>
                {
                    NAV_LIST.map((nav, index) => (
                        <Link to={nav.path} key={index} className={clsx(activeTab === index && styles.active_tab)}>{nav.title}</Link>
                    ))
                }
            </div>
            <div className={styles.sidebar_footer}>
                <Link to="/notification" className={clsx(activeTab === -1 && styles.active_tab)}>Уведомления</Link>
                <Button 
                    projectType={['sidebar-logout']}
                    onClick={handleLogout}>Выйти</Button>
            </div>
        </div>
    );
}