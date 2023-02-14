import axios from "axios";
import { CREATE_COUPAN_SUCCESS, CREATE_COUPAN_REQUEST, CREATE_COUPAN_ERROR, CLEAR_COUPAN_ERRORS, FETCH_ALL_COUPANS_REQUEST, FETCH_ALL_COUPANS_SUCCESS, FETCH_ALL_COUPANS_ERROR, DELETE_COUPAN_REQUEST, DELETE_COUPAN_SUCCESS, DELETE_COUPAN_ERROR } from "../constants/CoupanConstansts";

export const createCoupanAction = (
      name,
      description,
      discountPercentage,
      maxDiscount,
      category,
      condition,
      valid_from,
      valid_till,
      min_amount,
      time_period,
      all_vendors,
      selected_vendors,
      usage_limit
) => async (dispatch) => {
      try {
            dispatch({ type: CREATE_COUPAN_REQUEST })
            const { data } = await axios.post("api/v1/generate-coupan", {
                  name,
                  description,
                  maxDiscount,
                  discountPercentage,
                  category,
                  condition,
                  valid_from,
                  valid_till,
                  min_amount,
                  time_period,
                  all_vendors,
                  selected_vendors: all_vendors === "yes" ? [] : selected_vendors,
                  usage_limit
            })
            dispatch({ type: CREATE_COUPAN_SUCCESS, payload: data.newCoupan })
      } catch (error) {
            dispatch({ type: CREATE_COUPAN_ERROR, payload: error.response.data.err })
            setTimeout(() => {
                  dispatch({ type: CLEAR_COUPAN_ERRORS })
            }, 3000)
      }
}
export const fetchAllCoupansAction = () => async (dispatch) => {
      try {
            dispatch({ type: FETCH_ALL_COUPANS_REQUEST })
            const { data } = await axios.get("api/v1/coupans")
            console.log(data)
            dispatch({ type: FETCH_ALL_COUPANS_SUCCESS, payload: data.coupans })
      } catch (error) {
            console.log(error)
            dispatch({ type: FETCH_ALL_COUPANS_ERROR, payload: error.response.data.err })
            setTimeout(() => {
                  dispatch({ type: CLEAR_COUPAN_ERRORS })
            }, 3000)
      }
}
export const deleteCoupanAction = (id) => async (dispatch) => {
      try {
            dispatch({ type: DELETE_COUPAN_REQUEST })
            const { data } = await axios.delete(`api/v1/delete-coupan/${id}`)
            dispatch({ type: DELETE_COUPAN_SUCCESS, payload: data.deletedCoupan })
      } catch (error) {
            console.log(error)
            dispatch({ type: DELETE_COUPAN_ERROR, payload: error.response.data.err })
            setTimeout(() => {
                  dispatch({ type: CLEAR_COUPAN_ERRORS })
            }, 3000)
      }
}
