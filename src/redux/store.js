import { configureStore } from '@reduxjs/toolkit'
import { apartmentsSlice } from '../apartments'
import { authSlice } from '../auth'
import { managersSlice } from '../managers'

export const store = configureStore({
    reducer: {
        [authSlice.name]: authSlice.reducer,
        [apartmentsSlice.name]: apartmentsSlice.reducer,
        [managersSlice.name]: managersSlice.reducer
    },
})