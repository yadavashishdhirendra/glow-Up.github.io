import axios from "axios"
import {
      FETCH_ALL_SALOONS_ERROR, FETCH_ALL_SALOONS_REQUEST, FETCH_ALL_SALOONS_SUCCESS,
      GET_SERVICES_ERROR, GET_SERVICES_REQUEST, GET_SERVICES_SUCCESS
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