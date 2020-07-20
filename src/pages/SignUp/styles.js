export default theme => ({
  root: {
    backgroundColor: "#ffffff",
    borderRadius: "10px",
    position: "absolute",
    width: "70%",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    transition: "transform 300ms, box-shadow 300ms",
    boxShadow: "5px 10px 10px rgba(2, 128, 144, 0.2)"
  },
  grid: {
    height: "100%"
  },
  title: {
    marginBottom: theme.spacing(5)
  },
  subtitle: {
    color: "#ffffff",
    marginTop: theme.spacing(0.5),
    fontFamily: "Pacifico"
  },
  fields: {
    marginTop: theme.spacing(1)
  },
  textField: {
    width: "35ch"
  },
  signUpButton: {
    marginTop: theme.spacing(2),
    backgroundColor: "#ffa8a4",
    color: "#ffffff",
    width: "30ch",
    borderRadius: "50px",
    "&:hover": {
      backgroundColor: "#ffa8a4",
      color: "#ffffff"
    }
  },
  signIn: {
    marginTop: theme.spacing(2),
    color: theme.palette.text.secondary
  },
  signInUrl: {
    color: "#ffa8a4",
    fontWeight: "bold",
    "&:hover": {
      color: "#ffa8a4"
    }
  },
  fieldError: {
    color: theme.palette.danger.main
  },
  submitError: {
    color: theme.palette.danger.main,
    alignText: "center",
    marginBottom: theme.spacing(1),
    marginTop: theme.spacing(2),
    textAlign: "center",
    fontWeight: "bold"
  },
  progress: {
    display: "block",
    marginTop: theme.spacing(2),
    marginLeft: "auto",
    marginRight: "auto",
    color: "#ffa8a4"
  }
});
