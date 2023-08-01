import clsx from 'clsx';
import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteApartment, getApartments } from '../api/apartments';
import AddApartmentPopup from '../components/AddApartmentPopup/AddApartmentPopup';
import ApartmentsTable from '../components/ApartmentsTable';
import ConfirmDelete from '../components/ConfirmDelete';
import EditApartmentPopup from '../components/EditApartmentPopup';
import Filter from '../components/Filter';
import styles from './style.module.scss';
import { toast } from 'react-toastify';

const FILTER_LIST = ['Все', 'Prime City', 'Kochmon City', 'Baytik'];
const STATUS_LIST = {
    all: 'Все', 
    active: 'Активна', 
    booked: 'Бронь', 
    bought: 'Куплено', 
    installment: 'Рассрочка', 
    barter: 'Бартер'
};

export default function ApartmentsView() {
    const dispatch = useDispatch();
    const { status, apartments } = useSelector(state => state.apartments);

    const [locationFilter, setLocationFilter] = useState(FILTER_LIST[0]);
    const [statusFilter, setStatusFilter] = useState('all');
    const [showStatusFilter, setShowStatusFilter] = useState(false);
    const [showAddApartment, setShowAddApartment] = useState(false);
    const [editingApartment, setEditingApartment] = useState(null);
    const [deleteApartmentId, setDeleteApartmentId] = useState(null);

    const filteredList = useMemo(() => {
        let sortingList = JSON.parse(JSON.stringify(apartments));
        
        if (locationFilter !== 'Все') {
            sortingList = sortingList.filter((item) => item.location === locationFilter);
        }
        if (statusFilter !== 'all') {
            sortingList = sortingList.filter((item) => item.status === statusFilter);
        }
        return sortingList;
    }, [apartments, locationFilter, statusFilter]);

    // Handles filter change
    const handleFilterChange = (value) => {
        setLocationFilter(value);
    }

    // Toggles close/open status filter
    const handleToggleStatusFilter = () => {
        setShowStatusFilter(prev => !prev);
    }

    // Setting status filter method
    const handleSetStatusFilter = (status) => {
        handleToggleStatusFilter();
        setStatusFilter(status);
    }

    // Open new apartment popup
    const handleShowAddApartment = () => {
        setShowAddApartment(true);
    }

    // Close new appartment popup
    const handleCloseAddApartment = () => {
        setShowAddApartment(false);
    }

    // Edit apartment method
    const handleEditApartment = (id) => {
        setEditingApartment(id);
    }

    // Opens confirm delete popup
    const handleDeleteApartment = (id) => {
        setDeleteApartmentId(id);
    }

    const onDelete = () => {
        dispatch(deleteApartment(deleteApartmentId)).then((res) => {
            if (res.meta.requestStatus === 'fulfilled') {
                toast.success('Квартира успешно удалена');
            }
            else if (res.meta.requestStatus === 'rejected') {
                toast.error('Не удалось удалить');
            }
            setDeleteApartmentId(null);
        })
    }

    useEffect(() => {
        dispatch(getApartments());
    }, []);

    return (
        <>
            {
                deleteApartmentId &&
                <ConfirmDelete onClose={() => setDeleteApartmentId(null)} onDelete={onDelete} status={status}/>
            }
            {
                editingApartment &&
                <EditApartmentPopup apartmentId={editingApartment} onClose={() => setEditingApartment(null)}/>
            }
            {
                showAddApartment &&
                <AddApartmentPopup onClose={handleCloseAddApartment}/>
            }
            <div className={styles.holder}>
                <header>
                    <h3>Квартиры</h3>
                </header>
                <div className={styles.content}>
                    <Filter activeFilter={locationFilter} list={FILTER_LIST} setFilter={handleFilterChange} onAddApartment={handleShowAddApartment}/>
                    <div className="dropdown">
                        <button 
                            className={clsx("btn btn-primary dropdown-toggle", showStatusFilter && 'show')} 
                            type="button" 
                            onClick={handleToggleStatusFilter}
                            data-bs-toggle="dropdown" 
                            aria-expanded="false">
                                {
                                    statusFilter === 'all' 
                                    ? "Фильтр"
                                    : STATUS_LIST[statusFilter]
                                }
                        </button>
                        <ul className={clsx("dropdown-menu", showStatusFilter && 'show')}>
                            {
                                Object.keys(STATUS_LIST).map((item, index) => (
                                    <li key={index}><button onClick={() => handleSetStatusFilter(item)} className="dropdown-item" type="button">{STATUS_LIST[item]}</button></li>  
                                ))
                            }
                        </ul>
                    </div>
                    <ApartmentsTable 
                        status={status} 
                        list={filteredList} 
                        setEditingApartment={handleEditApartment}
                        onDelete={handleDeleteApartment}/>
                </div>
            </div>
        </>
    )
}