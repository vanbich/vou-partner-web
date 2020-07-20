import React, { Component } from "react";
import { Link, withRouter, Redirect } from "react-router-dom";

// Externals
import PropTypes from "prop-types";
import compose from "recompose/compose";
import validate from "validate.js";
import _ from "underscore";
import cookie from "react-cookies";

// Material helpers
import { fade, withStyles } from "@material-ui/core";

// Material components
import {
  Grid,
  Button,
  CircularProgress,
  Typography,
  Card
} from "@material-ui/core";

// Component styles
import styles from "./styles";
import "../../App.css";

// Form validation schema
import schema from "./schema";

// Service methods
import { connect } from "react-redux";
import { clear, loginRequest } from "../../actions/AthenticationActions";
import InputBase from "@material-ui/core/InputBase/InputBase";
import InputLabel from "@material-ui/core/InputLabel/InputLabel";

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
    border: "1px solid #e0e0e0",
    fontSize: 13,
    padding: "10px 12px",
    width: "35ch",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    // Use the system font instead of the default Roboto font.
    fontFamily: ["Roboto"].join(","),
    "&:focus": {
      boxShadow: `${fade("#ffa8a4", 0.25)} 0 0 0 0.2rem`,
      borderColor: "#ffa8a4"
    }
  }
}))(InputBase);

class SignIn extends Component {
  state = {
    values: {
      username: "",
      password: ""
    },
    touched: {
      username: false,
      password: false
    },
    errors: {
      username: null,
      password: null
    },
    isValid: false,
    submitError: null
  };

  validateForm = _.debounce(() => {
    const { values } = this.state;

    const newState = { ...this.state };
    const errors = validate(values, schema);

    newState.errors = errors || {};
    newState.isValid = errors ? false : true;

    this.setState(newState);
  }, 300);

  handleFieldChange = (field, value) => {
    const newState = { ...this.state };

    newState.submitError = null;
    newState.touched[field] = true;
    newState.values[field] = value;

    this.setState(newState, this.validateForm);
  };

  handleSignIn = () => {
    const { values } = this.state;
    this.setState({ isLoading: true });
    this.props.doSignIn(values.username, values.password);
  };

  handleSingInFail = () => {
    this.props.doRefresh();
    this.setState({
      isLoading: false,
      values: {
        username: "",
        password: ""
      }
    });
  };

  render() {
    const { classes, messageError, isLoading } = this.props;
    const { values, touched, errors, isValid } = this.state;

    const token = cookie.load("token");

    const showEmailError = touched.username && errors.username;
    const showPasswordError = touched.password && errors.password;

    if (token) {
      return <Redirect to={"/dashboard"} />;
    }

    return (
      <Card className={classes.root}>
        <Grid
          container
          direction="row"
          justify="space-around"
          alignItems="center"
        >
          <Grid
            item
            xs={6}
            style={{
              textAlign: "center",
              backgroundColor: "rgba(255,169,166,0.56)",
              paddingTop: "100px",
              paddingBottom: "100px"
            }}
          >
            <Typography variant="h2" className={classes.subtitle}>
              I'm glad to see you everyday
            </Typography>
            <img
              alt="sign-in"
              src="/images/banners/login.png"
              style={{
                maxHeight: "80%",
                maxWidth: "80%",
                minWidth: "20%",
                minHeight: "20%"
              }}
            />
          </Grid>
          <Grid
            item
            xs={6}
            style={{
              textAlign: "center",
              paddingTop: "50px",
              paddingBottom: "50px"
            }}
          >
            <Grid
              container
              direction="column"
              justify="center"
              alignItems="center"
            >
              <Grid item className={classes.title}>
                <img alt="Vou" src="/images/logos/vou-50px.png" />
              </Grid>
              <Grid item className={classes.fields}>
                <Grid container direction="column" alignItems="flex-start">
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
                        this.handleFieldChange("username", event.target.value)
                      }
                      value={values.username}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item className={classes.fields}>
                {showEmailError && (
                  <Typography className={classes.fieldError} variant="body2">
                    {errors.username[0]}
                  </Typography>
                )}
              </Grid>
              <Grid item className={classes.fields}>
                <Grid container direction="column" alignItems="flex-start">
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
                        this.handleFieldChange("password", event.target.value)
                      }
                      value={values.password}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item className={classes.fields}>
                {showPasswordError && (
                  <Typography className={classes.fieldError} variant="body2">
                    {errors.password[0]}
                  </Typography>
                )}
              </Grid>
              {messageError && (
                <Typography className={classes.submitError} variant="body2">
                  {messageError}
                </Typography>
              )}

              {isLoading && !messageError ? (
                <CircularProgress className={classes.progress} />
              ) : messageError ? (
                <Grid item className={classes.fields}>
                  <Button
                    className={classes.signInButton}
                    onClick={this.handleSingInFail}
                    size="large"
                    variant="contained"
                  >
                    Try again
                  </Button>
                </Grid>
              ) : (
                <>
                  <Grid item className={classes.fields}>
                    <Button
                      className={classes.signInButton}
                      disabled={!isValid}
                      onClick={this.handleSignIn}
                      size="large"
                      variant="contained"
                    >
                      Sign In
                    </Button>
                  </Grid>
                  <Grid item className={classes.forgotContainer}>
                    <Link className={classes.forgot} to="/">
                      Forgot password?
                    </Link>
                  </Grid>
                </>
              )}
              <Grid item className={classes.fields}>
                <Typography className={classes.signUp} variant="body1">
                  Don't have an account?{" "}
                  <Link
                    className={classes.signUpUrl}
                    to="/sign-up"
                    onClick={() => this.props.doRefresh()}
                  >
                    Sign up
                  </Link>
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Card>
    );
  }
}

SignIn.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    messageError: state.Authentication.messageError,
    isLoading: state.Authentication.isLoading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    doSignIn: (username, password) => {
      dispatch(loginRequest(username, password));
    },
    doRefresh: () => {
      dispatch(clear());
    }
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  compose(
    withRouter,
    withStyles(styles)
  )(SignIn)
);
