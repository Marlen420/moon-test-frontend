import clsx from "clsx";
import { Input } from "../../components";
import { Button } from "../../components";
import { useAuth } from "../hooks/useAuth";
import styles from './style.module.scss';

export default function SigninView() {
    const { form, error, errorMessage, status, onChange, onSubmit } = useAuth('signin');
    return (
        <div className={styles.signin_holder}>
            <form className={styles.form_holder} onSubmit={onSubmit}>
                <h1>Авторизация</h1>
                <div className={styles.input_holder}>
                    <label className={clsx(error.login && 'error_span')} htmlFor="login">Почта/Номер телефона</label>
                    <Input 
                        id="login"
                        name="login"
                        value={form.login}
                        projectType={[error.login && 'error']}
                        onChange={onChange}/>
                </div>
                <div className={styles.input_holder}>
                    <label className={clsx(error.password && 'error_span')} htmlFor="password">Пароль</label>
                    <Input 
                        type="password"
                        id="password"
                        name="password"
                        value={form.password}
                        projectType={[error.password && 'error']}
                        onChange={onChange}/>
                </div>
                <p style={{margin: 0, color: errorMessage?.signin ? 'red' : 'transparent'}}>* {errorMessage?.signin || '-'}</p>
                <Button type="submit" projectType={['primary']}>
                    {
                        status === 'Loading'
                        ? <div className="spinner-border spinner-border-sm" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                        : 'Войти'
                    }
                </Button>
            </form>
        </div>
    )
}