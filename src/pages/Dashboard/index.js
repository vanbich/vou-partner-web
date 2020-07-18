import React, { Component } from "react";
import { Redirect } from "react-router-dom";

// Externals
import PropTypes from "prop-types";
import cookie from "react-cookies";

// Material helpers
import { withStyles } from "@material-ui/core";

// Material components
import { Grid } from "@material-ui/core";
// Shared layouts
import { Dashboard as DashboardLayout } from "../../layouts";

// Custom components
import {
  Budget,
  Users,
  // Progress,
  // Profit,
  CampaignChart,
  VouchersChart,
  // DevicesChart,
  // ProductList,
  OrdersTable,
  Campaign,
  Voucher
} from "./components";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { connect } from "react-redux";
import { getAllCampaignsRequest } from "../../actions/CampaignActions";
import { getInfoRequest } from "../../actions/UserActions";
import { getMyVouchersRequest } from "../../actions/VoucherActions";
import { statisticVouchersRequest } from "../../actions/StatisticActions";

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
  state = {
    campaign_id: "",
    start_time: new Date(),
    end_time: new Date(),
  };

  dateToString = date => {
    return `${date.getFullYear()}-${
        date.getMonth() + 1 < 10
            ? "0" + (date.getMonth() + 1)
            : date.getMonth() + 1
    }-${date.getDate() < 10 ? "0" + date.getDate() : date.getDate()}`;
  };

  componentDidMount() {
    const token = cookie.load("token");
    const { doGetAllVouchers } = this.props;
    doGetAllVouchers(token);
  }

  shouldComponentUpdate(
    nextProps: Readonly<P>,
    nextState: Readonly<S>,
    nextContext: any
  ): boolean {
    const token = cookie.load("token");
    const { doGetAllCampaigns } = this.props;
    if (this.props.id !== nextProps.id) {
      doGetAllCampaigns(token, nextProps.id);
    }
    return true;
  }

  statistical = ()=>{
    const {campaign_id, end_time, start_time}=this.state;
    const token = cookie.load('token');
    console.log("received", campaign_id, this.dateToString(start_time), this.dateToString(end_time), token);
    this.props.doStatisticVoucher(campaign_id, this.dateToString(start_time), this.dateToString(end_time), token);
  };
  render() {
    const {
      classes,
      myCampaigns,
      numbers,
      statisticVoucherReceived,
      statisticVoucherUsed,
      statisticData,
      isLoadingStatisticVoucher,
      messageError
    } = this.props;
    const token = cookie.load("token");

    if (!token) {
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
          <Grid container spacing={4}>
            <Grid item lg={3} sm={6} xl={3} xs={12}>
              <Budget className={classes.item} />
            </Grid>
            <Grid item lg={3} sm={6} xl={3} xs={12}>
              <Users className={classes.item} />
            </Grid>
            <Grid item lg={3} sm={6} xl={3} xs={12}>
              <Campaign className={classes.item} numbers={myCampaigns.length} />
            </Grid>
            <Grid item lg={3} sm={6} xl={3} xs={12}>
              <Voucher className={classes.item} numbers={numbers} />
            </Grid>
            <Grid item xs={12}>
              <CampaignChart className={classes.item} data={statisticData} />
            </Grid>
            <Grid item xs={12}>
              <VouchersChart
                className={classes.item}
                statisticVoucherReceived={statisticVoucherReceived}
                statisticVoucherUsed={statisticVoucherUsed}
                campaigns={myCampaigns}
                campaign_id={this.state.campaign_id}
                start_time={this.state.start_time}
                end_time={this.state.end_time}
                onChangeSelect={(e)=>this.setState({campaign_id: e.target.value})}
                setStartTime={(date)=>this.setState({start_time: date._d})}
                setEndTime={(date)=>this.setState({end_time: date._d})}
                statisticClick={this.statistical}
                isLoading={isLoadingStatisticVoucher}
                error={messageError}
              />
            </Grid>
            <Grid item xs={12}>
              <OrdersTable className={classes.item} />
            </Grid>
          </Grid>
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
    myCampaigns: state.Campaigns.myCampaigns,
    numbers: state.Vouchers.numbers,
    statisticVoucherReceived: state.Statistics.statisticVoucherReceived,
    statisticVoucherUsed: state.Statistics.statisticVoucherUsed,
    statisticData: state.Campaigns.statisticData,
    isLoadingStatisticVoucher: state.Statistics.isLoadingStatisticVoucher,
    messageError: state.Statistics.messageError,
    id: state.User.id
  };
};

const mapDispatchToProps = dispatch => {
  return {
    doGetUser: token => {
      return new Promise((resolve, reject) => {
        return resolve(dispatch(getInfoRequest(token)));
      });
    },
    doGetAllCampaigns: (token, id) => {
      dispatch(getAllCampaignsRequest(token, id));
    },
    doGetAllVouchers: token => {
      dispatch(getMyVouchersRequest(token));
    },
    doStatisticVoucher: (campaign_id, start_time, end_time, token) => {
      dispatch(
        statisticVouchersRequest(campaign_id, start_time, end_time, token)
      );
    }
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Dashboard));
