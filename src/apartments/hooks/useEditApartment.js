import { useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { updateApartment } from "../api/apartments";
import { toast } from 'react-toastify';

export const useEditApartment = (onclose, apartmentId) => {
    const { apartments } = useSelector(state => state.apartments);
    const selectedApartment = apartments.find((item) => item._id === apartmentId);
    const dispatch = useDispatch();
    const [form, setForm] = useState({
        client_name: selectedApartment.client_name,
        client_phone: selectedApartment.client_phone || '',
        deal_number: selectedApartment.deal_number || '',
        status: selectedApartment.status
    });
    const [error, setError] = useState({
        client_name: false,
        client_phone: false,
        deal_number: false,
        status: false,
        general: false
    });

    const handleInputChange = ({ target }) => {
        setForm(prev => ({...prev, [target.name]: target.value }));
        setError(prev => ({...prev, [target.name]: false }));
    }

    const handleSubmitForm = (e) => {
        e.preventDefault();
        console.log(form, error);
        let isError = false;
        Object.keys(error).forEach((item) => {
            if (error[item] === '') {
                setError(prev => ({...prev, [item]: 'Заполните это поле' }));
                if (!isError) {
                    isError = true;
                }
            }
        })
        if (isError) {
            return;
        }
        dispatch(updateApartment({ data: form, id: apartmentId })).then((res) => {
            if (res.meta.requestStatus === 'fulfilled') {
                toast.success('Изменения сохранены');
                onclose();
            }
        });
    }

    const handleSetStatus = (status) => {
        setForm(prev => ({...prev, status }));
        setError(prev => ({...prev, status: false }));
    }
    return {
        form,
        error,
        onChange: handleInputChange,
        onSubmit: handleSubmitForm,
        onStatusChange: handleSetStatus
    };
}