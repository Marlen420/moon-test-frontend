import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { createManager } from "../api/managers";
import { toast } from 'react-toastify';

export const useAddManager = (onclose) => {
    const [form, setForm] = useState({ fullname: '', phone_number: '', email: '', password: '' });
    const [error, setError] = useState({ fullname: false, phone_number: false, email: false, password: false, general: false });

    const dispatch = useDispatch();
    const { status, error: errorMessage } = useSelector(state => state.managers);

    const handleInputChange = ({ target }) => {
        setForm(res => ({...res, [target.name]: target.value }));
        setError(prev => ({...prev, [target.name]: false }));
    }

    const handleInputNumberChange = ({ target }) => {
        let inputValue = target.value.replace(/[^0-9.,]/g, '').replace(/(\..*?)\..*/g, '$1');
        if (inputValue.charAt(0) === ',') {
            inputValue = inputValue.slice(1);
        }
        setForm(prev => ({...prev, [target.name]: inputValue }));
        setError(prev => ({...prev, [target.name]: false }));
    }

    const handleSubmitForm = (e) => {
        e.preventDefault();
        console.log(form);
        let isError = false;
        Object.keys(form).forEach((item) => {
            if (form[item] === '') {
                setError(prev => ({...prev, [item]: 'Заполните это поле' }));
                if (!isError) {
                    isError = true;
                }
            }
        })
        if (isError) {
            return;
        }
        dispatch(createManager(form)).then((res) => {
            if (res.meta.requestStatus === 'fulfilled') {
                toast.success('Менеджер успешно добавлен');
                onclose();
            }
        })
    }

    useEffect(() => {
        if (errorMessage) {
            setError(prev => ({...prev, general: errorMessage }));
        }
    }, [errorMessage])

    return {
        form,
        error,
        status,
        onChange: handleInputChange,
        onChangeNumber: handleInputNumberChange,
        onSubmit: handleSubmitForm
    }
}