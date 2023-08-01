import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { privateApi } from "../../utils/axios";

export const getApartments = createAsyncThunk(
    'apartments/getApartments',
    async(_, { rejectWithValue }) => {
        try {
            // const res = await axios.get('http://localhost:3001/apartments');
            const res = await privateApi.get('apartments');
            return res.data;
        } catch (err) {
            return rejectWithValue(err.response.data.message);
        }
    }
);

export const createApartments = createAsyncThunk(
    'apartments/createApartments',
    async(data, { rejectWithValue }) => {
        try {
            const res = await privateApi.post('apartments', data);
            return res.data;
        } catch (err) {
            return rejectWithValue(err.response.data.message);
        }
    }
);

export const deleteApartment = createAsyncThunk(
    'apartments/deleteApartment',
    async(id, { rejectWithValue }) => {
        try {
            const res = await privateApi.delete('apartments/' + id, data);
            return res.data;
        } catch (e) {
            return rejectWithValue(e.response.data.message);
        }
    }
);

export const updateApartment = createAsyncThunk(
    'apartments/updateApartment',
    async({ data, id }, { rejectWithValue }) => {
        try {
            const res = await privateApi.patch('apartments/' + id, data);
            return res.data;
        } catch (e) {
            return rejectWithValue(e.response.data.message);
        }
    }
)