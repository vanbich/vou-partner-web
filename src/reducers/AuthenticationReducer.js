import userConstants from "../constants";

const initState = {
  isLogin: false,
  isRegister: false,
  messageError: null,
  token: null,
  isLoading: false
};

const Authentication = (state = initState, action) => {
  switch (action.type) {
    case userConstants.LOGIN_REQUEST: {
      state.isLogin = false;
      state.token = null;
      state.isLoading = true;
      state.messageError = null;
      return { ...state };
    }
    case userConstants.LOGIN_SUCCESS: {
      state.isLogin = true;
      state.token = action.payload.res.data.token;
      state.isLoading = false;
      state.messageError = null;

      return { ...state };
    }
    case userConstants.LOGIN_FAILURE:{
      if (
          action.payload.err.message === "Request failed with status code 401"
      ) {
        state.messageError = "Incorrect email or password!";
      }

      if (action.payload.err.message === "Network Error") {
        state.messageError = "Check your connection, please!";
      }

      state.isLogin = false;
      state.token = null;
      state.isLoading = false;

      console.log("err", state.messageError);

      return {...state};
    }

    case userConstants.REGISTER_SUCCESS: {
      state.isRegister = true;
      state.messageError = null;
      state.isLoading = false;
      state.isLogin = false;
      state.token = null;

      return { ...state };
    }
    case userConstants.REGISTER_REQUEST:{
      state.isLogin = false;
      state.isRegister = false;
      state.messageError = null;
      state.token = null;
      state.isLoading = true;
      return { ...state };
    }
    case userConstants.REGISTER_FAILURE:{

      if (
          action.payload.err.message ===
          "That password is to short (or too long). Please make sure your password is between 6 and 16 characters."
      ) {
        state.messageError =
            "Please make sure your password is between 6 and 16 characters";
      }

      if (action.payload.err.message === "Network Error") {
        state.messageError = "Check your connection, please!";
      } else {
        state.messageError = "Email is existed";
      }

      state.isLogin = false;
      state.isRegister = false;
      state.token = null;
      state.isLoading = false;

      return { ...state };
    }

    case userConstants.LOGOUT: {
      localStorage.setItem("isAuthentication", false);
      state.isLogin = false;
      state.isRegister = false;
      state.messageError = null;
      state.token = null;
      state.isLoading = false;
      return { ...state };
    }

    case userConstants.REFRESH_STATE: {
      state.isLogin = false;
      state.isRegister = false;
      state.messageError = null;
      state.token = null;
      state.isLoading = false;
      return { ...state };
    }
    default: {
      return { ...state };
    }
  }
};
export default Authentication;
