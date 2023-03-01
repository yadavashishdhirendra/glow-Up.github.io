import axios from "axios"
import { GET_BOOKINGS_ERROR, GET_BOOKINGS_REQUEST, GET_BOOKINGS_SUCCESS } from "../constants/BookingsConstants"
import {
      ACCOUNTS_ERROR,
      ACCOUNTS_REQUEST,
      ACCOUNTS_SUCCESS,
      FETCH_ALL_SALOONS_ERROR, FETCH_ALL_SALOONS_REQUEST, FETCH_ALL_SALOONS_SUCCESS,
      GET_SERVICES_ERROR, GET_SERVICES_REQUEST, GET_SERVICES_SUCCESS, UPDATE_SERVICES_ERROR, UPDATE_SERVICES_REQUEST, UPDATE_SERVICES_SUCCESS
} from "../constants/SaloonConstants"

export const fetchAllSaloonsAction = () => async (dispatch) => {
      try {
            dispatch({ type: FETCH_ALL_SALOONS_REQUEST })
            const { data } = await axios.get("/api/v2/saloons")
            dispatch({ type: FETCH_ALL_SALOONS_SUCCESS, payload: data.saloons })
      } catch (error) {
            dispatch({ type: FETCH_ALL_SALOONS_ERROR, payload: error.response.data.error })
      }
}
export const getServicesAction = (id) => async (dispatch) => {
      try {
            dispatch({ type:GET_SERVICES_REQUEST })
            const { data } = await axios.get(`/api/v2/services/${id}`)
            dispatch({ type: GET_SERVICES_SUCCESS, payload: data.service })
      } catch (error) {
            dispatch({ type: GET_SERVICES_ERROR, payload: error.response.data.error })
      }
}
export const updateServicesAction = (field,value,ids,empIds) => async (dispatch) => {
      try {
            dispatch({ type: UPDATE_SERVICES_REQUEST })
            const { data } = await axios.patch("/api/v2/updateservices",{field,value:empIds.length?empIds:value,ids,empIds})
            dispatch({type:UPDATE_SERVICES_SUCCESS,payload:data})
      } catch (error) {
            dispatch({type:UPDATE_SERVICES_ERROR,payload:error.response.data.error})
      }
}
export const accountsAction = (start,end) => async (dispatch) => {
      try {
            console.log(start,end)
            dispatch({ type: ACCOUNTS_REQUEST })
            const { data } = await axios.post("/api/v2/account", { start:start,end:end})
            dispatch({ type: ACCOUNTS_SUCCESS, payload: data.bookings })
      } catch (error) {
            dispatch({ type: ACCOUNTS_ERROR, payload: error.response.data.error })
      }
}
export const getAllBookingsOfSaloon = (id) => async (dispatch) => {
      try {
            dispatch({
                  type: GET_BOOKINGS_REQUEST
            })
            const { data } = await axios.get(`/api/v2/bookings/${id}`)
            dispatch({
                  type: GET_BOOKINGS_SUCCESS,
                  payload: data.bookings
            })
      } catch (error) {
            dispatch({
                  type: GET_BOOKINGS_ERROR,
                  payload: error.response.data.message
            })
      }
}