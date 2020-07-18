import React, { Component } from "react";
import { Link, withRouter, Redirect } from "react-router-dom";

// Externals
import PropTypes from "prop-types";
import compose from "recompose/compose";
import validate from "validate.js";
import _ from "underscore";

// Material helpers
import { Card, fade, withStyles } from "@material-ui/core";

// Material components
import { Button, CircularProgress, Grid, Typography } from "@material-ui/core";

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
import InputBase from "@material-ui/core/InputBase/InputBase";
import InputLabel from "@material-ui/core/InputLabel/InputLabel";

validate.validators.checked = validators.checked;

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

class SignUp extends Component {
  state = {
    values: {
      firstName: "",
      lastName: "",
      username: "",
      password: "",
      policy: false
    },
    touched: {
      firstName: false,
      lastName: false,
      username: false,
      password: false,
      policy: null
    },
    errors: {
      firstName: null,
      lastName: null,
      username: null,
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

    this.props.doSignUp(values.username, values.password);
  };

  handleSignUpSuccess = () => {
    return <Redirect to={"/sign-in"} />;
  };

  handleSignUpFail = () => {
    this.props.doRefresh();
    this.setState({
      values: {
        firstName: "",
        lastName: "",
        username: "",
        password: ""
      }
    });
  };

  render() {
    const { classes, isRegister, messageError, isLoading } = this.props;
    const { values, touched, errors, isValid } = this.state;

    // const showFirstNameError =
    //   touched.firstName && errors.firstName ? errors.firstName[0] : false;
    // const showLastNameError =
    //   touched.lastName && errors.lastName ? errors.lastName[0] : false;

    const showEmailError =
      touched.username && errors.username ? errors.username[0] : false;
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
            xs={6}
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
            xs={6}
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
              <Grid item className={classes.fields}>
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
              <Grid item className={classes.fields}>
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
    doSignUp: (username, password) => {
      dispatch(registerRequest(username, password));
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
