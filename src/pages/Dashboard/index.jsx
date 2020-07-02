import React, { Component } from "react";
import { Redirect } from "react-router-dom";

// Externals
import PropTypes from "prop-types";
import cookie from "react-cookies";

// Material helpers
import { withStyles } from "@material-ui/core";

// Material components
import { Grid } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

// Shared layouts
import { Dashboard as DashboardLayout } from "../../layouts";

// Service
import { connect } from "react-redux";

// Component styles
const styles = theme => ({
  root: {
    padding: theme.spacing(4)
  },
  item: {
    height: "100%"
  }
});

class Dashboard extends Component {

  render() {
    const { classes } = this.props;

    if (!cookie.load("token")) {
      return <Redirect to="/sign-in" />;
    }

    return (
      <DashboardLayout title="Dashboard">
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
          style={{ marginBottom: "10px", backgroundColor: "#2aa1fb" }}
        >
          <Grid item lg={5} md={6} xl={5} xs={12}>
            <Typography
              style={{
                fontFamily: "Pacifico",
                fontSize: "30px",
                color: "white"
              }}
            >
              What's news?
            </Typography>
          </Grid>
          <Grid item lg={6} md={6} xl={6} xs={12}>
            <Box display="flex" justifyContent="center" m={1} p={1}>
              <img alt="Brainalytica logo" src="/images/banners/analys.png" />
            </Box>
          </Grid>
        </Grid>
        <div className={classes.root}>
          <Typography>Dashboard</Typography>
        </div>
      </DashboardLayout>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
      isLoading: state.Authentication.isLoading
  };
};

const mapDispatchToProps = () => {
  return {

  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Dashboard));
