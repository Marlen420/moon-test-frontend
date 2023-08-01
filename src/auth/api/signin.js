import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { publicApi } from "../../utils/axios";

export const signin = createAsyncThunk(
    'auth/signin',
    async(data, { rejectWithValue }) => {
        try {
            const res = await publicApi.post('auth/signin', data);
            return res.data;
        } catch (e) {
            return rejectWithValue(e.response.data.message);
        }
    }
);