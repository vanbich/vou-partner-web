import React, { Component } from "react";

// Externals
import classNames from "classnames";
import PropTypes from "prop-types";
import { Bar } from "react-chartjs-2";

// Material helpers
import { Typography, withStyles } from "@material-ui/core";

// Material components
import { Grid, IconButton, CircularProgress } from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";
import Paper from "@material-ui/core/Paper";
import Select from "@material-ui/core/Select";
import AssessmentIcon from "@material-ui/icons/Assessment";

// Shared components
import {
  Portlet,
  PortletHeader,
  PortletContent,
  PortletLabel
} from "../../../../components";

// Chart configuration
import { options } from "./chart";

// Component styles
import styles from "./styles";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
import PortletToolbar from "../../../../components/PortletToolbar";

class VouchersChart extends Component {
  state = {
    default_value: 0
  };

  render() {
    const {
      classes,
      className,
      statisticVoucherUsed,
      statisticVoucherReceived,
      campaigns,
      campaign_id,
      start_time,
      end_time,
      onChangeSelect,
      setStartTime,
      setEndTime,
      statisticClick,
      isLoading,
      error,
      ...rest
    } = this.props;
    // const { default_value } = this.state;
    const rootClassName = classNames(classes.root, className);

    return (
      <Grid
        container
        direction="row"
        alignItems="center"
        justify="center"
        style={{ alignSelf: "center" }}
      >
        <Portlet {...rest} className={rootClassName}>
          <PortletHeader noDivider>
            <PortletLabel title="Vouchers" />
            <PortletToolbar>
              {campaigns.length === 0 ? null : (
                <Grid
                  container
                  direction="row"
                  justify="space-between"
                  alignItems="center"
                  spacing={2}
                >
                  <Grid item>
                    <Paper
                      component="form"
                      className={classes.paper}
                      variant="outlined"
                    >
                      <Typography className={classes.typo}>Campaign</Typography>
                      <Select
                        value={campaign_id}
                        onChange={event => onChangeSelect(event)}
                        displayEmpty
                        className={classes.textfield}
                        inputProps={{ "aria-label": "Without label" }}
                        defaultValue={campaigns[0].id}
                        disableUnderline
                      >
                        <MenuItem value="">Choose campaign </MenuItem>
                        {campaigns.map((campaign, index) => {
                          return (
                            <MenuItem key={index} value={campaign.id}>
                              {campaign.name}
                            </MenuItem>
                          );
                        })}
                      </Select>
                    </Paper>
                  </Grid>
                  <Grid item>
                    <Grid
                      container
                      direction="row"
                      justify="space-between"
                      alignItems="center"
                      spacing={2}
                    >
                      <Grid item>
                        <Paper
                          component="form"
                          className={classes.paper}
                          variant="outlined"
                        >
                          <Typography className={classes.typo}>From</Typography>
                          <MuiPickersUtilsProvider utils={MomentUtils}>
                            <DatePicker
                              width="100%"
                              disableToolbar
                              format="DD/MM/YYYY"
                              InputProps={{
                                disableUnderline: true
                              }}
                              value={start_time}
                              onChange={date => setStartTime(date)}
                              className={classes.textfield}
                            />
                          </MuiPickersUtilsProvider>
                        </Paper>
                      </Grid>
                      <Grid item>
                        <Paper
                          component="form"
                          className={classes.paper}
                          variant="outlined"
                        >
                          <Typography className={classes.typo}>To</Typography>
                          <MuiPickersUtilsProvider
                            utils={MomentUtils}
                            fullWidth
                          >
                            <DatePicker
                              width="100%"
                              disableToolbar
                              format="DD/MM/YYYY"
                              InputProps={{
                                disableUnderline: true
                              }}
                              value={end_time}
                              onChange={date => setEndTime(date)}
                              className={classes.textfield}
                            />
                          </MuiPickersUtilsProvider>
                        </Paper>
                      </Grid>
                      <Grid item>
                        <IconButton onClick={() => statisticClick()}>
                          <AssessmentIcon className={classes.button} />
                        </IconButton>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              )}
            </PortletToolbar>
          </PortletHeader>
          <PortletContent>
            {isLoading && (
              <div className={classes.progressWrapper}>
                <CircularProgress className={classes.progress} />
              </div>
            )}
            {campaigns.length === 0 ? (
              <div className={classes.chartWrapper}>
                <Typography
                  style={{
                    fontSize: 14,
                    color: "rgba(155,155,155,1)",
                    textAlign: "center",
                    alignSelf: "center"
                  }}
                >
                  Wait a few seconds
                </Typography>
              </div>
            ) : statisticVoucherReceived.datasets[0].data.length === 0 &&
              statisticVoucherUsed.datasets[0].data.length === 0 ? (
              <div className={classes.chartWrapper}>
                <Typography
                  style={{
                    fontSize: 14,
                    color: "#999999",
                    textAlign: "center",
                    alignSelf: "center"
                  }}
                >
                  Please choose campaign for statistical vouchers
                </Typography>
              </div>
            ) : (
              <Grid
                container
                direction="column"
                alignItems="center"
                spacing={4}
              >
                <Grid item>
                  {statisticVoucherReceived.datasets[0].data.length ===
                  0 ? null : (
                    <div className={classes.chartWrapper}>
                      <Bar data={statisticVoucherReceived} options={options} />
                    </div>
                  )}
                </Grid>
                <Grid item>
                  {statisticVoucherUsed.datasets[0].data.length === 0 ? null : (
                    <div className={classes.chartWrapper}>
                      <Bar data={statisticVoucherUsed} options={options} />
                    </div>
                  )}
                </Grid>
              </Grid>
            )}
          </PortletContent>
        </Portlet>
      </Grid>
    );
  }
}

VouchersChart.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(VouchersChart);
