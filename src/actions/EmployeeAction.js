import axios from "axios";
import userConstants from "../constants";

function doCreateEmployee(username, password, display_name, token) {
  return axios({
    method: "POST",
    url: "https://vouapp-api.herokuapp.com/partner/employee",
    headers: {
      token: `JWT ${token}`
    },
    data: {
      username,
      password,
      display_name
    }
  });
}

const createEmployeeActionSuccess = res => {
  return {
    type: userConstants.CREATE_EMPLOYEE_SUCCESS,
    payload: {
      res
    }
  };
};

const createEmployeeActionFailure = err => {
  return {
    type: userConstants.CREATE_EMPLOYEE_FAILURE,
    payload: {
      err
    }
  };
};

const createEmployeeActionRequest = () => {
  return {
    type: userConstants.CREATE_EMPLOYEE_REQUEST,
    payload: {}
  };
};

export const createEmployeeRequest = (
  username,
  password,
  display_name,
  token
) => async dispatch => {
  dispatch(createEmployeeActionRequest());
  try {
    const res = await doCreateEmployee(username, password, display_name, token);
    dispatch(createEmployeeActionSuccess(res));
  } catch (e) {
    dispatch(createEmployeeActionFailure(e));
  }
};

function doGetAllEmployee(token) {
  return axios({
    method: "GET",
    url: "https://vouapp-api.herokuapp.com/partner/employee/me",
    headers: {
      token: `JWT ${token}`
    }
  });
}

const getAllEmployeeActionSuccess = res => {
  return {
    type: userConstants.GET_EMPLOYEES_SUCCESS,
    payload: {
      res
    }
  };
};

const getAllEmployeeActionFailure = err => {
  return {
    type: userConstants.GET_EMPLOYEES_FAILURE,
    payload: {
      err
    }
  };
};

const getAllEmployeeActionRequest = () => {
  return {
    type: userConstants.GET_EMPLOYEES_REQUEST,
    payload: {}
  };
};

export const getAllEmployeeRequest = token => async dispatch => {
  dispatch(getAllEmployeeActionRequest());
  try {
    const res = await doGetAllEmployee(token);
    dispatch(getAllEmployeeActionSuccess(res));
  } catch (e) {
    dispatch(getAllEmployeeActionFailure(e));
  }
};

function doDeleteEmployee(token, id) {
  return axios({
    method: "DELETE",
    url: `https://vouapp-api.herokuapp.com/partner/employee/${id}`,
    headers: {
      token: `JWT ${token}`
    }
  });
}

const deleteEmployeeActionSuccess = res => {
  return {
    type: userConstants.DELETE_EMPLOYEE_SUCCESS,
    payload: {
      res
    }
  };
};

const deleteEmployeeActionFailure = err => {
  return {
    type: userConstants.DELETE_EMPLOYEE_FAILURE,
    payload: {
      err
    }
  };
};

const deleteEmployeeActionRequest = () => {
  return {
    type: userConstants.DELETE_EMPLOYEE_REQUEST,
    payload: {}
  };
};

export const deleteEmployeeRequest = (token, id) => async dispatch => {
  dispatch(deleteEmployeeActionRequest());
  try {
    const res = await doDeleteEmployee(token, id);
    dispatch(deleteEmployeeActionSuccess(res));
  } catch (e) {
    dispatch(deleteEmployeeActionFailure(e));
  }
};

function doUpdateEmployeePassword(
  username,
  new_password,
  confirm_password,
  token
) {
  return axios({
    method: "PATCH",
    url: "https://vouapp-api.herokuapp.com/partner/employee/change_password",
    headers: {
      token: `JWT ${token}`
    },
    data: {
      username,
      new_password,
      confirm_password
    }
  });
}

const updateEmployeePasswordActionSuccess = res => {
  return {
    type: userConstants.UPDATE_EMPLOYEE_PASSWORD_SUCCESS,
    payload: {
      res
    }
  };
};

const updateEmployeePasswordActionFailure = err => {
  return {
    type: userConstants.UPDATE_EMPLOYEE_PASSWORD_FAILURE,
    payload: {
      err
    }
  };
};

const updateEmployeePasswordActionRequest = () => {
  return {
    type: userConstants.UPDATE_EMPLOYEE_PASSWORD_REQUEST,
    payload: {}
  };
};

export const updateEmployeePasswordRequest = (
  username,
  new_password,
  confirm_password,
  token
) => async dispatch => {
  dispatch(updateEmployeePasswordActionRequest());
  try {
    const res = await doUpdateEmployeePassword(
      username,
      new_password,
      confirm_password,
      token
    );
    dispatch(updateEmployeePasswordActionSuccess(res));
  } catch (e) {
    dispatch(updateEmployeePasswordActionFailure(e));
  }
};

export const clear = () => {
  return {
    type: userConstants.REFRESH_STATE_EMPLOYEE
  };
};
