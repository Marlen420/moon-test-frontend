import { createSlice } from '@reduxjs/toolkit'
import { createManager, deleteManager, getManagers, updateManager } from '../api/managers';

const initialState = {
    managers: [],
    status: null,
    error: null
}

export const managersSlice = createSlice({
    name: 'managers',
    initialState,
    reducers: {},
    extraReducers: {
        [getManagers.pending]: (state) => {
            state.status = 'Fetching managers';
            state.error = null;
        },
        [getManagers.fulfilled]: (state, { payload }) => {
            state.managers = payload;
            state.status = null;
            state.error = null;
        },
        [getManagers.rejected]: (state, { payload }) => {
            state.status = null;
            state.error = payload;
        },
        [createManager.pending]: (state) => {
            state.status = 'Creating manager';
            state.error = null;
        },
        [createManager.fulfilled]: (state, { payload }) => {
            state.managers = [...state.managers, payload._doc];
            state.status = null;
            state.error = null;
        },
        [createManager.rejected]: (state, { payload }) => {
            state.status = null;
            state.error = payload;
        },
        [updateManager.pending]: (state) => {
            state.status = 'Updating manager';
            state.error = null;
        },
        [updateManager.fulfilled]: (state, { payload }) => {
            const index = state.managers.findIndex(item => item._id === payload._doc._id);
            if (index > 0) {
                state.managers[index] = payload._doc;
            }
            state.status = null;
            state.error = null;
        },
        [updateManager.rejected]: (state, { payload }) => {
            state.status = null;
            state.error = payload;
        },
        [deleteManager.pending]: (state) => {
            state.status = 'Deleting manager';
            state.error = null;
        },
        [deleteManager.fulfilled]: (state, { payload }) => {
            state.managers = state.managers.filter(item => item._id !== payload._doc._id);
            state.status = null;
            state.error = null;
        },
        [deleteManager.rejected]: (state, { payload }) => {
            state.status = null;
            state.error = payload;
        }
    }
})

export const {} = managersSlice.actions

export default managersSlice;