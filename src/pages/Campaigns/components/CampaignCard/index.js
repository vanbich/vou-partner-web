import React, { Component } from "react";

// Externals
import PropTypes from "prop-types";
import cookie from "react-cookies";

// Material helpers
import { withStyles } from "@material-ui/core";

// Material components
import { Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import MomentUtils from "@date-io/moment";
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";
import InputBase from "@material-ui/core/InputBase";
import Paper from "@material-ui/core/Paper";
import CircularProgress from "@material-ui/core/CircularProgress";

//Material icons
import SportsEsportsIcon from "@material-ui/icons/SportsEsports";
import ConfirmationNumberIcon from "@material-ui/icons/ConfirmationNumber";
import DeleteSweepIcon from "@material-ui/icons/DeleteSweep";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";

// Component styles
import styles from "./styles";

// Service method
import { connect } from "react-redux";
import {
  clear,
  deleteCampaignRequest,
  updateCampaignRequest
} from "../../../../actions/CampaignActions";
import { storage } from "../../../../firebase/index";

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
    padding: theme.spacing(2),
    borderTop: "1px dashed #ffa4a8",
    borderBottom: "1px dashed #ffa4a8"
  }
}))(MuiDialogContent);

const DialogActions = withStyles(theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(1)
  }
}))(MuiDialogActions);

class CampaignCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openCampaign: false,
      openVoucher: false,
      openGame: false,
      remind: false,
      imageCampaign: "",
      valuesCampaign: {
        id: "",
        name: "",
        image: "",
        promo_code: "",
        start_time: new Date(),
        end_time: new Date(),
        description: "",
        count: 0,
        discount: 0,
        games: []
      }
    };
  }

  componentDidMount() {
    const { product } = this.props;

    this.setState({
      imageCampaign: product.image,
      valuesCampaign: {
        id: product.id,
        promo_code: product.promo_code,
        name: product.name,
        image: product.image,
        start_time: new Date(product.start_time),
        end_time: new Date(product.end_time),
        description: product.description,
        count: product.num_of_voucher,
        discount: product.discount,
        games: [...product.games]
      }
    });
  }

  closeInfoGame = () => {
    this.setState({
      openGame: false
    });
  };

  openInfoGame = () => {
    this.setState({
      openGame: true
    });
  };

  closeInfoVoucher = () => {
    this.setState({
      openVoucher: false
    });
  };

  openInfoVoucher = () => {
    this.setState({
      openVoucher: true
    });
  };

  handleClickOpen = () => {
    this.setState({
      openCampaign: true
    });
  };

  handleClose = () => {
    this.props.clear();
    this.setState({
      openCampaign: false
    });
  };

  setNewCampaignStartTime = date => {
    const state = this.state.valuesCampaign;
    state.start_time = date._d;
    this.setState({
      valuesCampaign: { ...state }
    });
  };

  setEndCampaignEndTime = date => {
    const state = this.state.valuesCampaign;
    state.end_time = date._d;
    this.setState({
      valuesCampaign: { ...state }
    });
  };

  handleChangeCampaignName = event => {
    const state = this.state.valuesCampaign;
    state.name = event.target.value;
    this.setState({
      valuesCampaign: { ...state }
    });
  };

  handleChangeDescript = event => {
    const state = this.state.valuesCampaign;
    state.description = event.target.value;
    this.setState({
      valuesCampaign: { ...state }
    });
  };

  handleChangeDiscount = event => {
    const state = this.state.valuesCampaign;
    state.discount = event.target.value;
    this.setState({
      valuesCampaign: { ...state }
    });
  };

  handleImageChange = e => {
    const state = this.state.valuesCampaign;
    state.image = URL.createObjectURL(e.target.files[0]);
    this.setState({
      imageCampaign: e.target.files[0],
      valuesCampaign: { ...state }
    });
  };

  dateToString = date => {
    return `${date.getFullYear()}-${
      date.getMonth() + 1 < 10
        ? "0" + (date.getMonth() + 1)
        : date.getMonth() + 1
    }-${date.getDate() < 10 ? "0" + date.getDate() : date.getDate()}`;
  };

  handleSaveChangeCampaign = () => {
    const { valuesCampaign, imageCampaign } = this.state;
    const token = cookie.load("token");

    const uploadTask = storage
      .ref(`${valuesCampaign.id}/campaigns/${imageCampaign.name}`)
      .put(imageCampaign);

    uploadTask.on(
      "state_changed",
      snapShot => {
        //takes a snap shot of the process as it is happening
      },
      err => {
        this.setState({
          imageCampaign: err
        });
      },
      () => {
        storage
          .ref(`${valuesCampaign.id}/campaigns/`)
          .child(imageCampaign.name)
          .getDownloadURL()
          .then(fireBaseUrl => {
            this.props.doUpdateCampaign(
              valuesCampaign.name,
              fireBaseUrl,
              valuesCampaign.discount,
              valuesCampaign.description,
              this.dateToString(valuesCampaign.start_time),
              this.dateToString(valuesCampaign.end_time),
              token,
              valuesCampaign.id
            );
          });
      }
    );
  };

  handleDeleteCampaign = () => {
    const { valuesCampaign } = this.state;
    const token = cookie.load("token");

    this.props.doDeleteCampaign(token, valuesCampaign.id);
  };

  handleCheckDelete = () => {
    this.setState({
      remind: true
    });
  };

  handleCancelDelete = () => {
    this.setState({
      remind: false
    });
  };

  handleDeleteSuccess = () => {
    this.props.data();
    this.setState({
      openCampaign: false,
      remind: false
    });
  };

  render() {
    const {
      classes,
      product,
      messageError,
      isDeleted,
      isUpdating,
      isSuccessful
    } = this.props;

    const { valuesCampaign, remind } = this.state;

    return (
      <div className={classes.root}>
        <Card className={classes.coupon}>
          <Grid
            container
            direction="row"
            justify="center"
            alignContent="center"
          >
            <Grid item xs={4}>
              <Grid
                container
                direction="column"
                alignItems="center"
                justify="space-around"
                style={{ height: "150px" }}
              >
                <Typography className={classes.campaignName} variant="h6">
                  {product.name}
                </Typography>
                <Grid
                  container
                  direction="row"
                  alignItems="center"
                  justify="center"
                >
                  <IconButton
                    className={classes.icon}
                    onClick={this.openInfoVoucher}
                  >
                    <ConfirmationNumberIcon />
                  </IconButton>
                  <IconButton
                    className={classes.icon}
                    onClick={this.openInfoGame}
                  >
                    <SportsEsportsIcon />
                  </IconButton>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={8}>
              <div
                className={classes.imageWrapper}
                onClick={this.handleClickOpen}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className={classes.image}
                />
              </div>
            </Grid>
          </Grid>
        </Card>
        <Dialog
          fullWidth
          maxWidth={"sm"}
          onClose={isDeleted ? this.handleDeleteSuccess : this.handleClose}
          aria-labelledby="customized-dialog-title"
          open={this.state.openCampaign}
        >
          <DialogTitle
            id="customized-dialog-title"
            onClose={isDeleted ? this.handleDeleteSuccess : this.handleClose}
          >
            {product.name}
          </DialogTitle>
          {remind ? (
            isDeleted ? (
              <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
                style={{ minWidth: 500, minHeight: 200 }}
              >
                <DeleteSweepIcon className={classes.iconDeleted} />
                <Typography className={classes.deleted} variant="h4">
                  Deleted
                </Typography>
              </Grid>
            ) : (
              <Grid
                container
                direction="column"
                justify="center"
                alignItems="center"
                style={{ minWidth: 500, minHeight: 200 }}
              >
                <Grid item>
                  <Typography className={classes.checkTitle}>
                    Are you sure to delete this campaign?
                  </Typography>
                </Grid>
                <Grid item>
                  <Grid
                    container
                    direction="row"
                    justify="space-between"
                    alignItems="center"
                    style={{ minWidth: 200 }}
                  >
                    <Grid item>
                      <Button
                        autoFocus
                        onClick={this.handleCancelDelete}
                        className={classes.cancelButton}
                      >
                        Cancel
                      </Button>
                    </Grid>
                    <Grid item>
                      <Button
                        autoFocus
                        onClick={this.handleDeleteCampaign}
                        className={classes.sureButton}
                      >
                        Sure
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            )
          ) : (
            <>
              <DialogContent className={classes.dialog}>
                <Grid
                  container
                  direction="column"
                  spacing={2}
                  alignContent="center"
                >
                  <Grid item>
                    <div className={classes.displayImage}>
                      <img
                        src={valuesCampaign.image}
                        alt={product.name}
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
                        id={valuesCampaign.id}
                        type="file"
                        onChange={this.handleImageChange}
                      />
                      <label htmlFor={valuesCampaign.id}>
                        <Button component="span" className={classes.upload}>
                          Browse
                        </Button>
                      </label>
                    </div>
                  </Grid>
                  <Grid item>
                    <div className={classes.imageWrapperQR}>
                      <img
                        alt="Product"
                        className={classes.imageQR}
                        src={product.qr_code}
                      />
                    </div>
                  </Grid>
                  <Grid item>
                    <Grid container direction="row" spacing={3}>
                      <Grid item xs={6}>
                        <Paper
                          component="form"
                          className={classes.paper}
                          variant="outlined"
                        >
                          <Typography className={classes.typo}>Name</Typography>
                          <InputBase
                            className={classes.textfield}
                            value={valuesCampaign.name}
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
                            type="text"
                            className={classes.textfield}
                            value={valuesCampaign.promo_code}
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
                          <Typography className={classes.typo}>
                            Discount
                          </Typography>
                          <InputBase
                            className={classes.textfield}
                            value={valuesCampaign.discount}
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
                            value={valuesCampaign.count}
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
                              InputProps={{
                                disableUnderline: true
                              }}
                              format="DD/MM/YYYY"
                              className={classes.textfield}
                              value={valuesCampaign.start_time}
                              onChange={this.setNewCampaignStartTime}
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
                              InputProps={{
                                disableUnderline: true
                              }}
                              format="DD/MM/YYYY"
                              className={classes.textfield}
                              value={valuesCampaign.end_time}
                              onChange={this.setEndCampaignEndTime}
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
                        multiline={true}
                        type="text"
                        className={classes.textfield}
                        value={valuesCampaign.description}
                        onChange={this.handleChangeDescript}
                      />
                    </Paper>
                  </Grid>
                  <Grid item>
                    <Grid
                      container
                      direction="row"
                      justify="space-around"
                      alignItems="center"
                    >
                      {valuesCampaign.games.map((game, index) => {
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
                              spacing={2}
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
                                <Paper
                                  component="form"
                                  className={classes.paper}
                                  variant="outlined"
                                >
                                  <InputBase
                                    className={classes.textfield}
                                    type="number"
                                    value={game.accept_point}
                                    placeholder="Minimum point"
                                  />
                                  <Typography className={classes.point}>
                                    /{game.point} points
                                  </Typography>
                                </Paper>
                              </Grid>
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
                  {isSuccessful ? (
                    <Grid
                      container
                      direction="row"
                      justify="center"
                      alignItems="center"
                    >
                      <CheckCircleIcon className={classes.iconSuccess} />
                      <Typography className={classes.successContent}>
                        Update successful
                      </Typography>
                    </Grid>
                  ) : null}
                  {isUpdating && !messageError && (
                    <div className={classes.progressWrapper}>
                      <CircularProgress className={classes.progress} />
                    </div>
                  )}
                </Grid>
              </DialogContent>
              <DialogActions>
                <Button
                  autoFocus
                  onClick={this.handleCheckDelete}
                  className={classes.button}
                >
                  Remove
                </Button>

                <Button
                  autoFocus
                  onClick={this.handleSaveChangeCampaign}
                  className={classes.button}
                >
                  Save changes
                </Button>
              </DialogActions>
            </>
          )}
        </Dialog>
        <Dialog
          fullWidth
          maxWidth="sm"
          onClose={this.closeInfoVoucher}
          aria-labelledby="customized-dialog-title"
          open={this.state.openVoucher}
        >
          <DialogTitle
            id="customized-dialog-title"
            onClose={this.closeInfoVoucher}
          >
            {valuesCampaign.promo_code}
          </DialogTitle>
          <div>
            <DialogContent>
              <Grid
                container
                direction="column"
                alignContent="center"
                spacing={2}
                justify="center"
              >
                <Grid item>
                  <Typography className={classes.titlePart}>Voucher</Typography>
                </Grid>

                <Grid
                  container
                  direction="column"
                  alignContent="center"
                  justify="center"
                >
                  <Grid item xs={6}>
                    <Paper
                      component="form"
                      className={classes.paper}
                      variant="outlined"
                    >
                      <Typography className={classes.typo}>Code</Typography>
                      <InputBase
                        className={classes.textfield}
                        value={valuesCampaign.promo_code}
                      />
                    </Paper>
                  </Grid>
                </Grid>

                <Grid item xs={12}>
                  <Grid container direction="row" spacing={3}>
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
                          value={valuesCampaign.discount}
                        />
                      </Paper>
                    </Grid>
                    <Grid item xs={6}>
                      <Paper
                        component="form"
                        className={classes.paper}
                        variant="outlined"
                      >
                        <Typography className={classes.typo}>Count</Typography>
                        <InputBase
                          type="number"
                          className={classes.textfield}
                          value={valuesCampaign.count}
                        />
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
                      type="text"
                      multiline={true}
                      className={classes.textfield}
                      value={valuesCampaign.description}
                    />
                  </Paper>
                </Grid>
                {messageError && (
                  <Grid item xs={8}>
                    <Typography className={classes.fieldError} variant="h6">
                      {messageError}
                    </Typography>
                  </Grid>
                )}
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button
                autoFocus
                onClick={this.closeInfoVoucher}
                className={classes.button}
              >
                OK
              </Button>
            </DialogActions>
          </div>
        </Dialog>
        <Dialog
          fullWidth
          maxWidth="sm"
          onClose={this.closeInfoGame}
          aria-labelledby="customized-dialog-title"
          open={this.state.openGame}
        >
          <DialogTitle
            id="customized-dialog-title"
            onClose={this.closeInfoGame}
          >
            {valuesCampaign.promo_code}
          </DialogTitle>
          <div>
            <DialogContent>
              <Grid
                container
                direction="column"
                spacing={2}
                alignContent="center"
              >
                <Grid item>
                  <Typography className={classes.titlePart}>
                    Campaign games
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
                    {valuesCampaign.games.map((game, index) => {
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
                            spacing={2}
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
                              <Paper
                                component="form"
                                className={classes.paper}
                                variant="outlined"
                              >
                                <InputBase
                                  className={classes.textfield}
                                  type="number"
                                  value={game.accept_point}
                                  placeholder="Minimum point"
                                />
                                <Typography className={classes.point}>
                                  /{game.point} points
                                </Typography>
                              </Paper>
                            </Grid>
                          </Grid>
                        </Card>
                      );
                    })}
                  </Grid>
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button
                autoFocus
                onClick={this.closeInfoGame}
                className={classes.button}
              >
                OK
              </Button>
            </DialogActions>
          </div>
        </Dialog>
      </div>
    );
  }
}

CampaignCard.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
  product: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    messageError: state.Campaigns.messageError,
    isDeleted: state.Campaigns.isDeleted,
    isLoading: state.Campaigns.isLoading,
    isUpdating: state.Campaigns.isUpdating,
    isSuccessful: state.Campaigns.isSuccessful
  };
};

const mapDispatchToProps = dispatch => {
  return {
    doDeleteCampaign: (token, id) => {
      dispatch(deleteCampaignRequest(token, id));
    },
    doUpdateCampaign: (
      name,
      image,
      discount,
      description,
      start_time,
      end_time,
      token,
      id
    ) => {
      dispatch(
        updateCampaignRequest(
          name,
          image,
          discount,
          description,
          start_time,
          end_time,
          token,
          id
        )
      );
    },
    clear: () => {
      dispatch(clear());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(CampaignCard));
