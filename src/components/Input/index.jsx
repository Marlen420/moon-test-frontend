import clsx from 'clsx';
import styles from './style.module.scss';
import { memo } from 'react';

export default function Input({type='text', id, name, value, onChange, projectType=['default'], children, ...props}) {
    return (
        <input
            type={type}
            id={id}
            name={name}
            value={value}
            onChange={onChange}
            className={clsx([ ...(projectType.map((item) => styles[item])) ])}
            {...props} />);
}