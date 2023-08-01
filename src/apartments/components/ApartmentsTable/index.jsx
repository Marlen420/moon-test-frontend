import clsx from 'clsx';
import { useMemo, useState } from 'react';
import styles from './style.module.scss';
import dayjs from 'dayjs';
import { APARTMENT_STATUS } from '../../constants/apartmentStatus';
import { Button } from '../../../components';
import { useDispatch } from 'react-redux';
import { deleteApartment } from '../../api/apartments';
import { toast } from 'react-toastify';

export default function ApartmentsTable({status, list=[], setEditingApartment, onDelete}) {
    const dispatch = useDispatch();
    const [listFilter, setListFilter] = useState(null);
    const [edit, setEdit] = useState(null);
    const [options, setOptions] = useState(null);
    const sortedList = useMemo(() => {
        if (listFilter === null) {
            return list;
        }
        const sortingList = JSON.parse(JSON.stringify(list));
        if (['area', 'price', 'floor', 'number'].includes(listFilter)) {
            return sortingList.sort((a, b) => parseInt(b[listFilter]) - parseInt(a[listFilter]));
        }
        return sortingList.sort((a, b) =>  b[listFilter] - a[listFilter]);
    }, [list, listFilter]);
    const handleFilterChange = (filter) => {
        if (listFilter === filter) {
            setListFilter(null);
        }
        else {
            setListFilter(filter);
        }
    }
    const handleEdit = (id) => {
        if (edit === id) {
            setEdit(null);
        }
        else {
            setEdit(id);
        }
    }
    const handleOptionsToggle = (id) => {
        if (options === id) {
            setOptions(null);
        }
        else {
            setOptions(id);
        }
    }
    const handleHistoryClick = (id) => {
        setOptions(null);
    }
    const handleDeleteClick = (id) => {
        setOptions(null);
        dispatch(deleteApartment(id)).then((res) => {
            console.log(res);
            if (res.meta.requestStatus === 'rejected') {
                toast.error('Не удалось удалить');
            }
            else if (res.meta.requestStatus === 'fulfilled') {
                toast.success('Квартира успешно удалена');
            }
        });
    }
    return (
        <>
            <div className={styles.table_holder}>
                <table className="table">
                    <thead>
                        <tr>
                            <th style={{width: '10%'}}>
                                № Квартиры
                                <button 
                                    onClick={() => handleFilterChange('number')}
                                    className={clsx(listFilter === 'number' && styles.active_filter)}>▶</button>
                            </th>
                            <th style={{width: '15%'}}>Объект</th>
                            <th>
                                Этаж
                                <button 
                                    onClick={() => handleFilterChange('floor')}
                                    className={clsx(listFilter === 'floor' && styles.active_filter)}>▶</button>
                            </th>
                            <th>
                                КВ
                                <button 
                                    onClick={() => handleFilterChange('area')}
                                    className={clsx(listFilter === 'area' && styles.active_filter)}>▶</button>
                            </th>
                            <th style={{width: '10%'}}>
                                Дата
                                <button 
                                    onClick={() => handleFilterChange('created_at')}
                                    className={clsx(listFilter === 'created_at' && styles.active_filter)}>▶</button>
                            </th>
                            <th style={{width: '10%'}}>Статус</th>
                            <th style={{width: '10%'}}>
                                Цена 
                                <button 
                                    onClick={() => handleFilterChange('price')}
                                    className={clsx(listFilter === 'price' && styles.active_filter)}>▶</button>
                            </th>
                            <th>Клиент</th>
                            <th>Статус</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            sortedList.map((item, index) => (
                                <tr key={item._id}>
                                    <td>{item.number || '-'}</td>
                                    <td>{item.location}</td>
                                    <td>{item.floor}</td>
                                    <td>{item.area}</td>
                                    <td>{dayjs(item.created_at).format('DD.MM.YYYY')}</td>
                                    <td>
                                        <span className={clsx(styles.apartment_status, styles[item.status])}>
                                            {APARTMENT_STATUS[item.status]}
                                        </span>
                                    </td>
                                    <td>{item.price}с</td>
                                    <td>{item.client_name || '-'}</td>
                                    <td>{item.book_status || '-'}</td>
                                    <td style={{position: 'relative'}}>
                                        <div className={styles.buttons_holder}>
                                            <Button 
                                                onClick={() => setEditingApartment(item._id)}
                                                projectType={['empty']} 
                                                style={{color: '#5780EB'}}>
                                                    Изменить
                                            </Button>
                                            <div className="dropdown" style={{position: 'absolute', bottom: 0, left: '40%'}}>
                                                <ul className={clsx("dropdown-menu", options === item._id && 'show')} style={{minWidth: 0}}>
                                                    <li><button onClick={() => handleHistoryClick(item._id)} className="dropdown-item" type="button">История</button></li>  
                                                    <li><button onClick={() => {
                                                        onDelete(item._id);
                                                        handleOptionsToggle(null);
                                                    }} className="dropdown-item" type="button">Удалить</button></li>  
                                                </ul>
                                            </div>
                                            <Button 
                                                onClick={() => handleOptionsToggle(item._id)}
                                                loading={status === 'Deleting' && options === item._id}
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
                        {(list.length === 0 && status !== 'Fetching data') && <tr><td colSpan={10} style={{textAlign: 'center'}}>Нет данных</td></tr>}
                    </tbody>
                </table>
                {
                    status === 'Fetching data' &&
                    <div className={styles.spinner_holder}>
                        <div className="spinner-border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                }
            </div>
        </>
    )
}