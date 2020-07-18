import React from "react";

// Material components
import {fade, Typography, withStyles} from "@material-ui/core";
import FaceIcon from "@material-ui/icons/Face";
import InputBase from "@material-ui/core/InputBase/InputBase";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/styles";

// Shared components
import {
  Portlet,
  PortletHeader,
  PortletLabel,
  PortletContent,
} from "../../../../components";
import InputLabel from "@material-ui/core/InputLabel/InputLabel";

const useStyle = makeStyles(them => ({
  root: {},
  field: {
    margin: them.spacing(3)
  },
  textField: {
    width: "420px",
    maxWidth: "100%",
    marginRight: them.spacing(3)
  },
  portletFooter: {
    paddingLeft: them.spacing(3),
    paddingRight: them.spacing(3),
    paddingTop: them.spacing(2),
    paddingBottom: them.spacing(2)
  },
  fieldError: {
    color: them.palette.danger.main
  },
  typo: {
    textTransform: "uppercase",
  },
}));

const BootstrapInput = withStyles(theme => ({
  root: {
    "label + &": {
      marginTop: theme.spacing(3)
    }
  },
  input: {
    borderRadius: 4,
    position: "relative",
    backgroundColor: theme.palette.common.white,
    border: "1px solid #ced4da",
    fontSize: 13,
    width: "auto",
    padding: "10px 12px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      "Roboto",
    ].join(","),
    "&:focus": {
      boxShadow: `${fade("#9bc3f2", 0.25)} 0 0 0 0.2rem`,
      borderColor: theme.palette.primary.main
    }
  }
}))(InputBase);

function Account(props) {
  const classes = useStyle();
  const {
    display_name,
    address,
    phone,
    email,
    displayChange,
    emailChange,
    addressChange,
    phoneChange,
    showDisplayErr,
    showEmailError,
    errors,
    showAddressError,
    showPhoneError,
    ...rest
  } = props;

  return (
    <Portlet {...rest} className={classes.root}>
      <PortletHeader>
        <Grid
          container
          direction="row"
          justify="flex-start"
          alignItems="flex-start"
        >
          <FaceIcon style={{ color: "#ffa8a4" }} />
          <PortletLabel title="Profile" />
        </Grid>
      </PortletHeader>
      <PortletContent noPadding>
        <form autoComplete="off" noValidate>
          <div className={classes.field}>
            <Grid
              container
              direction="row"
              justify="space-around"
              alignItems="center"
            >
              <Grid item xs={4}>
                <Grid
                    container
                    direction="column"
                    alignItems="flex-start"
                >
                  <Grid item>
                    <InputLabel
                        shrink
                        htmlFor="bootstrap-input"
                        className={classes.typo}
                    >
                      NAME
                    </InputLabel>
                  </Grid>
                  <Grid item>
                    <BootstrapInput
                        id="bootstrap-input"
                        onChange={event => displayChange(event)}
                        value={display_name}
                    />
                  </Grid>
                </Grid>

                {showDisplayErr && (
                  <Typography className={classes.fieldError} variant="body2">
                    {errors.display_name[0]}
                  </Typography>
                )}
              </Grid>
              <Grid item xs={4}>
                <Grid
                    container
                    direction="column"
                    alignItems="flex-start"
                >
                  <Grid item>
                    <InputLabel
                        shrink
                        htmlFor="bootstrap-input"
                        className={classes.typo}
                    >
                      EMAIL
                    </InputLabel>
                  </Grid>
                  <Grid item>
                    <BootstrapInput
                        id="bootstrap-input"
                        onChange={event => emailChange(event)}
                        value={email}
                    />
                  </Grid>
                </Grid>
                {showEmailError && (
                  <Typography className={classes.fieldError} variant="body2">
                    {errors.email[0]}
                  </Typography>
                )}
              </Grid>
            </Grid>
          </div>
          <div className={classes.field}>
            <Grid
              container
              direction="row"
              justify="space-around"
              alignItems="center"
            >
              <Grid item xs={4}>
                <Grid
                    container
                    direction="column"
                    alignItems="flex-start"
                >
                  <Grid item>
                    <InputLabel
                        shrink
                        htmlFor="bootstrap-input"
                        className={classes.typo}
                    >
                      ADDRESS
                    </InputLabel>
                  </Grid>
                  <Grid item>
                    <BootstrapInput
                        id="bootstrap-input"
                        onChange={event => addressChange(event)}
                        value={address}
                    />
                  </Grid>
                </Grid>
                {showAddressError && (
                  <Typography className={classes.fieldError} variant="body2">
                    {errors.address[0]}
                  </Typography>
                )}
              </Grid>

              <Grid item xs={4}>
                <Grid
                    container
                    direction="column"
                    alignItems="flex-start"
                >
                  <Grid item>
                    <InputLabel
                        shrink
                        htmlFor="bootstrap-input"
                        className={classes.typo}
                    >
                      PHONE
                    </InputLabel>
                  </Grid>
                  <Grid item>
                    <BootstrapInput
                        id="bootstrap-input"
                        onChange={event => phoneChange(event)}
                        value={phone}
                    />
                  </Grid>
                </Grid>
                {showPhoneError && (
                  <Typography className={classes.fieldError} variant="body2">
                    {errors.phone[0]}
                  </Typography>
                )}
              </Grid>
            </Grid>
          </div>
        </form>
      </PortletContent>
    </Portlet>
  );
}

export default Account;
