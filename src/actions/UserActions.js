import axios from "axios";
import userConstants from "../constants";

const doGetInfo = (token) => {
  const res = axios({
    method: "GET",
    url: "http://vouapp-api.herokuapp.com/user/me",
    headers: {
      token: `JWT ${token}`
    }
  }).catch(err => {
    return err;
  });
  return res;
};

export const getInfoAction = res => {
  return {
    type: userConstants.GET_INFO,
    payload: {
      res
    }
  };
};

export const getInfoRequest = (token) => {
  return dispatch => {
    return doGetInfo(token).then(res => {
      console.log("getInfo", res);
      dispatch(getInfoAction(res));
    });
  };
};

const doUpdateInfo = (display_name,phone, email, address, avatar, token) => {
  const res = axios({
    method: "PATCH",
    url: "http://vouapp-api.herokuapp.com/user/me",
    headers: {
      token: `JWT ${token}`
    },
    data:{
      phone,
      display_name,
      email,
      address,
      avatar
    }
  }).catch(err => {
    return err;
  });
  return res;
};

const updateInfoActionSuccess = res =>{
  return {
    type: userConstants.UPDATE_INFO_SUCCESS,
    payload: {
      res
    }
  }
};

const updateInfoActionRequest = () =>{
  return {
    type: userConstants.UPDATE_INFO_REQUEST,
    payload: {

    }
  }
};

const updateInfoActionFailure = err =>{
  return {
    type: userConstants.UPDATE_INFO_FAILURE,
    payload: {
      err
    }
  }
};

export const updateInfoRequest = (display_name,phone, email, address, avatar, token) => {
  return dispatch => {
    dispatch(updateInfoActionRequest());
    return doUpdateInfo(display_name,phone, email, address, avatar, token).then(res => {
      if(res.data){
        console.log("doUpdateInfo", res);
        dispatch(updateInfoActionSuccess(res));
      }else{
        dispatch(updateInfoActionFailure(res));
      }
    });
  };
};

export const clear= () => {
  return {
    type: userConstants.REFRESH_STATE_USER,
  };
};

