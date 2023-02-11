import {
      DELETE_EMPLOYEE_ERROR,
      DELETE_EMPLOYEE_REQUEST,
      DELETE_EMPLOYEE_SUCCESS,

      DELETE_EMPLOYEE_FROM_SERVICE_ERROR,
      DELETE_EMPLOYEE_FROM_SERVICE_REQUEST,
      DELETE_EMPLOYEE_FROM_SERVICE_SUCCESS,

      GET_ALL_EMPLOYEES_ERROR,
      GET_ALL_EMPLOYEES_REQUEST,
      GET_ALL_EMPLOYEES_SUCCESS,

      GET_EMPLOYEES_ERROR,
      GET_EMPLOYEES_REQUEST,
      GET_EMPLOYEES_SUCCESS,

      GET_SINGLE_EMPLOYEE_ERROR,
      GET_SINGLE_EMPLOYEE_REQUEST,
      GET_SINGLE_EMPLOYEE_SUCCESS,
      CLEAR_EMPLOYEES_ERRORS,
      EDIT_EMPLOYEE_REQUEST,
      EDIT_EMPLOYEE_SUCCESS,
      EDIT_EMPLOYEE_ERROR,
      EDIT_EMPLOYEE_RESET

} from "../constants/EmployeeConstants";


export const getEmployeesReducer = (state = {}, action) => {
      switch (action.type) {
            case GET_EMPLOYEES_REQUEST:
            case GET_ALL_EMPLOYEES_REQUEST:
            case GET_SINGLE_EMPLOYEE_REQUEST:
                  return {
                        loading: true
                  }
            case GET_EMPLOYEES_SUCCESS:
            case GET_ALL_EMPLOYEES_SUCCESS:
            case GET_SINGLE_EMPLOYEE_SUCCESS:
                  return {
                        loading: false,
                        employees: action.payload,
                        serviceEmployees: action.serviceEmployees,
                        employee: action.employee
                  }
            case GET_EMPLOYEES_ERROR:
            case GET_ALL_EMPLOYEES_ERROR:
            case GET_SINGLE_EMPLOYEE_ERROR:
                  return {
                        loading: false,
                        error: action.payload
                  }
            case CLEAR_EMPLOYEES_ERRORS:
                  return {
                        loading: null,
                        error: null
                  }
            default:
                  return state
      }
}
export const deleteEmployeeReducer = (state = {}, action) => {
      switch (action.type) {
            case DELETE_EMPLOYEE_REQUEST:
            case DELETE_EMPLOYEE_FROM_SERVICE_REQUEST:
                  return {
                        deleting: true
                  }
            case DELETE_EMPLOYEE_SUCCESS:
            case DELETE_EMPLOYEE_FROM_SERVICE_SUCCESS:
                  return {
                        deleting: false,
                        deleted: action.payload
                  }
            case DELETE_EMPLOYEE_ERROR:
            case DELETE_EMPLOYEE_FROM_SERVICE_ERROR:
                  return {
                        deleting: null,
                        error: action.payload
                  }
            default:
                  return state
      }
}
export const editEmployeeReducer = (state = {}, action) => {
      switch (action.type) {
            case EDIT_EMPLOYEE_REQUEST:
                  return {
                        loading: true
                  }
            case EDIT_EMPLOYEE_SUCCESS:
                  return {
                        loading: false,
                        edited: action.payload
                  }
            case EDIT_EMPLOYEE_ERROR:
                  return {
                        loading: false,
                        error: action.payload
                  }
            case EDIT_EMPLOYEE_RESET:
                  return {
                        loading: null,
                        edited: null
                  }
            case CLEAR_EMPLOYEES_ERRORS:
                  return {
                        error: null,
                  }
            default:
                  return state
      }
}