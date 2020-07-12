import React, { Component } from "react";

// Externals
import PropTypes from "prop-types";
// import cookie from "react-cookies";
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
import FormControl from "@material-ui/core/FormControl";

//Material icons
import CloseIcon from "@material-ui/icons/Close";

// Shared layouts
import { Dashboard as DashboardLayout } from "../../layouts";

// Shared services
import { getUsers } from "../../services/user";

// Custom components
import { EmployeesToolbar, EmployeesTable } from "./components";

// Component styles
import styles from "./style";

// Form validation schema
import schema from "./schema";
import InputBase from "@material-ui/core/InputBase/InputBase";
import InputLabel from "@material-ui/core/InputLabel";
import Button from "@material-ui/core/Button";

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
      boxShadow: `${fade('#9bc3f2', 0.25)} 0 0 0 0.2rem`,
      borderColor: theme.palette.primary.main
    }
  }
}))(InputBase);

class EmployeeList extends Component {
  signal = true;

  state = {
    isLoading: false,
    limit: 10,
    users: [],
    selectedUsers: [],
    error: null,
    openCreate: false,

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

  async getUsers() {
    try {
      this.setState({ isLoading: true });

      const { limit } = this.state;

      const { users } = await getUsers(limit);

      if (this.signal) {
        this.setState({
          isLoading: false,
          users
        });
      }
    } catch (error) {
      if (this.signal) {
        this.setState({
          isLoading: false,
          error
        });
      }
    }
  }

  componentDidMount() {
    this.signal = true;
    this.getUsers();
  }

  componentWillUnmount() {
    this.signal = false;
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
      openCreate: true
    });
  };

  handleCloseCreate = () => {
    this.setState({
      openCreate: false
    });
  };

  handleSelect = selectedUsers => {
    this.setState({ selectedUsers });
  };

  renderUsers() {
    const { classes } = this.props;
    const { isLoading, users, error } = this.state;

    if (isLoading) {
      return (
        <div className={classes.progressWrapper}>
          <CircularProgress />
        </div>
      );
    }

    if (error) {
      return <Typography variant="h6">{error}</Typography>;
    }

    if (users.length === 0) {
      return <Typography variant="h6">There are no users</Typography>;
    }

    return <EmployeesTable onSelect={this.handleSelect} users={users} />;
  }

  render() {
    const { classes } = this.props;
    const { selectedUsers, openCreate } = this.state;

    return (
      <DashboardLayout title="Employees">
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
          style={{ backgroundColor: "#9bc3f2" }}
        >
          <Grid item lg={4} md={6} xl={4} xs={12}>
            <Typography
              style={{
                fontFamily: "Pacifico",
                fontSize: "30px",
                color: "white"
              }}
            >
              Employees
            </Typography>
          </Grid>
          <Grid item lg={6} md={6} xl={6} xs={12}>
            <Box display="flex" justifyContent="center" m={1} p={1}>
              <img alt="Brainalytica logo" src="/images/banners/employee.png" />
            </Box>
          </Grid>
        </Grid>

        <div className={classes.root}>
          <EmployeesToolbar
            selectedUsers={selectedUsers}
            onNewEmployee={this.handleOpenCreate}
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
          <DialogContent>
            <Grid
              container
              direction="column"
              alignContent="center"
              justify="center"
            >
              <Grid item xs={6}>
                <FormControl className={classes.paper}>
                  <InputLabel shrink htmlFor="bootstrap-input">
                    DISPLAY NAME
                  </InputLabel>
                  <BootstrapInput
                    id="bootstrap-input"
                  />
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl className={classes.paper}>
                  <InputLabel shrink htmlFor="bootstrap-input">
                    USERNAME
                  </InputLabel>
                  <BootstrapInput
                      id="bootstrap-input"
                  />
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl className={classes.paper}>
                  <InputLabel shrink htmlFor="bootstrap-input">
                    PASSWORD
                  </InputLabel>
                  <BootstrapInput
                      id="bootstrap-input"
                  />
                </FormControl>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button
                autoFocus
                // onClick={this.closeInfoGame}
                className={classes.button}
            >
              Create employee
            </Button>
          </DialogActions>
        </Dialog>
      </DashboardLayout>
    );
  }
}

EmployeeList.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(EmployeeList);
