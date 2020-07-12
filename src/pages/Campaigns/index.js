import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";

// Externals
import PropTypes from "prop-types";
import cookie from "react-cookies";
import validate from "validate.js";
import _ from "underscore";

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
import Card from "@material-ui/core/Card";
import Checkbox from "@material-ui/core/Checkbox";

// Material icons
import {
  ChevronRight as ChevronRightIcon,
  ChevronLeft as ChevronLeftIcon
} from "@material-ui/icons";
import CloseIcon from "@material-ui/icons/Close";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";

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
import { storage } from "../../firebase/index";

// Form validation schema
import schema from "./schema";

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
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
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
    padding: theme.spacing(2)
  }
}))(MuiDialogContent);

const DialogActions = withStyles(theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(1)
  }
}))(MuiDialogActions);

const GreenCheckbox = withStyles({
  root: {
    color: "#ffa4a8",
    "&$checked": {
      color: "#ffa4a8"
    }
  },
  checked: {}
})(props => <Checkbox color="default" {...props} />);

class Campaign extends Component {
  constructor(props) {
    super(props);
    this.wrapper = React.createRef();
    this.state = {
      values: {
        name: "",
        promo_code: "",
        description: "",
        num_of_voucher: 0,
        discount: 0
      },

      touched: {
        name: false,
        promo_code: false,
        description: false,
        num_of_voucher: false,
        discount: false
      },
      errors: {
        name: null,
        promo_code: null,
        description: null,
        num_of_voucher: null,
        discount: null,
        end_time: null
      },

      limit: 6,
      productsTotal: 0,
      isValid: false,
      imagePreview: "",
      imageCampaign:
        "https://cache.redgiant.com/wp-assets/2019/07/Summer19-Sale-Teaser-Blog.jpg",
      start_time: new Date(),
      end_time: new Date(),
      gamesChoose: [],
      open: false,
      isUploadImg: null,
      part1: true,
      part2: false,
      part3: false
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

    return JSON.parse(JSON.stringify(data));
  };

  componentDidMount() {
    this.getCampaigns();
    this.generateGames();
  }

  generateGames = () => {
    const { games } = this.props;
    let { gamesChoose } = this.state;
    gamesChoose = [];
    games.map(game => {
      game.acceptPoint = 0;
      game.isCheck = false;
      gamesChoose.push(game);
      return gamesChoose;
    });

    this.setState({
      gamesChoose: JSON.parse(JSON.stringify(gamesChoose))
    });
  };

  showPart1 = () => {
    this.setState({
      part1: true,
      part2: false,
      part3: false
    });
  };

  showPart2 = () => {
    this.setState({
      part1: false,
      part2: true,
      part3: false
    });
  };

  showPart3 = () => {
    this.setState({
      part1: false,
      part2: false,
      part3: true
    });
  };

  handleClickOpen = () => {
    this.setState({
      open: true
    });
  };

  handleUploadImgFail = () => {
    this.setState({
      isUploadImg: null
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
    this.setState({
      imagePreview: URL.createObjectURL(e.target.files[0]),
      imageCampaign: e.target.files[0]
    });
  };

  validateForm = _.debounce(() => {
    const { values } = this.state;

    const newState = { ...this.state };
    const errors = validate(values, schema);

    newState.errors = errors || {};
    newState.isValid = !errors;

    this.setState(newState);
  }, 300);

  handleFieldChange = (field, value) => {
    const newState = { ...this.state };

    newState.touched[field] = true;
    newState.values[field] = value;

    this.setState(newState, this.validateForm);
  };

  setNewCampaignStartTime = date => {
    this.setState({
      start_time: date._d
    });
  };

  setNewCampaignEndTime = date => {
    const { start_time, errors } = this.state;
    const date_picked = date._d;

    if (date_picked.valueOf() <= start_time.valueOf()) {
      errors.end_time = "End time must be after start time";
      this.setState({
        end_time: new Date(),
        errors: { ...errors },
        isValid: false
      });
    } else if (date_picked.valueOf() < new Date().valueOf()) {
      errors.end_time = "End time is today at least";
      this.setState({
        end_time: new Date(),
        errors: { ...errors },
        isValid: false
      });
    } else {
      errors.end_time = null;
      this.setState({
        end_time: date._d,
        errors: { ...errors },
        isValid: true
      });
    }
  };

  handleGameChoose = e => {
    const { gamesChoose } = this.state;

    const itemCheck = gamesChoose.find(
      item => item.id === parseInt(e.target.name)
    );
    itemCheck.isCheck = e.target.checked;
    this.setState({
      gamesChoose: [...gamesChoose]
    });
    console.log("gamesChoose", gamesChoose);
  };

  handleChangeGamePoint = (e, id) => {
    const { gamesChoose } = this.state;

    const itemChoose = gamesChoose.find(item => item.id === parseInt(id));
    itemChoose.acceptPoint = e.target.value;
    this.setState({
      gamesChoose: [...gamesChoose]
    });
    console.log("gamesChoose2", gamesChoose);
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
      values,
      imageCampaign,
      start_time,
      end_time,
      gamesChoose
    } = this.state;
    const { id } = this.props;
    const token = cookie.load("token");

    const campaignGames = gamesChoose.filter(game => game.isCheck === true);

    const uploadTask = storage
      .ref(`${id}/campaigns/${imageCampaign.name}`)
      .put(imageCampaign);

    uploadTask.on(
      "state_changed",
      snapShot => {
        //takes a snap shot of the process as it is happening
        console.log(snapShot);
      },
      err => {
        //catches the errors
        console.log("abcnd");

        this.setState({
          isUploadImg: err
        });
      },
      () => {
        storage
          .ref(`${id}/campaigns/`)
          .child(imageCampaign.name)
          .getDownloadURL()
          .then(fireBaseUrl => {
            console.log("url", fireBaseUrl);
            console.log(
              "doCreateCampaign",
              values.name,
              fireBaseUrl,
              id,
              values.discount,
              values.num_of_voucher,
              values.promo_code,
              "url",
              values.description,
              this.dateToString(start_time),
              this.dateToString(end_time),
              campaignGames,
              token
            );

            this.props.doCreateCampaign(
              values.name,
              fireBaseUrl,
              id,
              values.discount,
              values.num_of_voucher,
              values.promo_code,
              "url",
              values.description,
              this.dateToString(start_time),
              this.dateToString(end_time),
              token
            );
          });
      }
    );
  };

  handleCreateCampaignFail = () => {
    this.props.clear();
    this.generateGames();
    this.setState({
      values: {
        name: "",
        promo_code: "",
        description: "",
        num_of_voucher: 0,
        discount: 0
      },
      imageCampaign:
        "https://cache.redgiant.com/wp-assets/2019/07/Summer19-Sale-Teaser-Blog.jpg",
      start_time: new Date(),
      end_time: new Date(),
      imagePreview: "",
      part1: true,
      part2: false,
      part3: false
    });
  };

  renderCampaigns() {
    const { myVouchers, myCampaigns } = this.props;
    const campaigns = this.groupData(myCampaigns, myVouchers);

    if (myCampaigns.length === 0 && myVouchers.length === 0) {
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
                <CampaignCard
                  product={product}
                  data={() => this.getCampaigns()}
                />
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
      values,
      touched,
      errors,
      isValid,
      imagePreview,
      start_time,
      end_time,
      isUploadImg,
      gamesChoose,
      part1,
      part2,
      part3
    } = this.state;

    const token = cookie.load("token");

    if (!token) {
      return <Redirect to="/sign-in" />;
    }

    const showNameError = touched.name && errors.name;
    const showPromoCodeError = touched.promo_code && errors.promo_code;
    const showDiscountError = touched.discount && errors.discount;
    const showNumbersError = touched.num_of_voucher && errors.num_of_voucher;
    const showDescribeError = touched.description && errors.description;
    const showEndtimeError = errors.end_time;

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
          {isSuccessful ? (
            <Grid
              container
              direction="row"
              justify="center"
              alignItems="center"
              style={{ minWidth: 500, minHeight: 200 }}
            >
              <CheckCircleIcon className={classes.icon} />
              <Typography className={classes.successContent} variant="h4">
                Successful
              </Typography>
            </Grid>
          ) : part1 ? (
            <>
              <DialogContent className={classes.dialog}>
                <Grid
                  container
                  direction="column"
                  spacing={2}
                  justify="center"
                  alignItems="center"
                  style={{ minWidth: 500 }}
                >
                  <Grid item>
                    <Typography className={classes.titlePart}>
                      Choose image campaign
                    </Typography>
                  </Grid>
                  <Grid item>
                    <div className={classes.displayImage}>
                      <img
                        src={imagePreview}
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
                        onChange={this.handleImageChange}
                      />
                      <label htmlFor="contained-button-file">
                        <Button component="span" className={classes.upload}>
                          Choose image
                        </Button>
                      </label>
                    </div>
                  </Grid>
                </Grid>
              </DialogContent>
              <DialogActions>
                <Button
                  autoFocus
                  disabled={imagePreview === ""}
                  onClick={this.showPart2}
                  className={classes.button}
                >
                  Next
                </Button>
              </DialogActions>
            </>
          ) : part2 ? (
            <>
              <DialogContent className={classes.dialog}>
                <Grid
                  container
                  direction="column"
                  spacing={2}
                  alignContent="center"
                  style={{ minWidth: 500 }}
                >
                  <Grid item>
                    <Typography className={classes.titlePart}>
                      Campaign detail
                    </Typography>
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
                            value={values.name}
                            placeholder="Your campaign name"
                            onChange={event =>
                              this.handleFieldChange("name", event.target.value)
                            }
                          />
                        </Paper>
                        {showNameError && (
                          <Typography
                            className={classes.fieldError}
                            variant="body2"
                          >
                            {errors.name[0]}
                          </Typography>
                        )}
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
                            value={values.promo_code}
                            onChange={event =>
                              this.handleFieldChange(
                                "promo_code",
                                event.target.value
                              )
                            }
                          />
                        </Paper>
                        {showPromoCodeError && (
                          <Typography
                            className={classes.fieldError}
                            variant="body2"
                          >
                            {errors.promo_code[0]}
                          </Typography>
                        )}
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
                          <Typography className={classes.typo}>
                            Begin
                          </Typography>
                          <MuiPickersUtilsProvider
                            utils={MomentUtils}
                            fullWidth
                          >
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
                              onChange={this.setNewCampaignEndTime}
                              className={classes.textfield}
                            />
                          </MuiPickersUtilsProvider>
                        </Paper>
                        {showEndtimeError && (
                          <Typography
                            className={classes.fieldError}
                            variant="body2"
                          >
                            {errors.end_time}
                          </Typography>
                        )}
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
                            value={values.discount}
                            onChange={event =>
                              this.handleFieldChange(
                                "discount",
                                event.target.value
                              )
                            }
                          />
                        </Paper>
                        {showDiscountError && (
                          <Typography
                            className={classes.fieldError}
                            variant="body2"
                          >
                            {errors.discount[0]}
                          </Typography>
                        )}
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
                            value={values.num_of_voucher}
                            onChange={event =>
                              this.handleFieldChange(
                                "num_of_voucher",
                                event.target.value
                              )
                            }
                          />
                        </Paper>
                        {showNumbersError && (
                          <Typography
                            className={classes.fieldError}
                            variant="body2"
                          >
                            {errors.num_of_voucher[0]}
                          </Typography>
                        )}
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
                        value={values.description}
                        onChange={event =>
                          this.handleFieldChange(
                            "description",
                            event.target.value
                          )
                        }
                      />
                    </Paper>
                    {showDescribeError && (
                      <Typography
                        className={classes.fieldError}
                        variant="body2"
                      >
                        {errors.description[0]}
                      </Typography>
                    )}
                  </Grid>
                </Grid>
              </DialogContent>
              <DialogActions>
                <Button
                  autoFocus
                  onClick={this.showPart1}
                  className={classes.button}
                >
                  Back
                </Button>

                <Button
                  autoFocus
                  disabled={!isValid}
                  onClick={this.showPart3}
                  className={classes.button}
                >
                  Next
                </Button>
              </DialogActions>
            </>
          ) : (
            part3 && (
              <>
                <DialogContent className={classes.dialog}>
                  <Grid
                    container
                    direction="column"
                    spacing={2}
                    alignContent="center"
                  >
                    <Grid item>
                      <Typography className={classes.titlePart}>
                        Choose games
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Grid
                        container
                        direction="row"
                        justify="space-around"
                        alignItems="flex-start"
                        style={{ minWidth: 500 }}
                      >
                        {gamesChoose.map((game, index) => {
                          return (
                            <Card
                              key={index}
                              variant="outlined"
                              className={classes.cardGame}
                            >
                              <Grid
                                container
                                direction="column"
                                justify="space-around"
                                alignItems="center"
                              >
                                <Grid item>
                                  <Typography
                                    variant="h6"
                                    className={classes.gameTitle}
                                  >
                                    {game.name}
                                  </Typography>
                                </Grid>

                                <Grid item>
                                  <div className={classes.logoWrapper}>
                                    <img
                                      alt="icon game"
                                      src={game.logo}
                                      className={classes.logo}
                                    />
                                  </div>
                                </Grid>
                                <Grid item>
                                  <GreenCheckbox
                                    onChange={this.handleGameChoose}
                                    name={game.id.toString()}
                                  />
                                </Grid>
                                {game.isCheck && (
                                  <Grid item>
                                    <Paper
                                      component="form"
                                      className={classes.paper}
                                      variant="outlined"
                                    >
                                      <InputBase
                                        className={classes.textfield}
                                        type="number"
                                        value={game.acceptPoint}
                                        placeholder="Minimum point"
                                        onChange={event =>
                                          this.handleChangeGamePoint(
                                            event,
                                            game.id
                                          )
                                        }
                                      />
                                      <Typography className={classes.point}>
                                        /{game.point} points
                                      </Typography>
                                    </Paper>
                                  </Grid>
                                )}
                              </Grid>
                            </Card>
                          );
                        })}
                      </Grid>
                    </Grid>
                    <Grid item>
                      {messageError && (
                        <Typography className={classes.fieldError}>
                          {messageError}
                        </Typography>
                      )}
                    </Grid>
                    {isUploadImg && (
                      <Grid item>
                        <Typography className={classes.fieldError}>
                          {isUploadImg}
                        </Typography>
                      </Grid>
                    )}
                    {isLoading && !messageError && (
                      <div className={classes.progressWrapper}>
                        <CircularProgress />
                      </div>
                    )}
                  </Grid>
                </DialogContent>
                <DialogActions>
                  <Button
                    autoFocus
                    onClick={this.showPart2}
                    className={classes.button}
                  >
                    Back
                  </Button>
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
              </>
            )
          )}
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
    myVouchers: state.Vouchers.myVouchers,
    games: state.Games.games
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
