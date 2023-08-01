import clsx from 'clsx';
import { Button } from '../../../components';
import styles from './style.module.scss';

export default function Filter({onNewManager}) {
    return (
        <div className={styles.filter_holder}>
            <div className="dropdown">
                <button 
                    className={clsx("btn btn-primary dropdown-toggle")} 
                    type="button" 
                    onClick={null}
                    data-bs-toggle="dropdown" 
                    aria-expanded="false">
                        Сортировка
                </button>
                <ul className={clsx("dropdown-menu")}>
                </ul>
            </div>
            <div className={styles.button_holder}>
                <Button 
                    onClick={onNewManager}
                    projectType={['managers-add']}>Добавить</Button>
            </div>
        </div>
    )
};