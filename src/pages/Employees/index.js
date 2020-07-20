import React, { Component } from "react";
import { Redirect } from "react-router-dom";

// Externals
import PropTypes from "prop-types";
import cookie from "react-cookies";
import validate from "validate.js";
import _ from "underscore";

// Material helpers
import { withStyles, fade } from "@material-ui/core/styles";

// Material components
import { CircularProgress, Typography } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import MuiDialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import MuiDialogContent from "@material-ui/core/DialogContent/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions/DialogActions";
import Dialog from "@material-ui/core/Dialog";
import InputBase from "@material-ui/core/InputBase/InputBase";
import InputLabel from "@material-ui/core/InputLabel";
import Button from "@material-ui/core/Button";

//Material icons
import CloseIcon from "@material-ui/icons/Close";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import DeleteSweepIcon from "@material-ui/icons/DeleteSweep";

// Shared layouts
import { Dashboard as DashboardLayout } from "../../layouts";

// Custom components
import { EmployeesToolbar, EmployeesTable } from "./components";

// Component styles
import styles from "./style";

// Form validation schema
import schema from "./schema";

// Service methods
import { connect } from "react-redux";
import {
  clear,
  createEmployeeRequest,
  deleteEmployeeRequest,
  getAllEmployeeRequest
} from "../../actions/EmployeeAction";

const style = theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(2)
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500]
  }
});

const DialogTitle = withStyles(style)(props => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles(theme => ({
  root: {
    padding: theme.spacing(2),
    borderTop: "1px dashed #9bc3f2",
    borderBottom: "1px dashed #9bc3f2"
  }
}))(MuiDialogContent);

const DialogActions = withStyles(theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(1)
  }
}))(MuiDialogActions);

const BootstrapInput = withStyles(theme => ({
  root: {
    "label + &": {
      marginTop: theme.spacing(3)
    }
  },
  input: {
    borderRadius: 4,
    position: "relative",
    backgroundColor: theme.palette.common.white,
    border: "1px solid #ced4da",
    fontSize: 13,
    width: "auto",
    padding: "10px 12px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    // Use the system font instead of the default Roboto font.
    fontFamily: ["Roboto"].join(","),
    "&:focus": {
      boxShadow: `${fade("#9bc3f2", 0.25)} 0 0 0 0.2rem`,
      borderColor: theme.palette.primary.main
    }
  }
}))(InputBase);

class EmployeeList extends Component {
  state = {
    selectedUsers: [],
    error: null,
    openCreate: false,
    isValid: false,

    values: {
      display_name: "",
      username: "",
      password: ""
    },

    touched: {
      display_name: false,
      username: false,
      password: false
    },

    errors: {
      display_name: null,
      username: null,
      password: null
    }
  };

  getEmployees = () => {
    const token = cookie.load("token");
    this.props.doGetEmployees(token);
  };

  componentDidMount() {
    this.getEmployees();
  }

  validateForm = _.debounce(() => {
    const { values } = this.state;

    const newState = { ...this.state };
    const errors = validate(values, schema);

    newState.errors = errors || {};
    newState.isValid = !errors;

    this.setState(newState);
  }, 300);

  handleFieldChange = (field, value) => {
    const newState = { ...this.state };

    newState.touched[field] = true;
    newState.values[field] = value;

    this.setState(newState, this.validateForm);
  };

  handleOpenCreate = () => {
    this.setState({
      openCreate: true,

      values: {
        display_name: "",
        username: "",
        password: ""
      },

      touched: {
        display_name: false,
        username: false,
        password: false
      },

      errors: {
        display_name: null,
        username: null,
        password: null
      }
    });
  };

  handleCloseCreate = () => {
    this.getEmployees();
    this.setState({
      openCreate: false
    });
  };

  handleCloseDelete = () => {
    this.getEmployees();
    this.props.clear();
    this.setState({
      selectedUsers: []
    });
  };

  handleSelect = selectedUsers => {
    this.setState({ selectedUsers });
  };

  createEmployee = () => {
    const token = cookie.load("token");
    const { values } = this.state;

    this.props.doCreateEmployee(
      values.username,
      values.password,
      values.display_name,
      token
    );
  };

  deleteEmployee = () => {
    const { selectedUsers } = this.state;
    const token = cookie.load("token");

    for (let i = 0; i < selectedUsers.length; i++) {
      setTimeout(this.props.doDeleteEmployee(token, selectedUsers[i]), 2000);
    }
  };

  handleCreateEmployeeFail = () => {
    this.props.clear();
    this.setState({
      values: {
        display_name: "",
        username: "",
        password: ""
      },

      touched: {
        display_name: false,
        username: false,
        password: false
      },

      errors: {
        display_name: null,
        username: null,
        password: null
      }
    });
  };

  renderUsers() {
    const { classes, isLoading, myEmployees } = this.props;
    const { error } = this.state;

    if (isLoading) {
      return (
        <div className={classes.progressWrapper}>
          <CircularProgress className={classes.progress} />
        </div>
      );
    }

    if (error) {
      return <Typography variant="h6">{error}</Typography>;
    }

    if (myEmployees.length === 0) {
      return (
        <Typography variant="h6" style={{ textAlign: "center" }}>
          There are no employees
        </Typography>
      );
    }

    return <EmployeesTable onSelect={this.handleSelect} users={myEmployees} />;
  }

  render() {
    const {
      classes,
      messageError,
      isSuccessful,
      isDeleting,
      isCreating,
      numbers
    } = this.props;
    const {
      selectedUsers,
      openCreate,
      values,
      touched,
      errors,
      isValid
    } = this.state;

    const showNameError = touched.display_name && errors.display_name;
    const showUsernameError = touched.username && errors.username;
    const showPasswordError = touched.password && errors.password;

    const token = cookie.load("token");


    if (!token) {
      return <Redirect to="/sign-in" />;
    }

    return (
      <DashboardLayout title="Employees">
        <Grid
          container
          direction="row"
          justify="space-around"
          alignItems="center"
          style={{
            backgroundColor: "#9bc3f2",
            marginBottom: "1%",
            maxHeight: 350,
            height: "100%"
          }}
        >
          <Grid item>
            <Typography
                variant="h2"
                style={{
                fontFamily: "Pacifico",
                color: "white"
              }}
            >
              Together we can change the world
            </Typography>
          </Grid>
          <Grid item>
            <Box display="flex" justifyContent="center">
              <img
                alt="Employees banner"
                src="/images/banners/employee.png"
                style={{ maxHeight: "80%", maxWidth: "80%" , minWidth: "20%", minHeight:"20%"}}
              />
            </Box>
          </Grid>
        </Grid>

        <div className={classes.root}>
          <EmployeesToolbar
            selectedUsers={selectedUsers}
            onNewEmployee={this.handleOpenCreate}
            handleDeleteUsers={this.deleteEmployee}
          />
          <div className={classes.content}>{this.renderUsers()}</div>
        </div>

        <Dialog
          open={openCreate}
          onClose={this.handleCloseCreate}
          fullWidth
          maxWidth="sm"
          aria-labelledby="customized-dialog-title"
        >
          <DialogTitle
            id="customized-dialog-title"
            onClose={this.handleCloseCreate}
          >
            Create employee
          </DialogTitle>
          {isSuccessful ? (
            <Grid
              container
              direction="row"
              justify="center"
              alignItems="center"
              style={{ minWidth: 500, minHeight: 200 }}
            >
              <CheckCircleIcon className={classes.icon} />
              <Typography className={classes.successContent} variant="h4">
                Successful
              </Typography>
            </Grid>
          ) : (
            <>
              <DialogContent>
                <Grid
                  container
                  direction="column"
                  alignItems="center"
                  spacing={3}
                >
                  <Grid item>
                    <Grid
                      container
                      direction="row"
                      alignItems="center"
                      justify="space-between"
                    >
                      <Grid item>
                        <InputLabel
                          shrink
                          htmlFor="bootstrap-input"
                          className={classes.typo}
                        >
                          NAME
                        </InputLabel>
                      </Grid>
                      <Grid item>
                        <BootstrapInput
                          id="bootstrap-input"
                          onChange={event =>
                            this.handleFieldChange(
                              "display_name",
                              event.target.value
                            )
                          }
                          value={values.display_name}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                  {showNameError && (
                    <Typography className={classes.fieldError} variant="body2">
                      {errors.display_name[0]}
                    </Typography>
                  )}
                  <Grid item>
                    <Grid
                      container
                      direction="row"
                      alignItems="center"
                      justify="space-between"
                    >
                      <Grid item>
                        <InputLabel
                          shrink
                          htmlFor="bootstrap-input"
                          className={classes.typo}
                        >
                          USERNAME
                        </InputLabel>
                      </Grid>
                      <Grid item>
                        <BootstrapInput
                          id="bootstrap-input"
                          onChange={event =>
                            this.handleFieldChange(
                              "username",
                              event.target.value
                            )
                          }
                          value={values.username}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                  {showUsernameError && (
                    <Typography className={classes.fieldError} variant="body2">
                      {errors.username[0]}
                    </Typography>
                  )}
                  <Grid item>
                    <Grid
                      container
                      direction="row"
                      alignItems="center"
                      justify="space-between"
                    >
                      <Grid item>
                        <InputLabel
                          shrink
                          htmlFor="bootstrap-input"
                          className={classes.typo}
                        >
                          PASSWORD
                        </InputLabel>
                      </Grid>
                      <Grid item>
                        <BootstrapInput
                          id="bootstrap-input"
                          type="password"
                          onChange={event =>
                            this.handleFieldChange(
                              "password",
                              event.target.value
                            )
                          }
                          value={values.password}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                  {showPasswordError && (
                    <Typography className={classes.fieldError} variant="body2">
                      {errors.password[0]}
                    </Typography>
                  )}
                  <Grid item>
                    {messageError && (
                      <Typography className={classes.fieldError}>
                        {messageError}
                      </Typography>
                    )}
                  </Grid>
                  {isCreating && !messageError && (
                    <div className={classes.progressWrapper}>
                      <CircularProgress className={classes.progress} />
                    </div>
                  )}
                </Grid>
              </DialogContent>
              <DialogActions>
                {!isSuccessful ? (
                  messageError ? (
                    <Button
                      autoFocus
                      onClick={this.handleCreateEmployeeFail}
                      className={classes.button}
                    >
                      Try it again
                    </Button>
                  ) : (
                    <Button
                      autoFocus
                      disabled={!isValid}
                      onClick={this.createEmployee}
                      className={classes.button}
                    >
                      Create employee
                    </Button>
                  )
                ) : null}
              </DialogActions>
            </>
          )}
        </Dialog>

        <Dialog
          open={isDeleting}
          fullWidth
          maxWidth="sm"
          aria-labelledby="customized-dialog-title"
          onClose={this.handleCloseDelete}
        >
          {numbers === selectedUsers.length ? (
            <Grid
              container
              direction="column"
              justify="center"
              alignItems="center"
              style={{ minWidth: 500, minHeight: 200 }}
            >
              <Grid
                item
                container
                direction="row"
                justify="center"
                alignItems="center"
              >
                <CheckCircleIcon className={classes.iconDeleted} />
                <Typography className={classes.deleted} variant="h4">
                  Deleted
                </Typography>
              </Grid>
            </Grid>
          ) : (
            <Grid
              container
              direction="column"
              justify="center"
              alignItems="center"
              style={{ minWidth: 500, minHeight: 200 }}
            >
              <Grid item>
                <Typography variant="h5" style={{ textAlign: "center" }}>
                  {numbers} / {selectedUsers.length}
                </Typography>
              </Grid>
              <Grid
                item
                container
                direction="row"
                justify="center"
                alignItems="center"
              >
                <DeleteSweepIcon className={classes.iconDeleted} />
                <Typography className={classes.deleted} variant="h4">
                  Deleting...
                </Typography>
              </Grid>
            </Grid>
          )}
        </Dialog>
      </DashboardLayout>
    );
  }
}

EmployeeList.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    isLoading: state.Employees.isLoading,
    isCreating: state.Employees.isCreating,
    isSuccessful: state.Employees.isSuccessful,
    myEmployees: state.Employees.myEmployees,
    messageError: state.Employees.messageError,
    numbers: state.Employees.numbers,
    isDeleting: state.Employees.isDeleting
  };
};

const mapDispatchToProps = dispatch => {
  return {
    doGetEmployees: token => {
      dispatch(getAllEmployeeRequest(token));
    },
    doCreateEmployee: (username, password, display_name, token) => {
      dispatch(createEmployeeRequest(username, password, display_name, token));
    },
    doDeleteEmployee: (token, id) => {
      dispatch(deleteEmployeeRequest(token, id));
    },
    clear: () => {
      dispatch(clear());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(EmployeeList));
