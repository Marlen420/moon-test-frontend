import styles from './style.module.scss';
import dayjs from 'dayjs';
import clsx from 'clsx';
import { Button } from '../../../components';
import { useState } from 'react';

export default function ManagersTable({list=[], onEditManager, onDeleteManager, status}) {
    const [optionsId, setOptionsId] = useState(null);
    return (
        <div className={styles.table_holder}>
            <table className="table">
                <thead>
                    <tr>
                        <th>ФИО</th>
                        <th>Телефон</th>
                        <th>Почта</th>
                        <th>
                            Дата создания
                            <button 
                                className={clsx()}>▶</button>
                        </th>
                        <th>Кол-во сделок</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        list.map((item, index) => (
                            <tr key={item._id}>
                                <td>{item.fullname}</td>
                                <td>{item.phone_number}</td>
                                <td>{item.email}</td>
                                <td>{dayjs(item.created_at).format('DD.MM.YYYY')}</td>
                                <td>{item.deal_amount}</td>
                                <td style={{position: 'relative'}}>
                                    <div className={styles.buttons_holder}>
                                        <div className="dropdown" style={{position: 'absolute', bottom: 0, left: -25}}>
                                            <ul className={clsx("dropdown-menu", optionsId === item._id && "show")} style={{minWidth: 0}}>
                                                <li>
                                                    <button 
                                                        onClick={() => {
                                                            onEditManager(item._id);
                                                            setOptionsId(null);
                                                        }} 
                                                        className="dropdown-item"
                                                        style={{color: '#5780EB'}}
                                                        type="button">
                                                            Изменить
                                                    </button>
                                                </li>
                                                <li>
                                                    <button 
                                                        onClick={() => {
                                                            console.log(item);
                                                            onDeleteManager(item._id);
                                                            setOptionsId(null);
                                                        }} 
                                                        className="dropdown-item"
                                                        style={{color: '#F98C8C'}}
                                                        type="button">
                                                            Удалить
                                                    </button>
                                                </li>
                                            </ul>
                                        </div>
                                        <Button 
                                            onClick={() => setOptionsId(prev => prev === null ? item._id : null)}
                                            projectType={['empty']}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-three-dots-vertical" viewBox="0 0 16 16">
                                                    <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
                                                </svg>
                                        </Button>
                                    </div>
                                </td>
                            </tr>
                        ))
                    }
                    {(list.length === 0 && status !== 'Fetching managers') && <tr><td colSpan={10} style={{textAlign: 'center'}}>Нет данных</td></tr>}
                </tbody>
            </table>
            {
                status === 'Fetching managers' &&
                <div className={styles.spinner_holder}>
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            }
        </div>
    )
}