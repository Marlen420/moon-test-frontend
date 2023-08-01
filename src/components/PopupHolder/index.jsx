import { useEffect } from "react";
import styles from './style.module.scss';

export default function PopupHolder({onClose, children}) {
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => document.body.style.overflow = 'auto';
    }, []);

    return (
        <div 
            className={styles.popup_outer}
            onClick={onClose}
            style={{zIndex: 1000}}>
                {children}
        </div>
    )
}