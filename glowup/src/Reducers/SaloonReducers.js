import {
      ACCOUNTS_ERROR,
      ACCOUNTS_REQUEST,
      ACCOUNTS_SUCCESS,
      FETCH_ALL_SALOONS_ERROR, FETCH_ALL_SALOONS_REQUEST, FETCH_ALL_SALOONS_SUCCESS,
      GET_SERVICES_ERROR, GET_SERVICES_REQUEST, GET_SERVICES_SUCCESS, UPDATE_SERVICES_ERROR, UPDATE_SERVICES_REQUEST, UPDATE_SERVICES_RESET, UPDATE_SERVICES_SUCCESS
} from "../constants/SaloonConstants";
let initialState = {
      saloons: []
}
export const fetchAllSaloonsReducer = (state = initialState, action) => {
      switch (action.type) {
            case FETCH_ALL_SALOONS_REQUEST:
            case ACCOUNTS_REQUEST:
                  return {
                        loading: true
                  }
            case FETCH_ALL_SALOONS_SUCCESS:
            case ACCOUNTS_SUCCESS:
                  return {
                        loading: false,
                        saloons: action.payload
                  }
            case FETCH_ALL_SALOONS_ERROR:
            case ACCOUNTS_ERROR:
                  return {
                        loading: false,
                        error: action.payload
                  }
            default:
                  return state
      }
}
export const getServicesReducer = (state = {}, action) => {
      switch (action.type) {
            case GET_SERVICES_REQUEST:
                  return {
                        loading: true
                  }
            case GET_SERVICES_SUCCESS:
                  return {
                        loading: false,
                        services: action.payload
                  }
            case GET_SERVICES_ERROR:
                  return {
                        loading: false,
                        error: action.payload
                  }
            default:
                  return state
      }
}
export const updateServicesReducer = (state = {}, action) => {
      switch (action.type) {
            case UPDATE_SERVICES_REQUEST:
                  return {
                        updating: true
                  }
            case UPDATE_SERVICES_SUCCESS:
                  return {
                        updating: false,
                        success: action.payload.success,
                        service: action.payload.response
                  }
            case UPDATE_SERVICES_ERROR:
                  return {
                        updating: false,
                        error: action.payload
                  }
            case UPDATE_SERVICES_RESET:
                  return {
                        updating: null,
                  }
            default:
                  return state
      }
}