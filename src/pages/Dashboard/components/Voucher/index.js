import React, { Component } from "react";

// Externals
import classNames from "classnames";
import PropTypes from "prop-types";

// Material helpers
import { withStyles } from "@material-ui/core";

// Material components
import { Typography } from "@material-ui/core";

// Material icons
import ConfirmationNumberIcon from "@material-ui/icons/ConfirmationNumber";

// Shared components
import { Paper } from "../../../../components";

// Component styles
import styles from "./styles";

class Voucher extends Component {

  render() {
    const { classes, className, numbers, ...rest } = this.props;

    const rootClassName = classNames(classes.root, className);

    return (
      <Paper {...rest} className={rootClassName}>
        <div className={classes.content}>
          <div className={classes.details}>
            <Typography className={classes.title} variant="body2">
              TOTAL VOUCHERS
            </Typography>
            <Typography className={classes.value} variant="h3">
              {numbers}
            </Typography>
          </div>
          <div className={classes.iconWrapper}>
            <ConfirmationNumberIcon className={classes.icon} />
          </div>
        </div>
        <div className={classes.footer}/>
      </Paper>
    );
  }
}

Voucher.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Voucher);
