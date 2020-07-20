import userConstants from "../constants";

const initState = {
  myEmployees: [],
  isSuccessful: false,
  messageError: "",
  isLoading: false,
  isCreating: false,
  isUpdating: false,
  isDeleting: false,
  numbers: 0
};

const Employees = (state = initState, action) => {
  switch (action.type) {
    case userConstants.GET_EMPLOYEES_SUCCESS: {
      state.myEmployees = [...action.payload.res.data];
      state.isLoading = false;
      state.isSuccessful = false;
      state.isDeleted = false;
      return JSON.parse(JSON.stringify(state));
    }
    case userConstants.GET_EMPLOYEES_REQUEST: {
      state.isLoading = true;
      state.isSuccessful = false;
      state.messageError = "";
      state.myEmployees = [];
      return { ...state };
    }
    case userConstants.GET_EMPLOYEES_FAILURE: {
      state.isLoading = false;
      state.isSuccessful = false;
      state.messageError = action.payload.err.message;
      state.myEmployees = [];
      return { ...state };
    }

    case userConstants.CREATE_EMPLOYEE_SUCCESS: {
      state.isSuccessful = true;
      state.isCreating = false;
      state.messageError = "";
      return { ...state };
    }
    case userConstants.CREATE_EMPLOYEE_REQUEST: {
      state.isSuccessful = false;
      state.messageError = "";
      state.isCreating = true;
      return { ...state };
    }
    case userConstants.CREATE_EMPLOYEE_FAILURE: {
      state.isCreating = false;
      state.isSuccessful = false;
      state.messageError = "";
      state.messageError = action.payload.err.message;

      return { ...state };
    }

    case userConstants.UPDATE_EMPLOYEE_PASSWORD_REQUEST: {
      state.isUpdating = true;
      state.messageError = "";
      return { ...state };
    }
    case userConstants.UPDATE_EMPLOYEE_PASSWORD_FAILURE: {
      state.isUpdating = true;
      state.messageError = action.payload.err.message;
      return { ...state };
    }
    case userConstants.UPDATE_EMPLOYEE_PASSWORD_SUCCESS: {
      state.isSuccessful = true;
      state.messageError = null;
      state.isUpdating = false;
      return { ...state };
    }

    case userConstants.DELETE_EMPLOYEE_REQUEST: {
      state.isDeleting = true;
      state.messageError = "";
      return { ...state };
    }
    case userConstants.DELETE_EMPLOYEE_FAILURE: {
      state.isDeleting = true;
      state.messageError = action.payload.err.message;
      state.numbers = 0;
      return { ...state };
    }
    case userConstants.DELETE_EMPLOYEE_SUCCESS: {
      state.isDeleting = true;
      state.messageError = null;
      state.numbers++;
      return { ...state };
    }

    case userConstants.REFRESH_STATE_EMPLOYEE: {
      state.isSuccessful = false;
      state.messageError = "";
      state.isLoading = false;
      state.isCreating = false;
      state.isUpdating = false;
      state.isDeleting = false;
      state.numbers = 0;
      return { ...state };
    }
    default:
      return { ...state };
  }
};

export default Employees;
