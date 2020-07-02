import React, { Component } from "react";
import { Link, withRouter, Redirect } from "react-router-dom";

// Externals
import PropTypes from "prop-types";
import compose from "recompose/compose";
import validate from "validate.js";
import _ from "underscore";

// Material helpers
import { Card, withStyles } from "@material-ui/core";

// Material components
import {
  Button,
  CircularProgress,
  Grid,
  TextField,
  Typography
} from "@material-ui/core";

// Material icons

// Shared utilities
import validators from "../../common/validators";

// Component styles
import styles from "./styles";

// Form validation schema
import schema from "./schema";

//Service
import { connect } from "react-redux";
import { clear, registerRequest } from "../../actions/AthenticationActions";

validate.validators.checked = validators.checked;

class SignUp extends Component {
  state = {
    values: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      policy: false
    },
    touched: {
      firstName: false,
      lastName: false,
      email: false,
      password: false,
      policy: null
    },
    errors: {
      firstName: null,
      lastName: null,
      email: null,
      password: null,
      policy: null
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

  handleSignUp = () => {
    const { values } = this.state;

    this.props.doSignUp(values.email, values.password);
  };

  handleSignUpSuccess = () => {
    return (<Redirect to={"/sign-in"}/>)
  };

  handleSignUpFail = () => {
    this.props.doRefresh();
    this.setState({
      values: {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
      },
    });
  };

  render() {
    const { classes, isRegister, messageError, isLoading } = this.props;
    const {
      values,
      touched,
      errors,
      isValid,

    } = this.state;

    // const showFirstNameError =
    //   touched.firstName && errors.firstName ? errors.firstName[0] : false;
    // const showLastNameError =
    //   touched.lastName && errors.lastName ? errors.lastName[0] : false;

    const showEmailError =
      touched.email && errors.email ? errors.email[0] : false;
    const showPasswordError =
      touched.password && errors.password ? errors.password[0] : false;

    if (isRegister) {
      this.handleSignUpSuccess();
    }

    return (
        <Card className={classes.root}>
          <Grid container direction="row" justify="center" alignItems="center">
            <Grid
                item
                lg={6}
                style={{
                  textAlign: "center",
                  backgroundColor: "rgba(255,169,166,0.56)",
                  paddingTop: "100px",
                  paddingBottom: "100px"
                }}
            >
              <Typography variant="h2" className={classes.subtitle}>
                Let's become my partner!
              </Typography>
              <img alt="sign-in" src="/images/banners/register.png" />
            </Grid>
            <Grid
                item
                lg={6}
                style={{
                  textAlign: "center"
                }}
            >
              <Grid
                  container
                  direction="column"
                  justify="center"
                  alignItems="center"
              >
                <Grid item lg={6} className={classes.title}>
                  <img alt="Vou" src="/images/logos/vou-50px.png" />
                </Grid>
                {/*<Grid item lg={6} className={classes.fields}>*/}
                {/*  <TextField*/}
                {/*    className={classes.textField}*/}
                {/*    label="First name"*/}
                {/*    name="firstName"*/}
                {/*    onChange={event =>*/}
                {/*      this.handleFieldChange("firstName", event.target.value)*/}
                {/*    }*/}
                {/*    value={values.firstName}*/}
                {/*    variant="outlined"*/}
                {/*  />*/}
                {/*</Grid>*/}
                {/*{showFirstNameError && (*/}
                {/*  <Typography className={classes.fieldError} variant="body2">*/}
                {/*    {errors.firstName[0]}*/}
                {/*  </Typography>*/}
                {/*)}*/}
                {/*<Grid item lg={6} className={classes.fields}>*/}
                {/*  <TextField*/}
                {/*    className={classes.textField}*/}
                {/*    label="Last name"*/}
                {/*    onChange={event =>*/}
                {/*      this.handleFieldChange("lastName", event.target.value)*/}
                {/*    }*/}
                {/*    value={values.lastName}*/}
                {/*    variant="outlined"*/}
                {/*  />*/}
                {/*</Grid>*/}
                {/*{showLastNameError && (*/}
                {/*  <Typography className={classes.fieldError} variant="body2">*/}
                {/*    {errors.lastName[0]}*/}
                {/*  </Typography>*/}
                {/*)}*/}
                <Grid item lg={6} className={classes.fields}>
                  <TextField
                      className={classes.textField}
                      label="Email address"
                      name="email"
                      onChange={event =>
                          this.handleFieldChange("email", event.target.value)
                      }
                      value={values.email}
                      variant="outlined"
                  />
                </Grid>
                <Grid item lg={6} className={classes.fields}>
                  {showEmailError && (
                      <Typography className={classes.fieldError} variant="body2">
                        {errors.email[0]}
                      </Typography>
                  )}
                </Grid>
                <Grid item lg={6} className={classes.fields}>
                  <TextField
                      className={classes.textField}
                      label="Password"
                      onChange={event =>
                          this.handleFieldChange("password", event.target.value)
                      }
                      type="password"
                      value={values.password}
                      variant="outlined"
                  />
                </Grid>
                <Grid item lg={6} className={classes.fields}>
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
                <Grid item lg={6} className={classes.fields}>
                  {isLoading && !messageError ? (
                      <CircularProgress className={classes.progress} />
                  ) : messageError ? (
                      <Button
                          className={classes.signUpButton}
                          disabled={!isValid}
                          onClick={this.handleSignUpFail}
                          size="large"
                          variant="contained"
                      >
                        Try again
                      </Button>
                  ) : (
                      <Button
                          className={classes.signUpButton}
                          disabled={!isValid}
                          onClick={this.handleSignUp}
                          size="large"
                          variant="contained"
                      >
                        Sign up
                      </Button>
                  )}
                </Grid>
                <Grid item lg={6} className={classes.fields}>
                  <Typography className={classes.signIn} variant="body1">
                    Have an account?{" "}
                    <Link
                        className={classes.signInUrl}
                        to="/sign-in"
                        onClick={() => this.props.doRefresh()}
                    >
                      Sign In
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

SignUp.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    isRegister: state.Authentication.isRegister,
    messageError: state.Authentication.messageError,
    isLoading: state.Authentication.isLoading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    doSignUp: (email, password) => {
      dispatch(registerRequest(email, password));
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
  )(SignUp)
);
