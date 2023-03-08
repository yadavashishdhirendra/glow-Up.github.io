import {
      LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_ERROR,
      LOGOUT_SUCCESS, LOGOUT_REQUEST, LOGOUT_ERROR,
      CLEAR_ERRORS
} from "../constants/UserConstants";
import {CARE_USER_ERROR,CARE_USER_REQUEST,CARE_USER_SUCCESS} from "../constants/UserConstants"
const initialState = {
      isAuthenticated: false,
};
export const CustomerCareUserReducer = (state = initialState, action) => {
      switch (action.type) {
            case LOGIN_REQUEST:
            case LOGOUT_REQUEST:
            case CARE_USER_REQUEST:
                  return {
                        loading: true,
                  }
            case LOGIN_SUCCESS:
            case CARE_USER_SUCCESS:
                  return {
                        loading: false,
                        user: action.payload,
                        careUserLoggedin: true
                  }
            case LOGIN_ERROR:
            case LOGOUT_ERROR:
            case CARE_USER_ERROR:
                  return {
                        loading: false,
                        error: action.payload
                  }

            case LOGOUT_SUCCESS:
                  return {
                        loading: false,
                        user: null,
                        careUserLoggedin: false
                  }
            case CLEAR_ERRORS:
                  return {
                        loading: false,
                        error: null
                  }
            default:
                  return state
      }
}