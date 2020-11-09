import * as actionTypes from "../actions/actionTypes";

const initialState = {};

const userReducers = (state = initialState, action) => {
  switch (action.type) {
    // case actionTypes.LOGIN_SUCCESS:
    //   return {
    //     ...state,
    //     firstName: action.user.first_name,
    //     lastName: action.user.last_name,
    //     fullName: action.user.full_name,
    //     email: action.user.email,
    //     message: null
    //   };
    // case actionTypes.LOGIN_FAIL:
    //   return {
    //     ...state,
    //     message: action.message
    //   };
    // case actionTypes.LOGOUT_SUCCESS:
    //   return {
    //     ...state,
    //     firstName: "",
    //     lastName: "",
    //     fullName: "",
    //     email: "",
    //     message: null
    //   };
    // case actionTypes.REGISTER_FAIL:
    //   return {
    //     ...state,
    //     message: action.message
    //   };
    default:
      return state;
  }
};

export default userReducers;
