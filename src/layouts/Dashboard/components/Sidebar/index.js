import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";

// Externals
import classNames from "classnames";
import PropTypes from "prop-types";

// Material helpers
import { withStyles } from "@material-ui/core";

//Service methods
import { connect } from "react-redux";

// Material components
import {
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Grid
} from "@material-ui/core";

// Material icons
import {
  DashboardOutlined as DashboardIcon,
  // AccountBoxOutlined as AccountBoxIcon,
} from "@material-ui/icons";
// import SportsEsportsIcon from "@material-ui/icons/SportsEsports";
// import ConfirmationNumberIcon from "@material-ui/icons/ConfirmationNumber";
// import GroupAddIcon from "@material-ui/icons/GroupAdd";

// Component styles
import styles from "./styles";

class Sidebar extends Component {
  constructor(props) {
    super(props);

    this.wrapper = React.createRef();
  }

  render() {
    const { classes, className, username, avatar } = this.props;
    const rootClassName = classNames(classes.root, className);

    return (
      <nav className={rootClassName} ref={this.wrapper}>
        <div className={classes.logoWrapper}>
          <Grid
            container
            direction="row"
            justify="space-around"
            alignItems="center"
            item
            xs={6}
          >
            <Link className={classes.logoLink} to="/">
              <img
                alt="Brainalytica logo"
                className={classes.logoImage}
                src="/images/logos/vou-50px.png"
              />
            </Link>
            <Typography
              variant="h1"
              style={{
                marginTop: "10px",
                fontFamily: "Francisco",
                textAlign: "center",
                fontWeight: "bold",
                color: "#ffa8a4"
              }}
            >
              Vou
            </Typography>
          </Grid>
        </div>
        <Divider className={classes.logoDivider} />
        <div className={classes.profile}>
          <Link to="/account">
            <Avatar
              alt="Roman Kutepov"
              className={classes.avatar}
              src={avatar ? avatar : "/images/avatars/avatar_1.png"}
            />
          </Link>
          <Typography className={classes.nameText} variant="h6">
            {username}
          </Typography>
        </div>
        <Divider className={classes.profileDivider} />
        <List component="div" disablePadding ref={this.wrapper}>
          <ListItem
              activeClassName={classes.activeListItem}
              className={classes.listItem}
              component={NavLink}
              to="/dashboard"
          >
            <ListItemIcon className={classes.listItemIcon}>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText
                classes={{ primary: classes.listItemText }}
                primary="Dashboard"
            />
          </ListItem>

          {/*<ListItem*/}
          {/*  component={NavLink}*/}
          {/*  to="/campaigns"*/}
          {/*  className={classes.listItem}*/}
          {/*  activeclassname={classes.activeListItem}*/}
          {/*>*/}
          {/*  <ListItemIcon className={classes.listItemIcon}>*/}
          {/*    <ConfirmationNumberIcon />*/}
          {/*  </ListItemIcon>*/}
          {/*  <ListItemText*/}
          {/*    classes={{ primary: classes.listItemText }}*/}
          {/*    primary="Campaigns"*/}
          {/*  />*/}
          {/*</ListItem>*/}
          {/*<ListItem*/}
          {/*  activeclassname={classes.activeListItem}*/}
          {/*  className={classes.listItem}*/}
          {/*  component={NavLink}*/}
          {/*  to="/games"*/}
          {/*>*/}
          {/*  <ListItemIcon className={classes.listItemIcon}>*/}
          {/*    <SportsEsportsIcon />*/}
          {/*  </ListItemIcon>*/}
          {/*  <ListItemText*/}
          {/*    classes={{ primary: classes.listItemText }}*/}
          {/*    primary="Games"*/}
          {/*  />*/}
          {/*</ListItem>*/}
          {/*<ListItem*/}
          {/*  component={NavLink}*/}
          {/*  to="/employee"*/}
          {/*  activeclassname={classes.activeListItem}*/}
          {/*  className={classes.listItem}*/}
          {/*>*/}
          {/*  <ListItemIcon className={classes.listItemIcon}>*/}
          {/*    <GroupAddIcon />*/}
          {/*  </ListItemIcon>*/}
          {/*  <ListItemText*/}
          {/*    classes={{ primary: classes.listItemText }}*/}
          {/*    primary="Employee"*/}
          {/*  />*/}
          {/*</ListItem>*/}
          {/*<ListItem*/}
          {/*  component={NavLink}*/}
          {/*  to="/account"*/}
          {/*  className={classes.listItem}*/}
          {/*  activeclassname={classes.activeListItem}*/}
          {/*>*/}
          {/*  <ListItemIcon className={classes.listItemIcon}>*/}
          {/*    <AccountBoxIcon />*/}
          {/*  </ListItemIcon>*/}
          {/*  <ListItemText*/}
          {/*    classes={{ primary: classes.listItemText }}*/}
          {/*    primary="Account"*/}
          {/*  />*/}
          {/*</ListItem>*/}
        </List>
      </nav>
    );
  }
}

Sidebar.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    token: state.Authentication.token,
    username: state.User.username,
    avatar: state.User.avatar
  };
};

const mapDispatchToProps = () => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Sidebar));
