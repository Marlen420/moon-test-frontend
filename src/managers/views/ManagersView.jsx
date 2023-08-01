import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteManager, getManagers } from '../api/managers';
import AddManagerPopup from '../components/AddManagerPopup';
import ConfirmDelete from '../components/ConfirmDelete';
import EditManagerPopup from '../components/EditManagerPopup';
import Filter from '../components/Filter';
import ManagersTable from '../components/ManagersTable';
import styles from './style.module.scss';
import { toast } from 'react-toastify';

export default function ManangersView() {
    const dispatch = useDispatch();
    const { managers, status } = useSelector(state => state.managers);

    const [newManager, setNewManager] = useState(false);
    const [editManager, setEditManager] = useState(null);
    const [deletManagerId, setDeleteManagerId] = useState(null);

    const handleAddNewManager = () => {
        setNewManager(true);
    }

    const handleEditManager = (id) => {
        setEditManager(id);
    }

    const handleDeleteManager = (id) => {
        setDeleteManagerId(id);
    }

    const onDelete = () => {
        dispatch(deleteManager(deletManagerId)).then((res) => {
            if (res.meta.requestStatus === 'fulfilled') {
                toast.success('Менеджер успешно удален');
            }
            else if (res.meta.requestStatus === 'rejected') {
                toast.error('Не удалось удалить менеджера');
            }
            setDeleteManagerId(null);
        })
    }

    useEffect(() => {
        dispatch(getManagers());
    }, []);

    return(
        <>
            {
                deletManagerId &&
                <ConfirmDelete onClose={() => setDeleteManagerId(null)} onDelete={onDelete} status={status}/>
            }
            {
                editManager &&
                <EditManagerPopup onClose={() => setEditManager(false)} managerId={editManager} />
            }
            {
                newManager &&
                <AddManagerPopup onClose={() => setNewManager(false)}/>
            }
            <div className={styles.holder}>
                <header>
                    <h3>Менеджеры</h3>
                </header>
                <div className={styles.content}>
                    <Filter onNewManager={handleAddNewManager}/>
                    <ManagersTable 
                        list={managers} 
                        onEditManager={handleEditManager} 
                        onDeleteManager={handleDeleteManager}
                        status={status}/>
                </div>
            </div>
        </>
    )
}