import userConstants from "../constants";
import cookie from "react-cookies";

const initState = {
  isRegister: false,
  messageError: null,
  token: null,
  isLoading: false
};

function saveCookies(name, value, exp) {
  const d = new Date();
  d.setTime(d.getTime() + exp * 24 * 60 * 60 * 1000);
  const expires = `expires=${d.toUTCString()}`;
  document.cookie = `${name}=${value};${expires};path=/`;
}
const Authentication = (state = initState, action) => {
  switch (action.type) {
    case userConstants.LOGIN_REQUEST: {
      state.token = null;
      state.isLoading = true;
      state.messageError = null;
      return { ...state };
    }
    case userConstants.LOGIN_SUCCESS: {
      const expires = new Date();
      expires.setDate(Date.now() + 1000 * 60 * 60 * 24 * 14);

      state.token = action.payload.res.data.token;
      state.isLoading = false;
      state.messageError = null;

      saveCookies("token", state.token, 1);

      return { ...state };
    }
    case userConstants.LOGIN_FAILURE: {
      if (action.payload.err === "Request failed with status code 401") {
        state.messageError = "Incorrect email or password!";
      }

      if (action.payload.err === "Network Error") {
        state.messageError = "Check your connection, please!";
      } else {
        state.messageError = action.payload.err;
      }

      state.token = null;
      state.isLoading = false;

      return { ...state };
    }

    case userConstants.REGISTER_SUCCESS: {
      state.isRegister = true;
      state.messageError = null;
      state.isLoading = false;
      state.token = null;

      return { ...state };
    }
    case userConstants.REGISTER_REQUEST: {
      state.isRegister = false;
      state.messageError = null;
      state.token = null;
      state.isLoading = true;
      return { ...state };
    }
    case userConstants.REGISTER_FAILURE: {
      if (
        action.payload.err.message ===
        "That password is to short (or too long). Please make sure your password is between 6 and 16 characters."
      ) {
        state.messageError =
          "Please make sure your password is between 6 and 16 characters";
      }

      if (action.payload.err.message === "Network Error") {
        state.messageError = "Check your connection, please!";
      }
      if (action.payload.err.message === "Request failed with status code 409") {
        state.messageError = "Username is existed";
      }else {
        state.messageError = action.payload.err.message;
      }

      state.isLogin = false;
      state.isRegister = false;
      state.token = null;
      state.isLoading = false;

      return { ...state };
    }

    case userConstants.LOGOUT: {
      cookie.remove("token", { path: "/" });
      state.isRegister = false;
      state.messageError = null;
      state.token = null;
      state.isLoading = false;
      return { ...state };
    }

    case userConstants.REFRESH_STATE: {
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
