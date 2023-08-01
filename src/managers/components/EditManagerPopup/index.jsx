import { Button, Input, PopupHolder } from "../../../components";
import { useEditManager } from "../../hooks/useEditManager";
import styles from './style.module.scss';

export default function EditManagerPopup({onClose, managerId}) {
    const { form, error, status, onChange, onChangeNumber, onSubmit } = useEditManager(onClose, managerId);
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
                            <label htmlFor="fullname">ФИО менеджера</label>
                            <Input 
                                id="fullname"
                                name="fullname"
                                value={form.fullname}
                                onChange={onChange}
                                projectType={['popup']}/>
                        </div>
                        <div className={styles.input_holder}>
                            <label htmlFor="phone_number">Номер</label>
                            <Input 
                                id="phone_number"
                                name="phone_number"
                                value={form.phone_number}
                                onChange={onChangeNumber}
                                projectType={['popup']}/>
                        </div>
                        <div className={styles.input_holder}>
                            <label htmlFor="email">Почта</label>
                            <Input 
                                type="text"
                                id="email"
                                name="email"
                                onChange={onChange}
                                value={form.email}
                                projectType={['popup']}/>
                        </div>
                    </div>
                    <div className={styles.button_list}>
                        <div className={styles.button_holder}>
                            <Button 
                                type="submit"
                                projectType={['primary']}
                                loading={status==='Creating manager'}>
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