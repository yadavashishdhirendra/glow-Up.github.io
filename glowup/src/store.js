import {configureStore} from '@reduxjs/toolkit';
import { bookingsReducer, userReducer } from './Reducers/UserReducers';

const store = configureStore({
    reducer: {
        user: userReducer,
        bookings: bookingsReducer
    }
})


export default store;