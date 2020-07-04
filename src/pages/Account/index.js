import React, { Component } from "react";
import { Redirect } from "react-router-dom";

// Externals
import PropTypes from "prop-types";
import validate from "validate.js";
import cookie from "react-cookies";
import _ from "underscore";

// Material components
import {
  Typography,
  Box,
  Button,
  Grid,
  Dialog,
  DialogContent,
  CircularProgress,
  withStyles
} from "@material-ui/core";

// Material icons
import CheckCircleOutlinedIcon from "@material-ui/icons/CheckCircleOutlined";

// Shared layouts
import { Dashboard as DashboardLayout } from "../../layouts";
import { AccountProfile, AccountDetails } from "./components";

// Form validation schema
import schema from "./schema";

//Service methods
import { connect } from "react-redux";
import {
  clear,
  getInfoRequest,
  updateInfoRequest
} from "../../actions/UserActions";
import { storage } from "../../firebase/index";

// Component styles
const styles = theme => ({
  root: {
    padding: theme.spacing(4)
  },
  button: {
    marginTop: 10,
    backgroundColor: "#ffa8a4",
    color: "white",
    height: 50,
    width: 150,
    "&:hover": {
      backgroundColor: "#ffa8a4",
      color: "white"
    }
  },
  progress: {
    display: "block",
    marginTop: theme.spacing(2),
    marginLeft: "auto",
    marginRight: "auto"
  },
  submitError: {
    color: theme.palette.danger.main,
    alignText: "center",
    marginBottom: theme.spacing(1),
    marginTop: theme.spacing(2)
  },
  dialogRoot: {
    margin: theme.spacing(5)
  },
  content: {
    color: "green",
    marginLeft: theme.spacing(2)
  },
  icon: {
    color: "green"
  }
});

class Account extends Component {
  state = {
    values: {
      display_name: "",
      address: "",
      email: "",
      phone: ""
    },
    avatarPreview:
      "https://www.google.com/search?q=tocotoco+logo&tbm=isch&ved=2ahUKEwi1treRl8fpAhWTIqYKHUMUDk0Q2-cCegQIABAA&oq=tocotoco+logo&gs_lcp=CgNpbWcQAzICCAAyBAgAEB4yBggAEAgQHjIGCAAQCBAeOgYIABAFEB46BAgAEBhQ5RVYnR5gzCJoAHAAeACAAVqIAZ8DkgEBNZgBAKABAaoBC2d3cy13aXotaW1n&sclient=img&ei=fp7HXrX_HpPFmAXDqLjoBA&bih=664&biw=1366&client=firefox-b-d#imgrc=ae-im1TyccvvTM",
    avatar: "",
    touched: {
      email: false,
      address: false,
      phone: false,
      display_name: false
    },
    errors: {
      email: false,
      address: false,
      phone: false,
      display_name: false
    },
    isValid: false
  };

  validateForm = _.debounce(() => {
    const { values } = this.state;

    const newState = { ...this.state };
    const errors = validate(values, schema);

    newState.errors = errors || {};
    newState.isValid = errors ? false : true;

    this.setState(newState);
  }, 300);

  componentDidMount() {
    const { display_name, email, address, phone, avatar } = this.props;
    this.setState({
      values: {
        display_name: display_name,
        address: address,
        email: email,
        phone: phone
      },
      avatarPreview: avatar
    });
  }

  handleFieldChange = (field, value) => {
    const newState = { ...this.state };

    newState.submitError = null;
    newState.touched[field] = true;
    newState.values[field] = value;

    this.setState(newState, this.validateForm);
  };

  handleImageChange = e => {
    e.preventDefault();
    this.setState({
      avatarPreview: URL.createObjectURL(e.target.files[0]),
      avatar: e.target.files[0]
    });
  };

  handleUpdateInfo = () => {
    const { values, avatar } = this.state;
    const { id } = this.props;
    const token = cookie.load("token");

    console.log("update info", values, avatar);

    const uploadTask = storage.ref(`${id}/avatars/${avatar.name}`).put(avatar);

    uploadTask.on(
      "state_changed",
      snapShot => {
        //takes a snap shot of the process as it is happening
        console.log(snapShot);
      },
      err => {
        //catches the errors
        console.log("abcnd");

        this.setState({
          isUploadImg: err
        });
      },
      () => {
        storage
          .ref(`${id}/avatars`)
          .child(avatar.name)
          .getDownloadURL()
          .then(fireBaseUrl => {
            console.log("url", fireBaseUrl, values, token);

            this.props.doUpdateInfo(
              values.display_name,
              values.phone,
              values.email,
              values.address,
              fireBaseUrl,
              token
            );
          });
      }
    );
  };

  handleUpdateInfoFail = () => {
    const { display_name, email, address, phone, avatar } = this.props;

    this.props.clear();
    this.setState({
      values: {
        display_name: display_name,
        address: address,
        email: email,
        phone: phone
      },
      avatarPreview: avatar,
      avatar: ""
    });
  };

  handleCloseAlert = () => {
    const token = cookie.load("token");
    this.props.doGetInfo(token);
    this.props.clear();
  };

  render() {
    const {
      classes,
      display_name,
      email,
      address,
      phone,
      messageError,
      isSuccess,
      isLoading
    } = this.props;

    const { touched, errors, isValid, avatarPreview } = this.state;

    const showDisplayError = touched.display_name && errors.display_name;
    const showEmailError = touched.email && errors.email;
    const showAddressError = touched.address && errors.address;
    const showPhoneError = touched.phone && errors.phone;

    console.log("message", messageError);

    const token = cookie.load("token");

    if (!token) {
      return <Redirect to="/sign-in" />;
    }

    return (
      <DashboardLayout title="Account">
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
          style={{ marginBottom: "20px", backgroundColor: "#ffc5bd" }}
        >
          <Grid item lg={4} md={6} xl={4} xs={12}>
            <Typography
              style={{
                fontFamily: "Pacifico",
                fontSize: "30px",
                color: "white"
              }}
            >
              Hi, {display_name}
            </Typography>
            <Typography
              style={{
                fontFamily: "Pacifico",
                fontSize: "18px",
                marginTop: "15px",
                color: "white"
              }}
            >
              You can change anything about you in here
            </Typography>
          </Grid>
          <Grid item lg={6} md={6} xl={6} xs={12}>
            <Box display="flex" justifyContent="center" m={1} p={1}>
              <img
                alt="Brainalytica logo"
                src="/images/banners/account-settings.png"
              />
            </Box>
          </Grid>
        </Grid>
        <div className={classes.root}>
          <Grid container direction="column" justify="center" spacing={4}>
            <Grid container spacing={2}>
              <Grid item lg={8} md={6} xl={8} xs={12}>
                <AccountDetails
                  display_name={display_name}
                  email={email}
                  address={address}
                  phone={phone}
                  showDisplayErr={showDisplayError}
                  showEmailError={showEmailError}
                  showAddressError={showAddressError}
                  showPhoneError={showPhoneError}
                  errors={errors}
                  displayChange={event => {
                    this.handleFieldChange("display_name", event.target.value);
                  }}
                  emailChange={event => {
                    this.handleFieldChange("email", event.target.value);
                  }}
                  addressChange={event =>
                    this.handleFieldChange("address", event.target.value)
                  }
                  phoneChange={event =>
                    this.handleFieldChange("phone", event.target.value)
                  }
                />
              </Grid>
              <Grid item lg={4} md={6} xl={4} xs={12}>
                <AccountProfile
                  username={display_name}
                  avatar={avatarPreview}
                  onChangeAvatar={this.handleImageChange}
                />
              </Grid>
            </Grid>
            <Grid container justify="center">
              {messageError && (
                <Typography className={classes.submitError} variant="body2">
                  {messageError}
                </Typography>
              )}
            </Grid>
            <Grid container justify="center">
              {isLoading && !messageError ? (
                <CircularProgress className={classes.progress} />
              ) : messageError ? (
                <Button
                  className={classes.button}
                  onClick={this.handleUpdateInfoFail}
                >
                  Try it again
                </Button>
              ) : (
                <Button
                  className={classes.button}
                  disabled={!isValid}
                  onClick={this.handleUpdateInfo}
                >
                  Save changes
                </Button>
              )}
            </Grid>
          </Grid>
        </div>
        <Dialog
          open={isSuccess}
          onClose={this.handleCloseAlert}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogContent className={classes.dialogRoot}>
            <Grid
              container
              direction="row"
              justify="space-between"
              alignContent="center"
            >
              <CheckCircleOutlinedIcon className={classes.icon} />
              <Typography className={classes.content} variant="h4">
                Successful
              </Typography>
            </Grid>
          </DialogContent>
        </Dialog>
      </DashboardLayout>
    );
  }
}

Account.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    isLogin: state.Authentication.isLogin,
    id: state.User.id,
    display_name: state.User.display_name,
    username: state.User.username,
    email: state.User.email,
    address: state.User.address,
    phone: state.User.phone,
    avatar: state.User.avatar,
    messageError: state.User.messageError,
    isSuccess: state.User.isSuccess,
    isLoading: state.User.isLoading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    doUpdateInfo: (display_name, phone, email, address, avatar, token) => {
      dispatch(
        updateInfoRequest(display_name, phone, email, address, avatar, token)
      );
    },
    doGetInfo: token => {
      dispatch(getInfoRequest(token));
    },
    clear: () => {
      dispatch(clear());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Account));
