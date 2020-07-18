import axios from "axios";
import userConstants from "../constants";

const doGetMyVouchers = async (token) => {
  const res = await axios({
    method: "GET",
    url: "https://vouapp-api.herokuapp.com/partner/voucher/me",
    headers: {
      token: `JWT ${token}`
    }
  }).catch(err => {
    return err;
  });
  return res;
};

export const getMyVouchersAction = res => {
  return {
    type: userConstants.GET_MY_VOUCHERS,
    payload: {
      res
    }
  };
};

export const getMyVouchersRequest = (token,id) => {
  return dispatch => {
    return doGetMyVouchers(token,id).then(res => {
      console.log("getMyVouchersAction", res);
      dispatch(getMyVouchersAction(res));
    });
  };
};



export const clear = () => {
  return {
    type: userConstants.REFRESH_STATE_VOUCHER
  };
};
