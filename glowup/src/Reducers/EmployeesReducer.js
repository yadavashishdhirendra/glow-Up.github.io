import { DELETE_EMPLOYEE_ERROR, DELETE_EMPLOYEE_REQUEST, DELETE_EMPLOYEE_SUCCESS, GET_ALL_EMPLOYEES_ERROR, GET_ALL_EMPLOYEES_REQUEST, GET_ALL_EMPLOYEES_SUCCESS, GET_EMPLOYEES_ERROR, GET_EMPLOYEES_REQUEST, GET_EMPLOYEES_SUCCESS } from "../constants/EmployeeConstants";


export const getEmployeesReducer = (state = {}, action) => {
      switch (action.type) {
            case GET_EMPLOYEES_REQUEST:
            case GET_ALL_EMPLOYEES_REQUEST:
                  return {
                        loading: true
                  }
            case GET_EMPLOYEES_SUCCESS:
            case GET_ALL_EMPLOYEES_SUCCESS:
                  return {
                        loading: false,
                        employees: action.payload,
                        serviceEmployees: action.serviceEmployees
                  }
            case GET_EMPLOYEES_ERROR:
            case GET_ALL_EMPLOYEES_ERROR:
                  return {
                        loading: false,
                        error: action.payload
                  }
            default:
                  return state
      }
}
export const deleteEmployeeReducer = (state = {}, action) => {
      switch (action.type) {
            case DELETE_EMPLOYEE_REQUEST:
                  return {
                        deleting: true
                  }
            case DELETE_EMPLOYEE_SUCCESS:
                  return {
                        deleting: false,
                        deleted: action.payload
                  }
            case DELETE_EMPLOYEE_ERROR:
                  return {
                        deleting: null,
                        error: action.payload
                  }
            default:
                  return state
      }
}