import clsx from "clsx";
import { useState } from "react";
import { Button, Input, PopupHolder } from "../../../components";
import { APARTMENT_STATUS } from "../../constants/apartmentStatus";
import { useEditApartment } from "../../hooks/useEditApartment";
import styles from './style.module.scss';

export default function EditApartmentPopup({onClose, apartmentId = '64c8967669f1f428a346c9d0'}) {
    const { form, error, status, onChange, onSubmit, onStatusChange } = useEditApartment(onClose, apartmentId);
    return(
        <PopupHolder onClose={onClose}>
            <div 
                onClick={(e) => e.stopPropagation()}
                className={styles.popup_sidebar}>
                    <div className={styles.sidebar_header}>
                        <h3>Изменить</h3>
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
                            <label htmlFor="name">ФИО Клиента</label>
                            <Input 
                                id="name"
                                name="client_name"
                                value={form.client_name}
                                onChange={onChange}
                                projectType={['popup']}/>
                        </div>
                        <div className={styles.input_holder}>
                            <label htmlFor="client_phone">Номер клиента</label>
                            <Input 
                                id="client_phone"
                                name="client_phone"
                                value={form.client_phone}
                                onChange={onChange}
                                projectType={['popup']}/>
                        </div>
                        <div className={styles.input_holder}>
                            <label htmlFor="deal_number">№ Договора</label>
                            <Input 
                                type="text"
                                id="deal_number"
                                name="deal_number"
                                onChange={onChange}
                                value={form.deal_number}
                                projectType={['popup']}/>
                        </div>
                        <div className={styles.status_list}>
                            {Object.keys(APARTMENT_STATUS).map((item) => (
                                <span 
                                    className={clsx(form.status === item && styles.active_status)}
                                    onClick={() => onStatusChange(item)}>{APARTMENT_STATUS[item]}</span>
                            ))}
                        </div>
                    </div>
                    <div className={styles.button_list}>
                        <div className={styles.button_holder}>
                            <Button 
                                type="submit"
                                projectType={['primary']}
                                loading={status==='Updating'}>
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