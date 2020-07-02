import axios from "axios";
import userConstants from "../constants";

function doRegister(email, password) {
  return axios({
    method: "POST",
    url: "http://vouapp-api.herokuapp.com/auth/signup",
    data: {
      username: email,
      password,
      is_partner: true,
    },
  });
}

const registerActionSuccess = (res) => {
  return {
    type: userConstants.REGISTER_SUCCESS,
    payload: {
      res,
    },
  };
};

const registerActionFailure = (err) => {
  return {
    type: userConstants.REGISTER_FAILURE,
    payload: {
      err,
    },
  };
};

const registerActionRequest = () => {
  return {
    type: userConstants.REGISTER_REQUEST,
    payload: {},
  };
};

export const registerRequest = (email, password) => async (dispatch) => {
  dispatch(registerActionRequest());
  try {
    const res = await doRegister(email, password);
    dispatch(registerActionSuccess(res));
  } catch (e) {
    dispatch(registerActionFailure(e));
  }
};

function doLogin(email, password) {
  return axios({
    method: "POST",
    url: "http://vouapp-api.herokuapp.com/auth/signin",
    data: {
      username: email,
      password,
    },
  })
}

const loginActionSuccess = (res) => {
  return {
    type: userConstants.LOGIN_SUCCESS,
    payload: {
      res,
    },
  };
};

const loginActionRequest = () => {
  return {
    type: userConstants.LOGIN_REQUEST,
    payload: {},
  };
};

const loginActionFailure = (err) => {
  return {
    type: userConstants.LOGIN_FAILURE,
    payload: {
      err,
    },
  };
};

export const loginRequest = (email, password) => {
  return dispatch => {
    dispatch(loginActionRequest());
    return doLogin(email, password).then(res => {
      if (res.data) {
        console.log("login", res);
        dispatch(loginActionSuccess(res));
      } else {
        dispatch(loginActionFailure(res));
      }
    });
  };
};

export const logOut = () => {
  return {
    type: userConstants.LOGOUT,
  };
};

export const clear = () => {
  return {
    type: userConstants.REFRESH_STATE,
  };
};
