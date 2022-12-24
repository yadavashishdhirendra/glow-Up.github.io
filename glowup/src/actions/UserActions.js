import axios from 'axios';

export const loginUser = (email, password) => async (dispatch) => {
    try {
        dispatch({
            type: "LoginRequest"
        })
        const { data } = await axios.post(`/api/v2/login/user/bookings`, { email, password }, {
            headers: {
                "Content-Type": "application/json"
            }
        })
        dispatch({
            type: "LoginSuccess",
            payload: data.user
        })
    } catch (error) {
        dispatch({
            type: "LoginFailure",
            payload: error.response.data.message
        })
    }
}

export const loadUser = () => async (dispatch) => {
    try {
        dispatch({
            type: "LoadUserRequest"
        })
        const { data } = await axios.get(`/api/v2/web/user`)
        dispatch({
            type: "LoadUserSuccess",
            payload: data.user
        })
    } catch (error) {
        dispatch({
            type: "LoadUserFailure",
            payload: error.response.data.message
        })
    }
}

export const logoutUser = () => async (dispatch) => {
    try {
        await axios.get('/api/v2/logout/user/bookings')
        dispatch({
            type: "LogoutSuccess",
        })
    } catch (error) {
        dispatch({
            type: "LogoutFail",
            payload: error.response.data.message
        })
    }
}

export const getAllBookings = () => async (dispatch) => {
    try {
        dispatch({
            type: "GetBookingsRequest"
        })
        const { data } = await axios.get(`/api/v2/allweb/user/bookings`)
        dispatch({
            type: "GetBookingsSuccess",
            payload: data.bookings
        })
    } catch (error) {
        dispatch({
            type: "GetBookingsFailure",
            payload: error.response.data.message
        })
    }
}