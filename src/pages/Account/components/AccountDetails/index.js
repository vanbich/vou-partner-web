import React from "react";

// Material components
import { TextField, Typography } from "@material-ui/core";
import FaceIcon from "@material-ui/icons/Face";

// Shared components
import {
  Portlet,
  PortletHeader,
  PortletLabel,
  PortletContent,
} from "../../../../components";

// Component styles
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/styles";

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
  }
}));

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
                <TextField
                  className={classes.textField}
                  label="Display name"
                  defaultValue={display_name}
                  variant="outlined"
                  onChange={event => displayChange(event)}
                />
                {showDisplayErr && (
                  <Typography className={classes.fieldError} variant="body2">
                    {errors.display_name[0]}
                  </Typography>
                )}
              </Grid>
              <Grid item xs={4}>
                <TextField
                  className={classes.textField}
                  label="Email Address"
                  defaultValue={email}
                  variant="outlined"
                  onChange={event => emailChange(event)}
                />
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
                <TextField
                  className={classes.textField}
                  label="Address"
                  defaultValue={address}
                  variant="outlined"
                  onChange={event => addressChange(event)}
                />
                {showAddressError && (
                  <Typography className={classes.fieldError} variant="body2">
                    {errors.address[0]}
                  </Typography>
                )}
              </Grid>

              <Grid item xs={4}>
                <TextField
                  className={classes.textField}
                  label="Phone Number"
                  defaultValue={phone}
                  variant="outlined"
                  onChange={event => phoneChange(event)}
                />
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
