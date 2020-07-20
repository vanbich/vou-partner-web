import React, { Component, Fragment } from "react";
import { withRouter } from "react-router-dom";

// Externals
import classNames from "classnames";
import compose from "recompose/compose";
import PropTypes from "prop-types";

// Material helpers
import { withStyles } from "@material-ui/core";

// Material components
import { IconButton, Toolbar, Typography, Grid } from "@material-ui/core";

// Material icons
import {
  Menu as MenuIcon,
  Close as CloseIcon,
  Input as InputIcon
} from "@material-ui/icons";

// Component styles
import styles from "./styles";
import { connect } from "react-redux";
import { logOut } from "../../../../actions/AthenticationActions";

class Topbar extends Component {
  handleSignOut = () => {
    const { history } = this.props;

    this.props.doLogout();
    history.push("/sign-in");
  };

  render() {
    const {
      classes,
      className,
      title,
      isSidebarOpen,
      onToggleSidebar
    } = this.props;

    const rootClassName = classNames(classes.root, className);

    return (
      <Fragment>
        <div className={rootClassName}>
          <Toolbar className={classes.toolbar}>
            <Grid
              container
              direction="row"
              justify="space-between"
              alignItems="center"
            >
              <Grid item>
                <Grid
                  container
                  direction="row"
                  justify="center"
                  alignItems="center"
                >
                  <IconButton
                    className={classes.menuButton}
                    onClick={onToggleSidebar}
                    variant="text"
                  >
                    {isSidebarOpen ? <CloseIcon /> : <MenuIcon />}
                  </IconButton>
                  <Typography className={classes.title} variant="h5">
                    {title}
                  </Typography>
                </Grid>
              </Grid>
              <Grid item>
                <IconButton
                  className={classes.signOutButton}
                  onClick={this.handleSignOut}
                >
                  <InputIcon />
                </IconButton>
              </Grid>
            </Grid>
          </Toolbar>
        </div>
      </Fragment>
    );
  }
}

Topbar.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  isSidebarOpen: PropTypes.bool,
  onToggleSidebar: PropTypes.func,
  title: PropTypes.string
};

Topbar.defaultProps = {
  onToggleSidebar: () => {}
};

const mapStateToProps = state => {
  return {};
};
const mapDispatchToProps = dispatch => {
  return {
    doLogout: () => {
      dispatch(logOut());
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
  )(Topbar)
);
