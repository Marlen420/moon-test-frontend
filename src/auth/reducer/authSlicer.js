import { createSlice } from '@reduxjs/toolkit'
import { deleteCookie, getCookie, setCookie } from '../../utils/coockie';
import { signin } from '../api/signin';
import jwt_decode from 'jwt-decode';
import { isTokenExpired } from '../../utils/tokenChecker';

const checkToken = () => {
    const token = getCookie('token');
    if (token) {
        if (!isTokenExpired(token)) {
            return jwt_decode(token)._doc;
        }
    }
    return null;
}

const initialState = {
    isLogged: checkToken() === null ? false : true,
    user: checkToken(),
    status: null,
    error: null
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
            state.isLogged = false;
            deleteCookie('token');
        }
    },
    extraReducers: {
        [signin.pending]: (state) => {
            state.status = 'Loading';
            state.error = null;
        },
        [signin.fulfilled]: (state, { payload }) => {
            state.isLogged = true;
            state.user = jwt_decode(payload.access_token)._doc;
            state.error = null;
            state.status = null;
            setCookie('token', payload.access_token, 1);
        },
        [signin.rejected]: (state, { payload }) => {
            state.status = null;
            console.log('Error: ', payload);
            state.error = {
                signin: payload
            }
        }
    }
})

export const { logout } = authSlice.actions

export default authSlice;