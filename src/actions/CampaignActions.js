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
        url: "http://vouapp-api.herokuapp.com/partner/campaign",
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

export const createCampaignActionSuccess = res => {
    return {
        type: userConstants.CREATE_CAMPAIGN_SUCCESS,
        payload: {
            res
        }
    };
};

export const createCampaignActionFailure = err => {
    return {
        type: userConstants.CREATE_CAMPAIGN_FAILURE,
        payload: {
            err
        }
    };
};

export const createCampaignActionRequest = () => {
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
            if(res.data){
                console.log("createCampaignAction", res);
                dispatch(createCampaignActionSuccess(res));
            }
            else{
                dispatch(createCampaignActionFailure(res));
            }
        });
    };
};

const doGetAllCampaigns = async (token, id) => {
    const res = await axios({
        method: "GET",
        url: `http://vouapp-api.herokuapp.com/campaign/partner/${id}`,
        headers: {
            token: `JWT ${token}`
        }
    }).catch(err => {
        return err;
    });
    return res;
};

export const getAllCampaignsActionSuccess = res => {
    return {
        type: userConstants.GET_MY_CAMPAIGN_SUCCESS,
        payload: {
            res
        }
    };
};

export const getAllCampaignsActionFailure = err => {
    return {
        type: userConstants.GET_MY_CAMPAIGN_FAILURE,
        payload: {
            err
        }
    };
};

export const getAllCampaignsActionRequest = () => {
    return {
        type: userConstants.GET_MY_CAMPAIGN_REQUEST,
        payload: {}
    };
};

export const getAllCampaignsRequest = (token, id) => {
    return dispatch => {
        dispatch(getAllCampaignsActionRequest());
        return doGetAllCampaigns(token, id).then(res => {
            if (res.data) {
                console.log("getAllCampaigns", res);
                dispatch(getAllCampaignsActionSuccess(res));
            } else {
                dispatch(getAllCampaignsActionFailure(res));
            }
        });
    };
};

export const clear = () => {
    return {
        type: userConstants.REFRESH_STATE_CAMPAIGN
    };
};
