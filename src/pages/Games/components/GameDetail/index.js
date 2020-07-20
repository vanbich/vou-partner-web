import React from "react";
import Button from "@material-ui/core/Button";
import Draggable from "react-draggable";

//Material components
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

//Material icons
import ArrowRightAltIcon from "@material-ui/icons/ArrowRightAlt";

function PaperComponent(props) {
  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  );
}

export default function GameDetail(props) {
  const { title, avatar, discript, points } = props;
  const [isOpen, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <IconButton onClick={handleClickOpen}>
        <ArrowRightAltIcon />
      </IconButton>
      <Dialog
        open={isOpen}
        onClose={handleClose}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
          {title}
        </DialogTitle>
        <DialogContent>
          <Grid
            container
            direction="row"
            alignItems="center"
            justify="space-around"
          >
            <Grid item xs={6}>
              <div
                style={{
                  height: "64px",
                  width: "64px",
                  margin: "0 auto",
                  border: "1px solid #EDF0F2",
                  borderRadius: "50%",
                  overflow: "hidden",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <img alt="Game" style={{ width: "100%" }} src={avatar} />
              </div>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="h6">Point: {points}</Typography>
              <Typography variant="h6">Rules: {discript}</Typography>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
