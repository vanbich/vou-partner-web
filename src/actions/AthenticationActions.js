import axios from "axios";
import userConstants from "../constants";

function doRegister(username, password) {
  return axios({
    method: "POST",
    url: "https://vouapp-api.herokuapp.com/auth/signup",
    data: {
      username,
      password,
      is_partner: true
    }
  });
}

const registerActionSuccess = res => {
  return {
    type: userConstants.REGISTER_SUCCESS,
    payload: {
      res
    }
  };
};

const registerActionFailure = err => {
  return {
    type: userConstants.REGISTER_FAILURE,
    payload: {
      err
    }
  };
};

const registerActionRequest = () => {
  return {
    type: userConstants.REGISTER_REQUEST,
    payload: {}
  };
};

export const registerRequest = (username, password) => async dispatch => {
  dispatch(registerActionRequest());
  try {
    const res = await doRegister(username, password);
    dispatch(registerActionSuccess(res));
  } catch (e) {
    dispatch(registerActionFailure(e));
  }
};

const loginActionSuccess = res => {
  return {
    type: userConstants.LOGIN_SUCCESS,
    payload: {
      res
    }
  };
};

const loginActionRequest = () => {
  return {
    type: userConstants.LOGIN_REQUEST,
    payload: {}
  };
};

const loginActionFailure = err => {
  return {
    type: userConstants.LOGIN_FAILURE,
    payload: {
      err
    }
  };
};

export const loginRequest = (username, password) => async dispatch => {
  dispatch(loginActionRequest());
  try {
    const res = await axios({
      method: "POST",
      url: "https://vouapp-api.herokuapp.com/auth/signin",
      data: {
        username,
        password
      }
    });

    const infor = await axios({
      method: "GET",
      url: "https://vouapp-api.herokuapp.com/user/me",
      headers: {
        token: `JWT ${res.data.token}`
      }
    });

    infor.data.role === "partner"
      ? dispatch(loginActionSuccess(res))
      : dispatch(loginActionFailure("Account is not partner"));
  } catch (e) {
    dispatch(loginActionFailure(e.message));
  }
};
export const logOut = () => {
  return {
    type: userConstants.LOGOUT
  };
};

export const clear = () => {
  return {
    type: userConstants.REFRESH_STATE
  };
};
