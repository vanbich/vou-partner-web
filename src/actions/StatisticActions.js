import userConstants from "../constants";
import axios from "axios";

const statisticVouchersActionRequest = () => {
  return {
    type: userConstants.STATISTICS_VOUCHER_REQUEST
  };
};
const statisticVouchersActionSuccess = (received, used) => {
  return {
    type: userConstants.STATISTICS_VOUCHER_SUCCESS,
    payload: {
      received,
      used
    }
  };
};

const statisticVouchersActionFailure = err => {
  return {
    type: userConstants.STATISTICS_VOUCHER_FAILURE,
    payload: {
      err
    }
  };
};

export const statisticVouchersRequest = (
  campaign_id,
  start_time,
  end_time,
  token
) => async dispatch => {
  dispatch(statisticVouchersActionRequest());
  try {
    const received = await axios({
      method: "GET",
      url: `https://vouapp-api.herokuapp.com/partner/user_voucher/statistics?type=received&campaign_id=${campaign_id}&start_time=${start_time}&end_time=${end_time}`,
      headers: {
        token: `JWT ${token}`
      }
    });
    const used = await axios({
      method: "GET",
      url: `https://vouapp-api.herokuapp.com/partner/user_voucher/statistics?type=used&campaign_id=${campaign_id}&start_time=${start_time}&end_time=${end_time}`,
      headers: {
        token: `JWT ${token}`
      }
    });

    dispatch(statisticVouchersActionSuccess(received.data, used.data));
  } catch (e) {
    dispatch(statisticVouchersActionFailure(e));
  }
};
