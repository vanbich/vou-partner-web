import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import CheckCircleOutlinedIcon from "@material-ui/icons/CheckCircleOutlined";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/styles";
import { green } from "../../common/colors";

const useStyle = makeStyles(theme => ({
    root:{
      margin: theme.spacing(5)
    },
  content: {
    color: green,
    marginLeft: theme.spacing(2)
  },
  icon: {
    color: green
  }
}));

export default function AlertDialog() {
  const classes = useStyle();
  const [open, setOpen] = React.useState(true);
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent className={classes.root}>
          <Grid
            container
            direction="row"
            justify="space-between"
            alignContent="center"
          >
            <CheckCircleOutlinedIcon className={classes.icon} />
            <Typography className={classes.content} variant="h4">
              Successful
            </Typography>
          </Grid>
        </DialogContent>
      </Dialog>
    </div>
  );
}
