import React, { Component } from "react";
import {Switch, Route, Redirect, Link} from "react-router-dom";

// Views
import Dashboard from "./pages/Dashboard";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import NotFound from "./pages/NotFound";
import Campaign from "./pages/Campaigns";
import Account from "./pages/Account";

// Service method
import { connect } from "react-redux";
import { clear } from "./actions/UserActions";

// Material components
import { Dialog, Typography, Button, Grid, DialogActions} from "@material-ui/core";

class Routes extends Component {
  handleClose = () => {
    this.props.clear();
  };


  render() {
    const { isGetInfo, messageError} = this.props;
    return (
      <>
        <Switch>
          <Redirect exact from="/" to="/dashboard" />
          <Route component={SignUp} exact path="/sign-up" />
          <Route component={SignIn} exact path="/sign-in" />

          <Route component={Dashboard} exact path="/dashboard" />
          <Route component={Campaign} exact path="/campaigns" />
          <Route component={Account} exact path="/account" />

          <Route component={NotFound} exact path="/not-found" />
          <Redirect to="/not-found" />
        </Switch>
        <Dialog fullWidth maxWidth="xs" open={isGetInfo} onClose={this.handleClose}>
            <Grid container direction="column" justify="space-around" alignItems="center" style={{height: 200}}>
                <img src={'/images/banners/error.png'} alt="Error icon"/>
                <Typography style={{color: "red", fontWeight: "bold"}}>{messageError}</Typography>
                <DialogActions>
                    <Link to="/not-found">
                        <Button style={{color: "#f2ae1c", width: "10%"}} onClick={this.handleClose}>
                            OK
                        </Button>
                    </Link>
                </DialogActions>
            </Grid>

        </Dialog>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    isGetInfo: state.User.isGetInfo,
    messageError: state.User.messageError
  };
};

const mapDispatchToProps = dispatch => {
  return {
    clear: () => {
      dispatch(clear());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Routes);
