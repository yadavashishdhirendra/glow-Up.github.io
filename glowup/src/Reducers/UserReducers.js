import { CLEAR_BOOKINGS_ERRORS, GET_BOOKINGS_ERROR, GET_BOOKINGS_REQUEST, GET_BOOKINGS_SUCCESS } from "../constants/BookingsConstants";
import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_ERROR, LOGOUT_SUCCESS, LOGOUT_REQUEST, LOGOUT_ERROR, LOAD_USER_REQUEST, LOAD_USER_SUCCESS, LOAD_USER_ERROR, CLEAR_ERRORS } from "../constants/UserConstants";
const initialState = {
    isAuthenticated: false,
};
export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_REQUEST:
        case LOGOUT_REQUEST:
        case LOAD_USER_REQUEST:
            return {
                loading: true,
            }
        case LOGIN_SUCCESS:
        case LOAD_USER_SUCCESS:
            return {
                loading: false,
                user: action.payload,
                isAuthenticated: true
            }
        case LOGIN_ERROR:
        case LOGOUT_ERROR:
        case LOAD_USER_ERROR:
            return {
                loading: false,
                error: action.payload
            }

        case LOGOUT_SUCCESS:
            return {
                loading: false,
                user: null,
                isAuthenticated: false
            }
        case CLEAR_ERRORS:
            return {
                loading: false,
                error: null
            }
        default:
            return state
    }
}
export const bookingsReducer = (state = {}, action) => {
    switch (action.type) {
        case GET_BOOKINGS_REQUEST:
            return {
                loading: true
            }
        case GET_BOOKINGS_SUCCESS:
            return {
                loading: false,
                bookings: action.payload
            }
        case GET_BOOKINGS_ERROR:
            return {
                loading: false,
                error: action.payload
            }
        case CLEAR_BOOKINGS_ERRORS:
            return {
                error: null
            }
        default:
            return state
    }
}
