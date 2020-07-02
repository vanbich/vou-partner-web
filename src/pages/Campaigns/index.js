import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";

// Externals
import PropTypes from "prop-types";
import cookie from "react-cookies";

// Material helpers
import { withStyles } from "@material-ui/core";

// Material components
import {
  IconButton,
  CircularProgress,
  Grid,
  Typography
} from "@material-ui/core";
import Box from "@material-ui/core/Box";
import MomentUtils from "@date-io/moment";
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import Paper from "@material-ui/core/Paper/Paper";
import InputBase from "@material-ui/core/InputBase/InputBase";

// Material icons
import {
  ChevronRight as ChevronRightIcon,
  ChevronLeft as ChevronLeftIcon
} from "@material-ui/icons";
import CloseIcon from "@material-ui/icons/Close";
import CheckCircleOutlinedIcon from "@material-ui/icons/CheckCircleOutlined";

// Shared layouts
import { Dashboard as DashboardLayout } from "../../layouts";

// Custom components
import { CampaignToolbar, CampaignCard } from "./components";

// Component styles
import styles from "./style";

//Service methods
import { connect } from "react-redux";
import {
  clear,
  createCampaignRequest,
  getAllCampaignsRequest
} from "../../actions/CampaignActions";
import { getMyVouchersRequest } from "../../actions/VoucherActions";

const style = theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(2)
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500]
  }
});

const DialogTitle = withStyles(style)(props => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle
      disableTypography
      className={classes.root}
      {...other}
      style={{ borderBottom: "2px dashed #62cdd9" }}
    >
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles(theme => ({
  root: {
    padding: theme.spacing(2),
    borderBottom: "2px dashed #62cdd9"
  }
}))(MuiDialogContent);

const DialogActions = withStyles(theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(1)
  }
}))(MuiDialogActions);

class Campaign extends Component {
  constructor(props) {
    super(props);
    this.wrapper = React.createRef();
    this.state = {
      limit: 6,
      productsTotal: 0,
      error: null,
      name: "",
      promo_code: "",
      imageCampaign:
        "https://cache.redgiant.com/wp-assets/2019/07/Summer19-Sale-Teaser-Blog.jpg",
      description: "",
      start_time: new Date(),
      end_time: new Date(),
      num_of_voucher: 0,
      discount: 0,
      open: false
    };
  }

  getCampaigns = () => {
    const { id } = this.props;
    const token = cookie.load("token");
    this.props.doGetMyCampaigns(token, id);
    this.props.doGetMyVouchers(token, id);
  };

  groupData = (campaigns, vouchers) => {
    const data = [...campaigns];

    for (let i = 0; i < campaigns.length; i++) {
      if (vouchers.length > 0) {
        const voucher = vouchers.find(v => v.campaign_id === data[i].id);

        if (voucher) {
          data[i].voucher = voucher;
        } else {
          data[i].voucher = null;
        }
      } else {
        data[i].voucher = null;
      }
    }

    console.log("data", data);

    return [...data];
  };

  componentDidMount() {
    this.getCampaigns();
  }

  handleClickOpen = () => {
    this.setState({
      open: true
    });
  };

  handleClose = () => {
    this.setState({
      open: false
    });
    this.handleCreateCampaignFail();
    this.getCampaigns();
  };

  handleImageChange = e => {
    e.preventDefault();
    let file = e.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      this.setState({
        imageCampaign: reader.result
      });
    };
  };

  handleChangeDescript = e => {
    this.setState({
      description: e.target.value
    });
  };

  handleChangeCampaignName = e => {
    this.setState({
      name: e.target.value
    });
  };

  handleChangeCode = e => {
    this.setState({
      promo_code: e.target.value
    });
  };

  setNewCampaignStartTime = date => {
    this.setState({
      start_time: date._d
    });
  };

  setNewCampaignEndTime = date => {
    this.setState({
      end_time: date._d
    });
  };

  handleChangeDiscount = e => {
    this.setState({
      discount: e.target.value
    });
  };

  handleChangeNumbers = e => {
    this.setState({
      num_of_voucher: e.target.value
    });
  };

  dateToString = date => {
    return `${date.getFullYear()}-${
      date.getMonth() + 1 < 10
        ? "0" + (date.getMonth() + 1)
        : date.getMonth() + 1
    }-${date.getDate() < 10 ? "0" + date.getDate() : date.getDate()}`;
  };

  createCampaign = () => {
    const {
      name,
      imageCampaign,
      promo_code,
      description,
      start_time,
      end_time,
      discount,
      num_of_voucher
    } = this.state;
    const { id } = this.props;
    const token = cookie.load("token");

    this.props.doCreateCampaign(
      name,
      imageCampaign,
      id,
      discount,
      num_of_voucher,
      promo_code,
      "url",
      description,
      this.dateToString(start_time),
      this.dateToString(end_time),
      token
    );
  };

  handleCreateCampaignFail = () => {
    this.props.clear();
    this.setState({
      name: "",
      promo_code: "",
      imageCampaign:
        "https://cache.redgiant.com/wp-assets/2019/07/Summer19-Sale-Teaser-Blog.jpg",
      description: "",
      start_time: new Date(),
      end_time: new Date(),
      num_of_voucher: 0,
      discount: 0
    });
  };

  renderCampaigns() {
    const { myVouchers, myCampaigns } = this.props;
    const campaigns = this.groupData(myCampaigns, myVouchers);

    if (myCampaigns.length === 0 || myVouchers.length === 0) {
      return (
        <Typography variant="h6" style={{ textAlign: "center" }}>
          There are no products available
        </Typography>
      );
    }

    return (
      <Grid container spacing={3}>
        {campaigns.map(product => {
          return (
            <Grid item key={product.id} lg={4} md={4} xs={12}>
              <Link to="#">
                <CampaignCard product={product} voucher={product.voucher} />
              </Link>
            </Grid>
          );
        })}
      </Grid>
    );
  }

  render() {
    const { classes, isSuccessful, messageError, isLoading } = this.props;
    const {
      name,
      promo_code,
      imageCampaign,
      description,
      start_time,
      end_time,
      discount,
      num_of_voucher
    } = this.state;

    const token = cookie.load("token");

    if (!token) {
      return <Redirect to="/sign-in" />;
    }

    console.log("image", typeof imageCampaign);
    return (
      <DashboardLayout title="Campaign">
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
          style={{ backgroundColor: "#ffa4a8" }}
        >
          <Grid item lg={5} md={6} xl={5} xs={12}>
            <Typography
              style={{
                fontFamily: "Pacifico",
                fontSize: "30px",
                color: "white"
              }}
            >
              More vouchers, More benefits
            </Typography>
          </Grid>
          <Grid item lg={6} md={6} xl={6} xs={12}>
            <Box display="flex" justifyContent="center" m={1} p={1}>
              <img alt="Brainalytica logo" src="/images/banners/campaign.png" />
            </Box>
          </Grid>
        </Grid>
        <div className={classes.root} ref={this.wrapper}>
          <CampaignToolbar onNewItem={() => this.handleClickOpen()} />
          {isLoading && (
            <div className={classes.progressWrapper}>
              <CircularProgress />
            </div>
          )}

          <div className={classes.content}>{this.renderCampaigns()}</div>
          <div className={classes.pagination}>
            <Typography variant="caption">1-6 of 20</Typography>
            <IconButton>
              <ChevronLeftIcon />
            </IconButton>
            <IconButton>
              <ChevronRightIcon />
            </IconButton>
          </div>
        </div>
        <Dialog
          fullWidth
          maxWidth="sm"
          onClose={this.handleClose}
          aria-labelledby="customized-dialog-title"
          open={this.state.open}
        >
          <DialogTitle id="customized-dialog-title" onClose={this.handleClose}>
            New campaign
          </DialogTitle>
          <DialogContent className={classes.dialog}>
            {isSuccessful ? (
              <Grid
                container
                direction="row"
                justify="center"
                alignContent="center"
              >
                <CheckCircleOutlinedIcon className={classes.icon} />
                <Typography className={classes.successContent} variant="h4">
                  Successful
                </Typography>
              </Grid>
            ) : (
              <Grid
                container
                direction="column"
                spacing={2}
                alignContent="center"
              >
                <Grid item>
                  <div className={classes.displayImage}>
                    <img
                      src={imageCampaign}
                      alt={"Campaign"}
                      className={classes.productImage}
                    />
                  </div>
                </Grid>
                <Grid item>
                  <div
                    style={{
                      width: "100%",
                      height: "50px",
                      justifyContent: "center",
                      display: "flex"
                    }}
                  >
                    <input
                      accept="image/*"
                      className={classes.input}
                      id="contained-button-file"
                      multiple
                      type="file"
                      // onChange={this.handleImageChange}
                    />
                    <label htmlFor="contained-button-file">
                      <Button component="span" className={classes.upload}>
                        Upload
                      </Button>
                    </label>
                  </div>
                </Grid>
                <Grid item>
                  <Grid
                    container
                    direction="row"
                    justify="center"
                    alignItems="center"
                    spacing={3}
                  >
                    <Grid item xs={6}>
                      <Paper
                        component="form"
                        className={classes.paper}
                        variant="outlined"
                      >
                        <Typography className={classes.typo}>name</Typography>
                        <InputBase
                          className={classes.textfield}
                          value={name}
                          placeholder="Your campaign name"
                          onChange={this.handleChangeCampaignName}
                        />
                      </Paper>
                    </Grid>
                    <Grid item xs={6}>
                      <Paper
                        component="form"
                        className={classes.paper}
                        variant="outlined"
                      >
                        <Typography className={classes.typo}>Code</Typography>
                        <InputBase
                          placeholder="Voucher code"
                          className={classes.textfield}
                          value={promo_code}
                          onChange={this.handleChangeCode}
                        />
                      </Paper>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item>
                  <Grid
                    container
                    direction="row"
                    justify="center"
                    alignItems="center"
                    spacing={3}
                  >
                    <Grid item xs={6}>
                      <Paper
                        component="form"
                        className={classes.paper}
                        variant="outlined"
                      >
                        <Typography className={classes.typo}>
                          Discount
                        </Typography>
                        <InputBase
                          type="number"
                          className={classes.textfield}
                          value={discount}
                          onChange={this.handleChangeDiscount}
                        />
                      </Paper>
                    </Grid>
                    <Grid item xs={6}>
                      <Paper
                        component="form"
                        className={classes.paper}
                        variant="outlined"
                      >
                        <Typography className={classes.typo}>
                          Numbers
                        </Typography>
                        <InputBase
                          type="number"
                          className={classes.textfield}
                          value={num_of_voucher}
                          onChange={this.handleChangeNumbers}
                        />
                      </Paper>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item>
                  <Grid container direction="row" spacing={3}>
                    <Grid item xs={6}>
                      <Paper
                        component="form"
                        className={classes.paper}
                        variant="outlined"
                      >
                        <Typography className={classes.typo}>Begin</Typography>
                        <MuiPickersUtilsProvider utils={MomentUtils} fullWidth>
                          <DatePicker
                            width="100%"
                            disableToolbar
                            format="DD/MM/YYYY"
                            value={start_time}
                            InputProps={{
                              disableUnderline: true
                            }}
                            onChange={this.setNewCampaignStartTime}
                            className={classes.textfield}
                          />
                        </MuiPickersUtilsProvider>
                      </Paper>
                    </Grid>
                    <Grid item xs={6}>
                      <Paper
                        component="form"
                        className={classes.paper}
                        variant="outlined"
                      >
                        <Typography className={classes.typo}>End</Typography>
                        <MuiPickersUtilsProvider utils={MomentUtils} fullWidth>
                          <DatePicker
                            width="100%"
                            disableToolbar
                            format="DD/MM/YYYY"
                            InputProps={{
                              disableUnderline: true
                            }}
                            value={end_time}
                            onChange={this.setNewCampaignEndTime}
                            className={classes.textfield}
                          />
                        </MuiPickersUtilsProvider>
                      </Paper>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item>
                  <Paper
                    component="form"
                    className={classes.paper}
                    variant="outlined"
                  >
                    <Typography className={classes.typo}>Describe</Typography>
                    <InputBase
                      placeholder="Describe something about your campaign"
                      multiline={true}
                      className={classes.textfield}
                      value={description}
                      onChange={this.handleChangeDescript}
                    />
                  </Paper>
                </Grid>
                <Grid item>
                  {messageError && (
                    <Typography className={classes.fieldError}>
                      {messageError}
                    </Typography>
                  )}
                </Grid>
                {isLoading && !messageError && (
                  <div className={classes.progressWrapper}>
                    <CircularProgress />
                  </div>
                )}
              </Grid>
            )}
          </DialogContent>
          <DialogActions>
            {!isSuccessful ? (
              messageError ? (
                <Button
                  autoFocus
                  onClick={this.handleCreateCampaignFail}
                  className={classes.button}
                >
                  Try it again
                </Button>
              ) : (
                <Button
                  autoFocus
                  onClick={this.createCampaign}
                  className={classes.button}
                >
                  Create campaign
                </Button>
              )
            ) : null}
          </DialogActions>
        </Dialog>
      </DashboardLayout>
    );
  }
}

Campaign.propTypes = {
  classes: PropTypes.object.isRequired
};
const mapStateToProps = state => {
  return {
    id: state.User.id,
    isLoading: state.Campaigns.isLoading,
    isSuccessful: state.Campaigns.isSuccessful,
    messageError: state.Campaigns.messageError,
    myCampaigns: state.Campaigns.myCampaigns,
    myVouchers: state.Vouchers.myVouchers
  };
};

const mapDispatchToProps = dispatch => {
  return {
    doGetMyCampaigns: (token, id) => {
      dispatch(getAllCampaignsRequest(token, id));
    },
    doCreateCampaign: (
      name,
      image,
      partner_id,
      discount,
      num_of_voucher,
      promo_code,
      voucher_image,
      description,
      start_time,
      end_time,
      token
    ) => {
      dispatch(
        createCampaignRequest(
          name,
          image,
          partner_id,
          discount,
          num_of_voucher,
          promo_code,
          voucher_image,
          description,
          start_time,
          end_time,
          token
        )
      );
    },
    doGetMyVouchers: (token, id) => {
      dispatch(getMyVouchersRequest(token, id));
    },
    clear: () => {
      dispatch(clear());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Campaign));
