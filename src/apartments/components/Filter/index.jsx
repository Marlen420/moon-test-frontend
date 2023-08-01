import { Button } from '../../../components';
import styles from './style.module.scss';

export default function Filter({list, activeFilter, setFilter, onAddApartment}) {
    return (
        <div className={styles.filter_holder}>
            <div className={styles.filter_list}>
                {list.map((item, index) => (
                    <Button 
                        key={index}
                        projectType={['apartments-filter', activeFilter === item && 'active_filter']}
                        onClick={() => setFilter(item)}>{item}</Button>
                ))}
            </div>
            <div className={styles.add_apartment}>
                <Button
                    onClick={onAddApartment}
                    projectType={['apartments-add']}>Добавить</Button>
            </div>
        </div>
    )
}