import { createSlice } from '@reduxjs/toolkit'
import { createApartments, deleteApartment, getApartments, updateApartment } from '../api/apartments';

const initialState = {
    apartments: [],
    status: null,
    error: null
}

export const apartmentsSlice = createSlice({
    name: 'apartments',
    initialState,
    reducers: {},
    extraReducers: {
        [getApartments.pending]: (state) => {
            state.status = 'Fetching data';
            state.error = null;
        },
        [getApartments.fulfilled]: (state, { payload }) => {
            state.status = null;
            state.error = null;
            state.apartments = payload;
        },
        [getApartments.rejected]: (state, { payload }) => {
            state.error = payload;
            state.status = null;
        },
        [createApartments.pending]: (state) => {
            state.status = 'Creating appartment';
            state.error = null;
        },
        [createApartments.fulfilled]: (state, { payload }) => {
            state.apartments = [...state.apartments, payload];
            state.status = null;
            state.error = null;
        },
        [createApartments.rejected]: (state, { payload }) => {
            state.status = null;
            state.error = payload;
        },
        [deleteApartment.pending]: (state, { payload }) => {
            state.status = 'Deleting';
            state.error = null;
        },
        [deleteApartment.fulfilled]: (state, { payload }) => {
            state.apartments = state.apartments.filter(item => item._id !== payload._id);
            state.error = null;
            state.status = null;
        },
        [deleteApartment.rejected]: (state, { payload }) => {
            state.status = null;
            state.error = payload;
        },
        [updateApartment.pending]: (state, { payload }) => {
            state.status = 'Updating';
            state.error = null;
        },
        [updateApartment.fulfilled]: (state, { payload }) => {
            const index = state.apartments.findIndex(item => item._id === payload._id);
            state.apartments[index] = payload;
            state.error = null;
            state.status = null;
        },
        [updateApartment.rejected]: (state, { payload }) => {
            state.status = null;
            state.error = payload;
        }
    }
})

export const {} = apartmentsSlice.actions;

export default apartmentsSlice;