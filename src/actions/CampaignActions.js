import axios from "axios";
import userConstants from "../constants";

const doCreateCampaign = (
  name,
  image,
  partner_id,
  discount,
  num_of_voucher,
  promo_code,
  voucher_image,
  description,
  start_time,
  end_time,
  token
) => {
  console.log(
    "doCreateCampaign",
    name,
    image,
    partner_id,
    discount,
    num_of_voucher,
    promo_code,
    voucher_image,
    description,
    start_time,
    end_time,
    token
  );

  const res = axios({
    method: "POST",
    url: "https://vouapp-api.herokuapp.com/partner/campaign",
    headers: {
      token: `JWT ${token}`
    },
    data: {
      name,
      image,
      partner_id,
      discount,
      num_of_voucher,
      promo_code,
      voucher_image,
      description,
      start_time,
      end_time
    }
  }).catch(err => {
    return err;
  });
  console.log("createCampaignAction", res.message);

  return res;
};

const createCampaignActionSuccess = res => {
  return {
    type: userConstants.CREATE_CAMPAIGN_SUCCESS,
    payload: {
      res
    }
  };
};

const createCampaignActionFailure = err => {
  return {
    type: userConstants.CREATE_CAMPAIGN_FAILURE,
    payload: {
      err
    }
  };
};

const createCampaignActionRequest = () => {
  return {
    type: userConstants.CREATE_CAMPAIGN_REQUEST,
    payload: {}
  };
};

export const createCampaignRequest = (
  name,
  image,
  partner_id,
  discount,
  num_of_voucher,
  promo_code,
  voucher_image,
  description,
  start_time,
  end_time,
  token
) => {
  return dispatch => {
    dispatch(createCampaignActionRequest());
    return doCreateCampaign(
      name,
      image,
      partner_id,
      discount,
      num_of_voucher,
      promo_code,
      voucher_image,
      description,
      start_time,
      end_time,
      token
    ).then(res => {
      if (res.data) {
        console.log("createCampaignAction", res);
        dispatch(createCampaignActionSuccess(res));
      } else {
        dispatch(createCampaignActionFailure(res));
      }
    });
  };
};

const getAllCampaignsActionSuccess = res => {
  return {
    type: userConstants.GET_MY_CAMPAIGN_SUCCESS,
    payload: {
      res
    }
  };
};

const getAllCampaignsActionFailure = err => {
  return {
    type: userConstants.GET_MY_CAMPAIGN_FAILURE,
    payload: {
      err
    }
  };
};

const getAllCampaignsActionRequest = () => {
  return {
    type: userConstants.GET_MY_CAMPAIGN_REQUEST,
    payload: {}
  };
};

export const getAllCampaignsRequest = (token, id) => async dispatch => {
  dispatch(getAllCampaignsActionRequest());
  try {
    const res = await axios({
      method: "GET",
      url: `https://vouapp-api.herokuapp.com/campaign/partner/${id}`,
      headers: {
        token: `JWT ${token}`
      }
    });

    console.log("getAllCampaigns", res);
    dispatch(getAllCampaignsActionSuccess(res));
  } catch (err) {
    dispatch(getAllCampaignsActionFailure(err));
  }
};

const doDeleteCampaign = (token, id) => {
  return axios({
    method: "DELETE",
    url: `https://vouapp-api.herokuapp.com/campaign/${id}`,
    headers: {
      token: `JWT ${token}`
    }
  }).catch(err => {
    return err;
  });
};

const deleteCampaignActionSuccess = res => {
  return {
    type: userConstants.DELETE_CAMPAIGN_SUCCESS,
    payload: {
      res
    }
  };
};

const deleteCampaignActionFailure = err => {
  return {
    type: userConstants.DELETE_CAMPAIGN_FAILURE,
    payload: {
      err
    }
  };
};

const deleteCampaignActionRequest = () => {
  return {
    type: userConstants.DELETE_CAMPAIGN_SUCCESS,
    payload: {}
  };
};

export const deleteCampaignRequest = (token, id) => {
  return dispatch => {
    dispatch(deleteCampaignActionRequest());
    return doDeleteCampaign(token, id).then(res => {
      if (res.data) {
        console.log("delete campaign", res);
        dispatch(deleteCampaignActionSuccess(res));
      } else {
        dispatch(deleteCampaignActionFailure(res));
      }
    });
  };
};

const updateCampaignActionRequest = () => {
  return {
    type: userConstants.UPDATE_CAMPAIGN_REQUEST,
  };
};

const updateCampaignActionSuccess = res => {
  return {
    type: userConstants.UPDATE_CAMPAIGN_SUCCESS,
  };
};

const updateCampaignActionFailure = err => {
  return {
    type: userConstants.UPDATE_CAMPAIGN_FAILURE,
    payload: {
      err
    }
  };
};

export const updateCampaignRequest = (
  name,
  image,
  discount,
  description,
  start_time,
  end_time,
  token,
  id
) => async dispatch => {
  dispatch(updateCampaignActionRequest());
  try {
    const res = await axios({
      method: "PATCH",
      url: `https://vouapp-api.herokuapp.com/campaign/${id}`,
      headers: {
        token: `JWT ${token}`
      },
      data: {
        name,
        image,
        discount,
        description,
        start_time,
        end_time
      }
    });

    console.log("updateCampaign", res);
    dispatch(updateCampaignActionSuccess());
  } catch (err) {
    dispatch(updateCampaignActionFailure(err));
  }
};

export const clear = () => {
  return {
    type: userConstants.REFRESH_STATE_CAMPAIGN
  };
};
