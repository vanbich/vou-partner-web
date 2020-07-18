import React, { Component } from "react";

// Externals
import classNames from "classnames";
import PropTypes from "prop-types";

// Material helpers
import { withStyles } from "@material-ui/core";

// Material components
import { Typography } from "@material-ui/core";

// Material icons
import { ArrowDownward as ArrowDownwardIcon } from "@material-ui/icons";
import ReceiptIcon from "@material-ui/icons/Receipt";

// Shared components
import { Paper } from "../../../../components";

// Component styles
import styles from "./styles";

class Campaign extends Component {
  render() {
    const { classes, className, numbers, ...rest } = this.props;

    const rootClassName = classNames(classes.root, className);

    return (
      <Paper {...rest} className={rootClassName}>
        <div className={classes.content}>
          <div className={classes.details}>
            <Typography className={classes.title} variant="body2">
              TOTAL CAMPAIGNS
            </Typography>
            <Typography className={classes.value} variant="h3">
              {numbers}
            </Typography>
          </div>
          <div className={classes.iconWrapper}>
            <ReceiptIcon className={classes.icon} />
          </div>
        </div>
        <div className={classes.footer}>
          <Typography className={classes.difference} variant="body2">
            <ArrowDownwardIcon />
            12%
          </Typography>
          <Typography className={classes.caption} variant="caption">
            Since last month
          </Typography>
        </div>
      </Paper>
    );
  }
}

Campaign.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Campaign);
