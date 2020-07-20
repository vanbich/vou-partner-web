import axios from "axios";
import userConstants from "../constants";


const getInfoActionSuccess = res => {
  return {
    type: userConstants.GET_INFO_SUCCESS,
    payload: {
      res
    }
  };
};

const getInfoActionFailure = err => {
  return {
    type: userConstants.GET_INFO_FAILURE,
    payload: {
      err
    }
  };
};



export const getInfoRequest = token => async dispatch => {
  try {
    const res = await axios({
      method: "GET",
      url: "https://vouapp-api.herokuapp.com/user/me",
      headers: {
        token: `JWT ${token}`
      }
    });

    dispatch(getInfoActionSuccess(res));
  } catch (err) {
    dispatch(getInfoActionFailure(err));
  }
};

const doUpdateInfo = (display_name, phone, email, address, avatar,location, token) => {
  return axios({
    method: "PATCH",
    url: "https://vouapp-api.herokuapp.com/user/me",
    headers: {
      token: `JWT ${token}`
    },
    data: {
      phone,
      display_name,
      email,
      address,
      avatar,
      location
    }
  }).catch(err => {
    return err;
  });
};

const updateInfoActionSuccess = res => {
  return {
    type: userConstants.UPDATE_INFO_SUCCESS,
    payload: {
      res
    }
  };
};

const updateInfoActionRequest = () => {
  return {
    type: userConstants.UPDATE_INFO_REQUEST,
    payload: {}
  };
};

const updateInfoActionFailure = err => {
  return {
    type: userConstants.UPDATE_INFO_FAILURE,
    payload: {
      err
    }
  };
};

export const updateInfoRequest = (
  display_name,
  phone,
  email,
  address,
  avatar,
  token
) => {
  return dispatch => {
    dispatch(updateInfoActionRequest());
    return doUpdateInfo(
      display_name,
      phone,
      email,
      address,
      avatar,
      JSON.stringify({latitude: 10.771139, longtitude: 106.681136}),
      token
    ).then(res => {
      if (res.data) {
        dispatch(updateInfoActionSuccess(res));
      } else {
        dispatch(updateInfoActionFailure(res));
      }
    });
  };
};

export const clear = () => {
  return {
    type: userConstants.REFRESH_STATE_USER
  };
};
