import React, { Component } from "react";
import { Redirect } from "react-router-dom";

// Externals
import PropTypes from "prop-types";
import cookie from "react-cookies";

// Material helpers
import { withStyles } from "@material-ui/core";

// Material components
import { CircularProgress, Grid, Typography } from "@material-ui/core";
import Box from "@material-ui/core/Box";

// Material icons

// Shared layouts
import { Dashboard as DashboardLayout } from "../../layouts";

// Custom components
import { GamesToolbar, GameCard } from "./components";

// Component styles
import styles from "./styles";
import { connect } from "react-redux";

class GameList extends Component {
  signal = true;

  state = {
    isLoading: false
  };

  renderProducts() {
    const { classes, games } = this.props;
    const { isLoading } = this.state;

    if (isLoading) {
      return (
        <div className={classes.progressWrapper}>
          <CircularProgress />
        </div>
      );
    }

    if (games.length === 0) {
      return <Typography variant="h6">There are no games available</Typography>;
    }

    return (
      <Grid container spacing={3}>
        {games.map(product => (
          <Grid item key={product.id} lg={3} md={3} xs={12}>
            <GameCard product={product} />
          </Grid>
        ))}
      </Grid>
    );
  }

  render() {
    const { classes } = this.props;
    const token = cookie.load("token");
    if (!token) {
      return <Redirect to="/sign-in" />
    }

    return (
      <DashboardLayout title="Games">
        <Grid
          container
          direction="row"
          justify="space-around"
          alignItems="center"
          style={{
            backgroundColor: "#b495ff",
            marginBottom: "1%",
            maxHeight: 350,
            height: "100%"
          }}
        >
          <Grid item>
            <Typography
              variant="h2"
              style={{
                fontFamily: "Pacifico",
                color: "white"
              }}
            >
              More games, more happiness
            </Typography>
          </Grid>
          <Grid item>
            <Box display="flex" justifyContent="center" m={1} p={1}>
              <img
                alt="Game banner"
                src="/images/banners/store.png"
                style={{
                  maxHeight: "80%",
                  maxWidth: "80%",
                  minWidth: "20%",
                  minHeight: "20%"
                }}
              />
            </Box>
          </Grid>
        </Grid>

        <div className={classes.root}>
          <GamesToolbar />
          <div className={classes.content}>{this.renderProducts()}</div>
        </div>
      </DashboardLayout>
    );
  }
}

GameList.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    games: state.Games.games
  };
};

const mapDispatchToProps = () => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(GameList));
