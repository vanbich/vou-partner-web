export default theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  },
  progressWrapper: {
    paddingTop: "48px",
    paddingBottom: "24px",
    display: "flex",
    justifyContent: "center"
  },
  typo: {
    textTransform: "uppercase",
    minWidth: 100,
    textAlign: "center"
  },
  textfield: {
    width: 300,
    maxWidth: "100%"
  },
  button: {
    color: "#ffffff",
    backgroundColor: "#9bc3f2",
    "&:hover": {
      color: "#ffffff",
      backgroundColor: "#9bc3f2"
    }
  },
  fieldError: {
    color: theme.palette.danger.main,
    textAlign: "center",
    fontWeight: "bold",
    marginLeft: theme.spacing(4)
  },
  icon: {
    color: "green",
    width: 50,
    height: 50
  },
  deleted: {
    color: "red",
    marginLeft: theme.spacing(2)
  },
  iconDeleted: {
    color: "red",
    width: 50,
    height: 50
  }
});
