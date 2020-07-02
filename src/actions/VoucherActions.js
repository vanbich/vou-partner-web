import axios from "axios";
import userConstants from "../constants";

// const doCreateVoucher = (
//   promo_code,
//   discount,
//   description,
//   count,
//   campaign_id,
//   token
// ) => {
//   const res = axios({
//     method: "POST",
//     url: "http://vouapp-api.herokuapp.com/partner/voucher",
//     headers: {
//       token: `JWT ${token}`
//     },
//     data: {
//       promo_code,
//       discount,
//       description,
//       count,
//       campaign_id,
//     }
//   }).catch(err => {
//     return err;
//   });
//   return res;
// };

// export const createVoucherAction = res => {
//   return {
//     type: userConstants.CREATE_VOUCHER,
//     payload: {
//       res
//     }
//   };
// };

// export const createVoucherRequest = (
//     promo_code,
//     discount,
//     description,
//     count,
//     campaign_id,
//     token
// ) => {
//   return dispatch => {
//     return doCreateVoucher(
//         promo_code,
//         discount,
//         description,
//         count,
//         campaign_id,
//         token
//     ).then(res => {
//       console.log("createVoucherAction", res);
//       dispatch(createVoucherAction(res));
//     });
//   };
// };

const doGetMyVouchers = (token) => {
  const res = axios({
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

// const doDeleteMyVoucher = (token, id )=> {
//   const res = axios({
//     method: "DELETE",
//     url: `http://vouapp-api.herokuapp.com/voucher/${id}`,
//     headers: {
//       token: `JWT ${token}`
//     }
//   }).catch(err => {
//     return err;
//   });
//   return res;
// };

// export const deleteMyVoucherAction = res => {
//   return {
//     type: userConstants.DELETE_VOUCHER,
//     payload: {
//       res
//     }
//   };
// };

// export const deleteMyVoucherRequest = (token, id) => {
//   return dispatch => {
//     return doDeleteMyVoucher(token, id).then(res => {
//       console.log("doDeleteMyVoucher", res);
//       dispatch(deleteMyVoucherAction(res));
//     });
//   };
// };

// const doUpdateMyVoucher = (token, id, discount, count, description)=> {
//   const res = axios({
//     method: "PATCH",
//     url: `http://vouapp-api.herokuapp.com/voucher/${id}`,
//     headers: {
//       token: `JWT ${token}`
//     },
//     data:{
//       discount,
//       description,
//       count
//     }
//   }).catch(err => {
//     return err;
//   });
//   return res;
// };

// export const updateMyVoucherAction = res => {
//   return {
//     type: userConstants.UPDATE_VOUCHER,
//     payload: {
//       res
//     }
//   };
// };

// export const updateMyVoucherRequest = (token, id, discount, count, description) => {
//   return dispatch => {
//     return doUpdateMyVoucher(token, id, discount, count, description).then(res => {
//       console.log("doUpdateMyVoucher", res);
//       dispatch(updateMyVoucherAction(res));
//     });
//   };
// };


export const clear = () => {
  return {
    type: userConstants.REFRESH_STATE_VOUCHER
  };
};
