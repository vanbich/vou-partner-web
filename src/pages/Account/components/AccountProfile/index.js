import React from "react";

// Material components
import { Avatar, Typography, Grid } from "@material-ui/core";

// Shared components
import { Portlet, PortletContent, PortletFooter } from "../../../../components";

// Component styles
import { makeStyles } from "@material-ui/styles";
import IconButton from "@material-ui/core/IconButton";
import { PhotoCamera } from "@material-ui/icons";

const useStyle = makeStyles(them => ({
  root: {},
  details: {
    display: "flex"
  },
  info: {
    textAlign: "center"
  },
  locationText: {
    marginTop: them.spacing(1),
    color: them.palette.text.secondary
  },
  dateText: {
    color: them.palette.text.secondary
  },
  avatar: {
    marginLeft: "auto",
    height: "110px",
    width: "110px",
    flexShrink: 0,
    flexGrow: 0
  },
  progressWrapper: {
    marginTop: them.spacing(2)
  },
  uploadButton: {
    marginRight: them.spacing(2),
    color: "#ffc5bd"
  },
  input: {
    display: "none"
  },
  upload:{
    color: "#ffc5bd"
  }
}));

function AccountProfile(props) {
  const classes = useStyle();
  const { username, avatar, onChangeAvatar, ...rest } = props;

  return (
    <Portlet {...rest} className={classes.root}>
      <PortletContent>
        <div className={classes.details}>
          <Grid container direction="column" alignContent="center" justify="center" spacing={2}>
            <Grid item>
              <Avatar
                className={classes.avatar}
                src={avatar ? avatar : "/images/avatars/avatar_1.png"}
              />
            </Grid>
            <Grid item>
              <Typography variant="h6" className={classes.info}>{username}</Typography>
            </Grid>
          </Grid>
        </div>
      </PortletContent>
      <PortletFooter>
        <Grid container justify="center" alignItems="center">
          <input
            accept="image/*"
            className={classes.input}
            id="icon-button-file"
            type="file"
            onChange={(event)=>{onChangeAvatar(event)}}
          />
          <label htmlFor="icon-button-file">
            <IconButton
              aria-label="upload picture"
              component="span"
              className={classes.upload}
            >
              <PhotoCamera />
            </IconButton>
          </label>
        </Grid>
      </PortletFooter>
    </Portlet>
  );
}

export default AccountProfile;
