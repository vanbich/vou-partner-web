export default theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  },
  progressWrapper: {
    paddingTop: '48px',
    paddingBottom: '24px',
    display: 'flex',
    justifyContent: 'center'
  },
  paper: {
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
    textAlign: 'center',
  },
  textfield: {
    width: 300,
    maxWidth: "100%",
  },
  button: {
    color: "#ffffff",
    backgroundColor: "#9bc3f2",
    "&:hover": {
      color: "#ffffff",
      backgroundColor: "#9bc3f2"
    }
  },
});
