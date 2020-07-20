import React, { Component } from "react";

// Externals
import PropTypes from "prop-types";
import classNames from "classnames";

// Material helpers
import { withStyles } from "@material-ui/core";

// Material components
import { Typography } from "@material-ui/core";

// Shared components
import { Paper } from "../../../../components";

// Component styles
import styles from "./styles";
import ProductDetail from "../GameDetail";

class GameCard extends Component {
  render() {
    const { classes, className, product } = this.props;

    const rootClassName = classNames(classes.root, className);

    return (
      <Paper className={rootClassName}>
        <div className={classes.imageWrapper}>
          <img alt="Game" className={classes.image} src={product.logo} />
        </div>
        <div className={classes.details}>
          <Typography className={classes.title} variant="h4">
            {product.name}
          </Typography>
        </div>
        <div className={classes.row}>
          <span className={classes.spacer} />
          <ProductDetail
            title={product.name}
            avatar={product.logo}
            discript={product.description}
            points={product.point}
          />
        </div>
      </Paper>
    );
  }
}

GameCard.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
  product: PropTypes.object.isRequired
};

export default withStyles(styles)(GameCard);
