import {
      LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_ERROR,
      LOGOUT_SUCCESS, LOGOUT_REQUEST, LOGOUT_ERROR,
      LOAD_USER_REQUEST, LOAD_USER_SUCCESS, LOAD_USER_ERROR,
      CLEAR_ERRORS
} from "../constants/UserConstants";
const initialState = {
      isAuthenticated: false,
};
export const CustomerCareUserReducer = (state = initialState, action) => {
      switch (action.type) {
            case LOGIN_REQUEST:
            case LOGOUT_REQUEST:
            case LOAD_USER_REQUEST:
                  return {
                        loading: true,
                  }
            case LOGIN_SUCCESS:
            case LOAD_USER_SUCCESS:
                  return {
                        loading: false,
                        user: action.payload,
                        careUserLoggedin: true
                  }
            case LOGIN_ERROR:
            case LOGOUT_ERROR:
            case LOAD_USER_ERROR:
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