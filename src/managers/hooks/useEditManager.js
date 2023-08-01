import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { createManager, updateManager } from "../api/managers";
import { toast } from 'react-toastify';

export const useEditManager = (onclose, managerId) => {
    const dispatch = useDispatch();
    const { status, error: errorMessage, managers } = useSelector(state => state.managers);
    const selectedManager = managers.find(item => item._id === managerId);

    const [form, setForm] = useState({ fullname: selectedManager.fullname || '', phone_number: selectedManager.phone_number || '', email: selectedManager.email || '' });
    const [error, setError] = useState({ fullname: false, phone_number: false, email: false, general: false });

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
        const { password, ...sendForm } = form;
        dispatch(updateManager({ data: sendForm, id: managerId })).then((res) => {
            if (res.meta.requestStatus === 'fulfilled') {
                toast.success('Изменения сохранены');
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