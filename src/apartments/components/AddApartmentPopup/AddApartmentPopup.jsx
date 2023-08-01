import clsx from "clsx";
import { Button, Input, PopupHolder } from "../../../components";
import { useAddApartment } from "../../hooks/useAddApartment";
import styles from './style.module.scss';

export default function AddApartmentPopup({onClose}) {
    const { form, error, status, onChange, onChangeNumber, onSubmit } = useAddApartment(onClose);
    return (
        <PopupHolder onClose={onClose}>
            <div 
                onClick={(e) => e.stopPropagation()}
                className={styles.popup_sidebar}>
                <div className={styles.sidebar_header}>
                    <h3>Добавить</h3>
                    <Button 
                        onClick={onClose}
                        projectType={['close-popup']}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#8f9396" className="bi bi-x-lg" viewBox="0 0 16 16">
                            <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
                        </svg>
                    </Button>
                </div>
                <form onSubmit={onSubmit}>
                    <div className={styles.input_list}>
                        <div className={styles.input_holder}>
                            <label className={clsx(error?.client_name && 'error_span')} htmlFor="name">ФИО Клиента</label>
                            <Input 
                                id="name"
                                name="client_name"
                                value={form.client_name}
                                onChange={onChange}
                                projectType={['popup', error?.client_name && 'error']}/>
                            <p className={clsx(error?.client_name ? 'error' : 'no_error')}>{error?.client_name || '-'}</p>
                        </div>
                        <div className={styles.input_holder}>
                            <label className={clsx(error?.location && 'error_span')} htmlFor="location">Объект</label>
                            <Input 
                                id="location"
                                name="location"
                                value={form.location}
                                onChange={onChange}
                                projectType={['popup', error?.location && 'error']}/>
                            <p className={clsx(error?.location ? 'error' : 'no_error')}>{error?.location || '-'}</p>
                        </div>
                        <div className={styles.input_holder}>
                            <label className={clsx(error?.floor && 'error_span')} htmlFor="floor">Этаж</label>
                            <Input 
                                type="text"
                                id="floor"
                                name="floor"
                                onChange={onChangeNumber}
                                value={form.floor}
                                projectType={['popup', error?.floor && 'error']}/>
                            <p className={clsx(error?.floor ? 'error' : 'no_error')}>{error?.floor || '-'}</p>
                        </div>
                        <div className={styles.input_holder}>
                            <label className={clsx(error?.area && 'error_span')} htmlFor="area">Кв</label>
                            <Input 
                                type="text"
                                id="area"
                                name="area"
                                onChange={onChangeNumber}
                                value={form.area}
                                projectType={['popup', error?.area && 'error']}/>
                            <p className={clsx(error?.area ? 'error' : 'no_error')}>{error?.area || '-'}</p>
                        </div>
                        <div className={styles.input_holder}>
                            <label className={clsx(error?.price && 'error_span')} htmlFor="price">Цена</label>
                            <Input 
                                type="text"
                                id="price"
                                name="price"
                                value={form.price}
                                onChange={onChangeNumber}
                                projectType={['popup', error?.price && 'error']}/>
                            <p className={clsx(error?.price ? 'error' : 'no_error')}>{error?.price || '-'}</p>
                        </div>
                    </div>
                    <div className={styles.button_list}>
                        <div className={styles.button_holder}>
                            <Button 
                                type="submit"
                                projectType={['primary']}
                                loading={status==='Creating appartment'}>
                                    Сохранить
                            </Button>
                        </div>
                        <div className={styles.button_holder}>
                            <Button 
                                onClick={onClose}
                                projectType={['empty']}>Отмена</Button>
                        </div>
                    </div>
                </form>
            </div>
        </PopupHolder>
    )
}