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
  pagination: {
    marginTop: "24px",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end"
  },
  button: {
    color: "#ffffff",
    backgroundColor: "#62cdd9",
    "&:hover": {
      color: "#ffffff",
      backgroundColor: "#62cdd9"
    }
  },
  upload: {
    color: "#62cdd9",
    backgroundColor: "#ffffff",
    "&:hover": {
      color: "#62cdd9",
      backgroundColor: "#ffffff"
    }
  },
  fieldError: {
    color: theme.palette.danger.main,
    textAlign: "center",
    fontWeight: "bold"
  },
  input: {
    display: "none"
  },
  dialog: {},
  successContent: {
    color: "green",
    marginLeft: theme.spacing(2)
  },
  errorContent: {
    color: "red",
    marginLeft: theme.spacing(2)
  },
  icon: {
    color: "green"
  },
  errorIcon: {
    color: "red"
  },
  paper: {
    display: "flex",
    alignItems: "center",
    width: "auto",
    marginBottom: theme.spacing(1)
  },
  typo: {
    padding: 10,
    fontSize: 11,
    backgroundColor: "#ebebeb",
    textTransform: "uppercase",
    width: 70,
    textAlign: "center"
  },
  textfield: {
    marginLeft: theme.spacing(1),
    flex: 1,
    fontSize: 12
  },
  productImage: {
    maxWidth: "50%",
    maxHeight: "50%",
    borderRadius: "2%"
  },
  displayImage: {
    maxHeight: "50%",
    maxWidth: "80%",
    display: "flex",
    margin: "0 auto",
    justifyContent: "center",
    padding: theme.spacing(2),
    border: "2px dashed #62cdd9",
    borderRadius: "2%",
    objectFit: "scale-down"
  }
});
