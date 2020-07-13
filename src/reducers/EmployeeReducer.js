import userConstants from "../constants";

const initState = {
  myEmployees: [],
  isSuccessful: false,
  messageError: "",
  isLoading: false,
  isDeleted: false,
  numbers: 0
};

const Employees = (state = initState, action) => {
  switch (action.type) {
    case userConstants.GET_EMPLOYEES_SUCCESS: {
      state.myEmployees = [...action.payload.res.data];
      state.isLoading = false;
      state.isSuccessful = false;
      state.isDeleted = false;
      console.log("myEmployees", state.myEmployees);
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
      state.isLoading = false;
      state.messageError = "";
      return { ...state };
    }
    case userConstants.CREATE_EMPLOYEE_REQUEST: {
      state.isSuccessful = false;
      state.messageError = "";
      state.isLoading = true;
      return { ...state };
    }
    case userConstants.CREATE_EMPLOYEE_FAILURE: {
      state.isLoading = false;
      state.isSuccessful = false;
      state.messageError = "";
      state.messageError = action.payload.err.message;

      return { ...state };
    }

    case userConstants.DELETE_EMPLOYEE_REQUEST: {
      state.isDeleted = true;
      state.messageError = "";
      return { ...state };
    }
    case userConstants.DELETE_EMPLOYEE_FAILURE: {
      state.isDeleted = true;
      state.messageError = action.payload.err.message;
      state.numbers = 0;
      return { ...state };
    }
    case userConstants.DELETE_EMPLOYEE_SUCCESS: {
      state.isDeleted = true;
      state.messageError = null;
      state.numbers++;
      return { ...state };
    }

    case userConstants.REFRESH_STATE_EMPLOYEE: {
      state.isLoading = false;
      state.isSuccessful = false;
      state.messageError = null;
      state.isDeleted = false;
      state.numbers = 0;
      return { ...state };
    }
    default:
      return { ...state };
  }
};

export default Employees;
