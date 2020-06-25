import userConstants from "../constants";

const initState = {
  id: null,
  username: null,
  display_name: null,
  email: null,
  phone: null,
  address: null,
  avatar: null,
  messageError: null,
  isSuccess: false,
  isLoading: false,
};

const User = (state = initState, action) => {
  switch (action.type) {
    case userConstants.GET_INFO: {
      try {
        const { data } = action.payload.res;
        state.id = data.id;
        state.username = data.username;
        state.email = data.email;
        state.phone = data.phone;
        state.address = data.address;
        state.avatar = data.avatar;
        state.display_name = data.display_name;
      } catch (e) {}
      console.log("state", state);
      return { ...state };
    }
    case userConstants.UPDATE_INFO_REQUEST:{
      state.messageError = null;
      state.isSuccess = false;
      state.isLoading = true;
      return {...state};
    }
    case userConstants.UPDATE_INFO_SUCCESS: {
      state.isSuccess = true;
      state.messageError = null;
      state.isLoading = false;
      return { ...state };
    }
    case userConstants.UPDATE_INFO_FAILURE:{
      state.messageError = action.payload.err.message;
      state.isSuccess = false;
      state.isLoading = false;
      return {...state};
    }
    case userConstants.REFRESH_STATE_USER: {
      state.messageError = null;
      state.isSuccess = false;
      state.isLoading = false;
      return { ...state };
    }

    default:
      return { ...state };
  }
};
export default User;
