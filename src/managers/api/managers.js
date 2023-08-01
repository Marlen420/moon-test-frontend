import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getManagers = createAsyncThunk(
    'managers/getManagers',
    async(_, { rejectWithValue }) => {
        try {
            const res = await privateApi.get('users/managers');
            return res.data;
        } catch (e) {
            return rejectWithValue(e.response.data.message);
        }
    }
);

export const createManager = createAsyncThunk(
    'managers/createManager',
    async(data, { rejectWithValue }) => {
        try {
            const res = await privateApi.post('users', data);
            return res.data;
        } catch (e) {
            return rejectWithValue(e.respones.data.message);
        }
    }
);

export const updateManager = createAsyncThunk(
    'manager/updateManager',
    async({ data, id }, { rejectWithValue }) => {
        try {
            const res = await privateApi.patch('users/' + id, data);
            return res.data;
        } catch (e) {
            return rejectWithValue(e.respones.data.message);
        }
    }
);

export const deleteManager = createAsyncThunk(
    'manager/deleteManager',
    async(id, { rejectWithValue }) => {
        try {
            const res = await privateApi.delete('users/' + id);
            return res.data;
        } catch (e) {
            return rejectWithValue(e.respones.data.message);
        }
    }
)