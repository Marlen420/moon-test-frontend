import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { createApartments } from "../api/apartments";
import { toast } from 'react-toastify';

export const useAddApartment = (onclose) => {
    const [form, setForm] = useState({ client_name: '', area: '', floor: '', price: '', location: '' });
    const [error, setError] = useState({ client_name: false, area: false, floor: false, price: false, location: false, general: false });

    const dispatch = useDispatch();
    const { status, error: errorMessage } = useSelector(state => state.apartments);

    const handleInputChange = ({ target }) => {
        setForm(prev => ({...prev, [target.name]: target.value }));
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
        console.log(form);
        let data = {...form };
        data.area = data.area;
        data.floor = +data.floor;
        data.price = +data.price;
        console.log(data);
        dispatch(createApartments(data)).then((res) => {
            if (res.meta.requestStatus === 'fulfilled') {
                toast.success('Квартира добавлена');
                onclose();
            } else if (res.meta.requestStatus === 'rejected') {
                toast.error(res.payload);
            }
        })
    }

    useEffect(() => {
        if (errorMessage) {
            setError(prev => ({...prev, general: errorMessage }));
        }
    }, [error]);

    return {
        form,
        error,
        status,
        onChange: handleInputChange,
        onChangeNumber: handleInputNumberChange,
        onSubmit: handleSubmitForm
    }
}