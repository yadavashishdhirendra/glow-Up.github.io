import {
      FETCH_ALL_SALOONS_ERROR, FETCH_ALL_SALOONS_REQUEST, FETCH_ALL_SALOONS_SUCCESS,
      GET_SERVICES_ERROR,GET_SERVICES_REQUEST,GET_SERVICES_SUCCESS
} from "../constants/SaloonConstants";
let initialState = {
      saloons: []
}
export const fetchAllSaloonsReducer = (state = initialState, action) => {
      switch (action.type) {
            case FETCH_ALL_SALOONS_REQUEST:
                  return {
                        loading: true
                  }
            case FETCH_ALL_SALOONS_SUCCESS:
                  return {
                        loading: false,
                        saloons: action.payload
                  }
            case FETCH_ALL_SALOONS_ERROR:
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