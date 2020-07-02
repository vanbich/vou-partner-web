import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

// Views
import Dashboard from "./pages/Dashboard";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import NotFound from "./pages/NotFound";
import Campaign from "./pages/Campaigns";


export default class Routes extends Component {
  render() {
    return (
        <Switch>
            <Redirect exact from="/" to="/dashboard" />
            <Route component={Dashboard} exact path="/dashboard" />

            <Route component={SignUp} exact path="/sign-up" />
            <Route component={SignIn} exact path="/sign-in" />
            <Route component={Campaign} exact path="/campaigns" />

            <Route component={NotFound} exact path="/not-found" />
            <Redirect to="/not-found" />
        </Switch>
    );
  }
}
