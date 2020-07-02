import userConstants from "../constants";

const initState = {
    myVouchers: [],
    isSuccessful: false,
    messageError: null
};

const getData = array => {
    const data = [];
    if (array.length > 0) {
        let j = 0;
        data.push(array[0]);
        for (let i = 1; i < array.length; i++) {
            if (array[i].campaign_id !== data[j].campaign_id) {
                data.push(array[i]);
                j++;
            }
        }
    }
    console.log('data', data);
    return data;
};

const Vouchers = (state = initState, action) => {
    switch (action.type) {
        case userConstants.GET_MY_VOUCHERS: {
            if (action.payload.res.data) {
                console.log("action.payload.res.data", action.payload.res.data);

                state.myVouchers = [...getData(action.payload.res.data)];
                console.log("vouchers", state.myVouchers);
                return { ...state };
            } else {
                state.myVouchers = [];
                state.isSuccessful = false;
                state.messageError = null;
                return { ...state };
            }
        }
        case userConstants.CREATE_VOUCHER: {
            if (action.payload.res.data) state.isSuccessful = true;
            state.messageError = "Something went wrong!";
            return { ...state };
        }
        case userConstants.REFRESH_STATE_VOUCHER: {
            state.isSuccessful = false;
            state.messageError = null;
            return { ...state };
        }
        case userConstants.UPDATE_VOUCHER: {
            try {
                state.isSuccessful = true;
                state.messageError = null;
            } catch (e) {
                state.isSuccessful = false;
                state.messageError = "Something went wrong";
            }
            return { ...state };
        }
        case userConstants.DELETE_VOUCHER: {
            try {
                state.isSuccessful = true;
                state.messageError = false;
            } catch (e) {
                state.isSuccessful = false;
                state.messageError = "Something went wrong";
            }
            return { ...state };
        }
        default:
            return { ...state };
    }
};
export default Vouchers;
