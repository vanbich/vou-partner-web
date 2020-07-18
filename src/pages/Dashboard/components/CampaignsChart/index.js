import React, { Component } from 'react';

// Externals
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { Bar} from 'react-chartjs-2';

// Material helpers
import {Typography, withStyles} from '@material-ui/core';

// Material components
import { Button, Grid } from '@material-ui/core';

// Material icons
import {
  ArrowDropDown as ArrowDropDownIcon,
} from '@material-ui/icons';

// Shared components
import {
  Portlet,
  PortletHeader,
  PortletLabel,
  PortletToolbar,
  PortletContent,
} from '../../../../components';

// Chart configuration
import { options } from './chart';

// Component styles
import styles from './styles';

class CampaignChart extends Component {
  render() {
    const { classes, className, data, ...rest } = this.props;
    console.log("data",data);

    const rootClassName = classNames(classes.root, className);

    return (
        <Grid container direction="row" alignItems="center" justify="center" style={{alignSelf: "center"}}>
          <Portlet
              {...rest}
              className={rootClassName}
          >
            <PortletHeader noDivider>
              <PortletLabel title="CAMPAIGNS" />
              <PortletToolbar>
                <Button
                    className={classes.dropdownButton}
                    size="small"
                    variant="text"
                >
                  Last 7 days <ArrowDropDownIcon />
                </Button>
              </PortletToolbar>
            </PortletHeader>
            <PortletContent>
              <div className={classes.chartWrapper}>
                {data.datasets[0].data.length===0?(                <Typography
                    style={{
                      fontSize: 14,
                      color: "#999999",
                      textAlign: "center",
                      alignSelf: "center"
                    }}
                >
                  Wait a few seconds
                </Typography>):(<Bar
                  data={data}
                  options={options}
                  />)}

              </div>
            </PortletContent>
          </Portlet>
        </Grid>
    );
  }
}

CampaignChart.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CampaignChart);
