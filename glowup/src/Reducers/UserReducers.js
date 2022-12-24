import { createReducer } from "@reduxjs/toolkit";
const initialState = {
    isAuthenticated: false,
};

export const userReducer = createReducer(initialState, {
    // LOGIN
    LoginRequest: (state) => {
        state.loading = true;
    },
    LoginSuccess: (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
    },

    LogoutSuccess: (state) => {
        state.loading = false;
        state.user = null;
        state.isAuthenticated = false;
    },

    LoginFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
    },

    LogoutFail: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },

    // LOAD USER
    LoadUserRequest: (state) => {
        state.loading = true;
    },
    LoadUserSuccess: (state, action) => {
        state.user = action.payload;
        state.user = action.payload;
        state.isAuthenticated = true;
    },
    LoadUserFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
    },
    clearErrors: (state) => {
        state.error = null
    },
})

export const bookingsReducer = createReducer(initialState, {
    GetBookingsRequest: (state) => {
        state.loading = true
    },
    GetBookingsSuccess: (state, action) => {
        state.loading = false;
        state.bookings = action.payload;
    },
    GetBookingsFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },
    clearErrors: (state) => {
        state.error = null
    },
})