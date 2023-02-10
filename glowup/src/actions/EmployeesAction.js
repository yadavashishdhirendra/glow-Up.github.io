import axios from "axios"
import {
      GET_EMPLOYEES_ERROR,
      GET_EMPLOYEES_REQUEST,
      GET_EMPLOYEES_SUCCESS,
      GET_ALL_EMPLOYEES_REQUEST,
      GET_ALL_EMPLOYEES_SUCCESS,
      GET_ALL_EMPLOYEES_ERROR,
      DELETE_EMPLOYEE_REQUEST,
      DELETE_EMPLOYEE_SUCCESS,
      DELETE_EMPLOYEE_ERROR,
      DELETE_EMPLOYEE_FROM_SERVICE_REQUEST,
      DELETE_EMPLOYEE_FROM_SERVICE_SUCCESS,
      DELETE_EMPLOYEE_FROM_SERVICE_ERROR
} from "../constants/EmployeeConstants"

export const getEmployeesAction = (id) => async (dispatch) => {
      try {
            dispatch({ type: GET_EMPLOYEES_REQUEST })
            const { data } = await axios.get(`/api/v2/employees/${id}`)

            dispatch({ type: GET_EMPLOYEES_SUCCESS, serviceEmployees: data.serviceEmployees })
      } catch (error) {
            dispatch({ type: GET_EMPLOYEES_ERROR, payload: error.response.data.error })
      }
}
export const getAllEmployeesAction = (id) => async (dispatch) => {
      try {
            dispatch({ type: GET_ALL_EMPLOYEES_REQUEST })
            const { data } = await axios.get(`/api/v2/allemployees/${id}`)
            dispatch({ type: GET_ALL_EMPLOYEES_SUCCESS, payload: data.employees })
      } catch (error) {
            dispatch({ type: GET_ALL_EMPLOYEES_ERROR, payload: error.response.data.error })
      }
}
export const deleteEmployeeAction = (id) => async (dispatch) => {
      try {
            dispatch({ type: DELETE_EMPLOYEE_REQUEST })
            const { data } = await axios.delete(`/api/v2/delete-employee/${id}`)
            dispatch({type:DELETE_EMPLOYEE_SUCCESS,payload:data.deleted})
      } catch (error) {
            dispatch({type:DELETE_EMPLOYEE_ERROR,payload:error.response.data.error})
      }
}
export const deleteEmployeeFromServiceAction = (serviceId,empId) => async (dispatch) => {
      try {
            dispatch({ type: DELETE_EMPLOYEE_FROM_SERVICE_REQUEST })
            const { data } = await axios.put(`/api/v2/service/${serviceId}/employee/${empId}`)
            dispatch({ type: DELETE_EMPLOYEE_FROM_SERVICE_SUCCESS, payload: data.deleted })
      } catch (error) {
            dispatch({ type: DELETE_EMPLOYEE_FROM_SERVICE_ERROR, payload: error.response.data.error })
      }
}
