import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { signin } from "../api/signin";

const SIGNIN_FORM = {
    login: '',
    password: ''
};
const SIGNIN_ERROR = {
    login: null,
    password: null,
    general: null
}

export const useAuth = (type = 'signin') => {
    const [form, setForm] = useState(type === 'signin' ? SIGNIN_FORM : {});
    const [error, setError] = useState(type === 'signin' ? SIGNIN_ERROR : {});

    const { status, error: errorMessage } = useSelector(state => state.auth);
    const dispatch = useDispatch();

    useEffect(() => {
        if (errorMessage && errorMessage.signin) {
            setError(prev => ({...prev, general: errorMessage.signin }));
        }
    }, [errorMessage]);

    const handleInputChange = ({ target }) => {
        setForm(prev => ({...prev, [target.name]: target.value }));
        setError(prev => ({...prev, [target.name]: false }));
    }

    const handleFormSubmit = (e) => {
        e.preventDefault();
        let isError = false;
        Object.keys(form).forEach((item) => {
            if (form[item] === '') {
                setError(prev => ({...prev, [item]: '* Заполните это поле' }));
                if (!isError) {
                    isError = true;
                }
            }
        })
        if (isError) {
            return;
        }
        dispatch(signin(form))
    }

    return {
        form,
        error,
        errorMessage,
        status,
        onChange: handleInputChange,
        onSubmit: handleFormSubmit
    }
}