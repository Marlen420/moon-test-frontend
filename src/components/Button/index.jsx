import clsx from 'clsx';
import styles from './style.module.scss';

export default function Button({type='button', onClick, loading=false, projectType=['default'], children, ...props}) {
    return <button type={type} onClick={onClick} className={clsx([...(projectType.map(item => styles[item]))])} {...props}>
        {
            loading
            ? <div className="spinner-border spinner-border-sm" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
            : children
        }
    </button>
}