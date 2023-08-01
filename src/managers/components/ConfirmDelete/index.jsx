import { Button, PopupHolder } from "../../../components";
import styles from './style.module.scss';

export default function ConfirmDelete({onClose, onDelete, status}) {
    return (
        <PopupHolder onClose={onClose}>
            <div className={styles.window_holder}>
                <div 
                    className={styles.window}
                    onClick={(e) => e.stopPropagation()}>
                        <p>Вы действительно хотите удалить менеджера?</p>
                        <div className={styles.buttons_holder}>
                            <Button onClick={onClose} projectType={['cancel-delete']}>Нет</Button>
                            <Button 
                                onClick={onDelete} 
                                loading={status === 'Deleting'}
                                projectType={['confirm-delete']}>Да</Button>
                        </div>
                </div>

            </div>
        </PopupHolder>
    )
}