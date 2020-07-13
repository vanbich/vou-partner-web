import React, { Component } from "react";

// Externals
import classNames from "classnames";
import PropTypes from "prop-types";
import PerfectScrollbar from "react-perfect-scrollbar";
import validate from "validate.js";
import _ from "underscore";
import cookie from "react-cookies";

// Material helpers
import { CircularProgress, fade, withStyles } from "@material-ui/core";

// Material components
import {
  Avatar,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  TablePagination,
  IconButton,
  Dialog
} from "@material-ui/core";
import MuiDialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions/DialogActions";
import InputBase from "@material-ui/core/InputBase/InputBase";
import Grid from "@material-ui/core/Grid";
import InputLabel from "@material-ui/core/InputLabel/InputLabel";
import Button from "@material-ui/core/Button";

// Material icons
import SettingsApplicationsSharpIcon from "@material-ui/icons/SettingsApplicationsSharp";
import CloseIcon from "@material-ui/icons/Close";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";

// Shared helpers
import { getInitials } from "../../../../helpers";

// Shared components
import { Portlet, PortletContent } from "../../../../components";

// Component styles
import styles from "./styles";

import schema from "./schema";
import {
  clear,
  updateEmployeePasswordRequest
} from "../../../../actions/EmployeeAction";
import { connect } from "react-redux";

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
    fontSize: 16,
    width: "auto",
    padding: "10px 12px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"'
    ].join(","),
    "&:focus": {
      boxShadow: `${fade("#9bc3f2", 0.25)} 0 0 0 0.2rem`,
      borderColor: theme.palette.primary.main
    }
  }
}))(InputBase);

class EmployeesTable extends Component {
  state = {
    selectedUsers: [],
    rowsPerPage: 10,
    page: 0,
    resetDialog: false,
    isValid: false,
    error: "",
    values: {
      password: "",
      confirm: ""
    },

    errors: {
      password: null,
      confirm: null
    },

    touched: {
      password: false,
      confirm: false
    }
  };

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

  updatePassword = username => {
    const { values } = this.state;
    const token = cookie.load("token");

    if (values.password === "") {
      this.setState({
        error: "Password is not entered"
      });
    } else if (values.confirm !== values.password) {
      this.setState({
        error: "Confirm password is not match"
      });
    } else {
      this.props.doUpdatePassword(
        username,
        values.password,
        values.confirm,
        token
      );
    }
  };

  handleOpen = () => {
    this.setState({
      resetDialog: true
    });
  };

  handleClose = () => {
    this.props.clear();
    this.setState({
      resetDialog: false,
      isValid: false,

      values: {
        password: "",
        confirm: ""
      },

      errors: {
        password: null,
        confirm: null
      },

      touched: {
        password: false,
        confirm: false
      }
    });
  };

  handleUpdateFail = () => {
    this.props.clear();
    this.setState({
      values: {
        password: "",
        confirm: ""
      },

      errors: {
        password: null,
        confirm: null
      },

      touched: {
        password: false,
        confirm: false
      }
    });
  };

  handleSelectAll = event => {
    const { users, onSelect } = this.props;

    let selectedUsers;

    if (event.target.checked) {
      selectedUsers = users.map(user => user.id);
    } else {
      selectedUsers = [];
    }

    this.setState({ selectedUsers });

    onSelect(selectedUsers);
  };

  handleSelectOne = (event, id) => {
    const { onSelect } = this.props;
    const { selectedUsers } = this.state;

    const selectedIndex = selectedUsers.indexOf(id);
    let newSelectedUsers = [];

    if (selectedIndex === -1) {
      newSelectedUsers = newSelectedUsers.concat(selectedUsers, id);
    } else if (selectedIndex === 0) {
      newSelectedUsers = newSelectedUsers.concat(selectedUsers.slice(1));
    } else if (selectedIndex === selectedUsers.length - 1) {
      newSelectedUsers = newSelectedUsers.concat(selectedUsers.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedUsers = newSelectedUsers.concat(
        selectedUsers.slice(0, selectedIndex),
        selectedUsers.slice(selectedIndex + 1)
      );
    }

    this.setState({ selectedUsers: newSelectedUsers });

    onSelect(newSelectedUsers);
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  render() {
    const {
      classes,
      className,
      users,
      isSuccessful,
      isUpdating,
      messageError
    } = this.props;
    const {
      activeTab,
      selectedUsers,
      rowsPerPage,
      page,
      resetDialog,
      values,
      touched,
      errors,
      isValid,
      error
    } = this.state;

    const rootClassName = classNames(classes.root, className);

    const showPasswordError = touched.password && errors.password;
    const showConfirmError = touched.confirm && errors.confirm;

    return (
      <div style={{ width: "80%", margin: "0 auto" }}>
        <Portlet className={rootClassName}>
          <PortletContent noPadding>
            <PerfectScrollbar>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell align="center">
                      <Checkbox
                        checked={selectedUsers.length === users.length}
                        style={{ color: "#80b7f2" }}
                        indeterminate={
                          selectedUsers.length > 0 &&
                          selectedUsers.length < users.length
                        }
                        onChange={this.handleSelectAll}
                      />
                    </TableCell>
                    <TableCell align="center">Name</TableCell>
                    <TableCell align="center">Username</TableCell>
                    <TableCell align="center">Update</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {users
                    .filter(user => {
                      if (activeTab === 1) {
                        return !user.returning;
                      }

                      if (activeTab === 2) {
                        return user.returning;
                      }

                      return user;
                    })
                    .slice(0, rowsPerPage)
                    .map(user => (
                      <TableRow
                        className={classes.tableRow}
                        hover
                        key={user.id}
                        selected={selectedUsers.indexOf(user.id) !== -1}
                      >
                        <TableCell className={classes.tableCell} align="center">
                          <Checkbox
                            checked={selectedUsers.indexOf(user.id) !== -1}
                            onChange={event =>
                              this.handleSelectOne(event, user.id)
                            }
                            style={{ color: "#80b7f2" }}
                            value="true"
                          />
                        </TableCell>
                        <TableCell className={classes.tableCell} align="center">
                          <Avatar
                            className={classes.avatar}
                            src={user.avatarUrl}
                          >
                            {getInitials(user.display_name)}
                          </Avatar>
                          <Typography
                            className={classes.nameText}
                            variant="body1"
                          >
                            {user.display_name}
                          </Typography>
                        </TableCell>
                        <TableCell className={classes.tableCell} align="center">
                          <Typography
                            className={classes.nameText}
                            variant="body1"
                          >
                            {user.username}
                          </Typography>
                        </TableCell>
                        <TableCell className={classes.tableCell} align="center">
                          <IconButton onClick={this.handleOpen}>
                            <SettingsApplicationsSharpIcon
                              className={classes.icon}
                            />
                          </IconButton>
                        </TableCell>
                        <Dialog
                          open={resetDialog}
                          fullWidth
                          maxWidth="sm"
                          aria-labelledby="customized-dialog-title"
                          onClose={this.handleClose}
                        >
                          <DialogTitle
                            id="customized-dialog-title"
                            onClose={this.handleClose}
                          >
                            {user.display_name}
                          </DialogTitle>
                          {isSuccessful ? (
                            <Grid
                              container
                              direction="row"
                              justify="center"
                              alignItems="center"
                              style={{ minWidth: 500, minHeight: 200 }}
                            >
                              <CheckCircleIcon
                                className={classes.iconSuccess}
                              />
                              <Typography
                                className={classes.successContent}
                                variant="h4"
                              >
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
                                          PASSWORD
                                        </InputLabel>
                                      </Grid>
                                      <Grid item>
                                        <BootstrapInput
                                          id="bootstrap-input"
                                          type="password"
                                          onChange={event => {
                                            this.handleFieldChange(
                                              "password",
                                              event.target.value
                                            );
                                          }}
                                          value={values.password}
                                        />
                                      </Grid>
                                    </Grid>
                                  </Grid>
                                  {showPasswordError && (
                                    <Typography
                                      className={classes.fieldError}
                                      variant="body2"
                                    >
                                      {errors.password[0]}
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
                                          CONFIRM
                                        </InputLabel>
                                      </Grid>
                                      <Grid item>
                                        <BootstrapInput
                                          id="bootstrap-input"
                                          type="password"
                                          onChange={event =>
                                            this.handleFieldChange(
                                              "confirm",
                                              event.target.value
                                            )
                                          }
                                          value={values.confirm}
                                        />
                                      </Grid>
                                    </Grid>
                                  </Grid>
                                  {showConfirmError && (
                                    <Typography
                                      className={classes.fieldError}
                                      variant="body2"
                                    >
                                      {errors.confirm[0]}
                                    </Typography>
                                  )}
                                  {error && (
                                    <Typography className={classes.fieldError}>
                                      {error}
                                    </Typography>
                                  )}
                                  <Grid item>
                                    {messageError && (
                                      <Typography
                                        className={classes.fieldError}
                                      >
                                        {messageError}
                                      </Typography>
                                    )}
                                  </Grid>
                                  {isUpdating && !messageError && (
                                    <div className={classes.progressWrapper}>
                                      <CircularProgress />
                                    </div>
                                  )}
                                </Grid>
                              </DialogContent>
                              <DialogActions>
                                {!isSuccessful ? (
                                  messageError ? (
                                    <Button
                                      autoFocus
                                      onClick={this.handleUpdateFail}
                                      className={classes.button}
                                    >
                                      Try it again
                                    </Button>
                                  ) : (
                                    <Button
                                      autoFocus
                                      disabled={!isValid}
                                      onClick={() =>
                                        this.updatePassword(user.username)
                                      }
                                      className={classes.button}
                                    >
                                      Reset password
                                    </Button>
                                  )
                                ) : null}
                              </DialogActions>
                            </>
                          )}
                        </Dialog>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </PerfectScrollbar>
            <TablePagination
              backIconButtonProps={{
                "aria-label": "Previous Page"
              }}
              component="div"
              count={users.length}
              nextIconButtonProps={{
                "aria-label": "Next Page"
              }}
              onChangePage={this.handleChangePage}
              onChangeRowsPerPage={this.handleChangeRowsPerPage}
              page={page}
              rowsPerPage={rowsPerPage}
              rowsPerPageOptions={[5, 10, 25]}
            />
          </PortletContent>
        </Portlet>
      </div>
    );
  }
}

EmployeesTable.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
  onSelect: PropTypes.func,
  onShowDetails: PropTypes.func,
  users: PropTypes.array.isRequired
};

EmployeesTable.defaultProps = {
  users: [],
  onSelect: () => {},
  onShowDetails: () => {}
};

const mapStateToProps = state => {
  return {
    isUpdating: state.Employees.isUpdating,
    isSuccessful: state.Employees.isSuccessful,
    messageError: state.Employees.messageError
  };
};

const mapDispatchToProps = dispatch => {
  return {
    doUpdatePassword: (username, new_password, confirm_password, token) => {
      dispatch(
        updateEmployeePasswordRequest(
          username,
          new_password,
          confirm_password,
          token
        )
      );
    },
    clear: () => {
      dispatch(clear());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(EmployeesTable));
