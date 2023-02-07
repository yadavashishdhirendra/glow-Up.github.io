import { CLEAR_COUPAN_ERRORS, CREATE_COUPAN_ERROR, CREATE_COUPAN_REQUEST, CREATE_COUPAN_SUCCESS, DELETE_COUPAN_ERROR, DELETE_COUPAN_REQUEST, DELETE_COUPAN_RESET, DELETE_COUPAN_SUCCESS, FETCH_ALL_COUPANS_ERROR, FETCH_ALL_COUPANS_REQUEST, FETCH_ALL_COUPANS_SUCCESS } from "../constants/CoupanConstansts";

export const createCoupanReducer = (state = {}, action) => {
      switch (action.type) {
            case CREATE_COUPAN_REQUEST:
                  return {
                        creating: true
                  }
            case CREATE_COUPAN_SUCCESS:
                  return {
                        creating: false,
                        coupan: action.payload
                  }
            case CREATE_COUPAN_ERROR:
                  return {
                        creating: false,
                        error: action.payload
                  }
            case CLEAR_COUPAN_ERRORS:
                  return {
                        ...state,
                        error: null
                  }
            default:
                  return state
      }
}
export const fetchAllCoupansReducer = (state = { coupans: [] }, action) => {
      switch (action.type) {
            case FETCH_ALL_COUPANS_REQUEST:
                  return {
                        loading: true
                  }
            case FETCH_ALL_COUPANS_SUCCESS:
                  return {
                        loading: false,
                        coupans: action.payload
                  }
            case FETCH_ALL_COUPANS_ERROR:
                  return {
                        loading: false,
                        error: action.payload
                  }
            case CLEAR_COUPAN_ERRORS:
                  return {
                        ...state,
                        error: null
                  }
            default:
                  return state
      }
}
export const deleteCoupanReducer = (state = {}, action) => {
      switch (action.type) {
            case DELETE_COUPAN_REQUEST:
                  return {
                        deleting: true
                  }
            case DELETE_COUPAN_SUCCESS:
                  return {
                        deleting: false,
                        deletedCoupan: action.payload
                  }
            case DELETE_COUPAN_ERROR:
                  return {
                        deleting: false,
                        error: action.payload
                  }
            case DELETE_COUPAN_RESET:
                  return {
                        deletedCoupan: null
                  }
            case CLEAR_COUPAN_ERRORS:
                  return {
                        ...state,
                        error: null
                  }
            default:
                  return state
      }
}