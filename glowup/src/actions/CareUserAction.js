import { LOAD_USER_ERROR, LOAD_USER_REQUEST, LOAD_USER_SUCCESS, LOGIN_ERROR, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT_ERROR, LOGOUT_SUCCESS,CLEAR_ERRORS } from '../constants/UserConstants';
import axios from 'axios';
export const CareloginUser = (email, password) => async (dispatch) => {
      try {
            dispatch({
                  type: LOGIN_REQUEST
            })
            const { data } = await axios.post(`/api/v2/customer-care/login`, { email, password }, {
                  headers: {
                        "Content-Type": "application/json"
                  }
            })
            dispatch({
                  type: LOGIN_SUCCESS,
                  payload: data.user
            })
      } catch (error) {
            dispatch({
                  type: LOGIN_ERROR,
                  payload: error.response.data
            })
            setTimeout(() => {
                  dispatch({type:CLEAR_ERRORS})
            },5000)
      }
}

export const CareUserload = () => async (dispatch) => {
      try {
            dispatch({
                  type: LOAD_USER_REQUEST
            })
            const { data } = await axios.get(`/api/v2/customer-care/profile`)
            dispatch({
                  type: LOAD_USER_SUCCESS,
                  payload: data.user
            })
      } catch (error) {
            dispatch({
                  type: LOAD_USER_ERROR,
                  payload: error.response.data.message
            })
      }
}
export const careLogoutUser = () => async (dispatch) => {
      try {
            await axios.post('/api/v2/customer-care/logout')
            dispatch({
                  type: LOGOUT_SUCCESS,
            })
      } catch (error) {
            dispatch({
                  type: LOGOUT_ERROR,
                  payload: error.response.data.message
            })
      }
}