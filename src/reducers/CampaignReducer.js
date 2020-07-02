import userConstants from "../constants";

const initState = {
  myCampaigns: [],
  isSuccessful: false,
  messageError: "",
  isLoading: false
};

const Campaigns = (state = initState, action) => {
  switch (action.type) {
    case userConstants.GET_MY_CAMPAIGN_SUCCESS: {
      state.myCampaigns = [...action.payload.res.data];
      state.isLoading = false;
      return { ...state};
    }
    case userConstants.GET_MY_CAMPAIGN_REQUEST: {
      state.isLoading = true;
      state.isSuccessful = false;
      state.messageError = "";
      state.myCampaigns = [];
      return { ...state };
    }
    case userConstants.GET_MY_CAMPAIGN_FAILURE: {
      state.isLoading = false;
      state.isSuccessful = false;
      state.messageError = action.payload.err.message;
      state.myCampaigns = [];
      return { ...state };
    }
    case userConstants.CREATE_CAMPAIGN_SUCCESS: {
      if (action.payload.res.data) {
        state.isSuccessful = true;
        state.isLoading = false;
        state.messageError = "";
      }
      return { ...state };
    }
    case userConstants.CREATE_CAMPAIGN_REQUEST: {
      state.isSuccessful = false;
      state.messageError = "";
      state.isLoading = true;
      return { ...state };
    }
    case userConstants.CREATE_CAMPAIGN_FAILURE: {
      state.isLoading = false;
      state.isSuccessful = false;
      state.messageError = "";

      if (action.payload.err.message === "Promo code too long.") {
        state.messageError = "Code must be not over 5 characters!";
      } else if (action.payload.err.message === "Network Error") {
        state.messageError = "Check your connection, please!";
      } else {
        state.messageError = "Something went wrong!";
      }
      return { ...state };
    }
    case userConstants.REFRESH_STATE_CAMPAIGN: {
      state.isSuccessful = false;
      state.messageError = null;
      return { ...state };
    }
    default:
      return { ...state };
  }
};

export default Campaigns;
