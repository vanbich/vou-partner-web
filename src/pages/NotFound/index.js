import React, { Component } from "react";
import { Link } from "react-router-dom";

// Externals
import PropTypes from "prop-types";

// Material helpers
import { withStyles } from "@material-ui/core";

// Material components
import { Grid, Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";

// Component styles
const styles = theme => ({
  root: {
    padding: theme.spacing(4)
  },
  content: {
    marginTop: "25px",
    textAlign: "center"
  },
  image: {
    display: "inline-block",
    maxWidth: "100%"
  }
});

class NotFound extends Component {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Grid container justify="center">
          <Grid item lg={6} xs={12}>
            <div className={classes.content}>
              <img
                alt="Not found"
                src="/images/banners/not-found.png"
                className={classes.image}
              />
              <Typography variant="h1">Oops! Page does not found</Typography>
              <Link to="/">
                <Button>Go back</Button>
              </Link>
            </div>
          </Grid>
        </Grid>
      </div>
    );
  }
}

NotFound.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(NotFound);
