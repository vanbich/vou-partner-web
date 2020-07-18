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
  progress: {
   color: "#ffa4a8",
  },
  pagination: {
    marginTop: "24px",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end"
  },
  button: {
    color: "#ffffff",
    backgroundColor: "#ffa4a8",
    "&:hover": {
      color: "#ffffff",
      backgroundColor: "#ffa4a8"
    }
  },
  upload: {
    color: "#ffa4a8",
    backgroundColor: "#ffffff",
    "&:hover": {
      color: "#ffa4a8",
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
    color: "green",
    width: 50,
    height: 50
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
    textAlign: "center",
    minWidth: 70
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
    minWidth: 400,
    minHeight: 100,
    display: "flex",
    margin: "0 auto",
    justifyContent: "center",
    padding: theme.spacing(2),
    border: "1px dashed #ffa4a8",
    borderRadius: "2%",
    objectFit: "scale-down"
  },
  logoWrapper: {
    height: 50,
    width: 50,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    objectFit: "scale-down"
  },
  logo: {
    maxWidth: "100%",
    maxHeight: "100%",
  },
  cardGame:{
    width: '30%',
    padding: theme.spacing(1)
  },
  gameTitle:{
    fontSize: 11,
    textTransform: "uppercase",
    textAlign: "center"
  },
  titlePart: {
    fontSize: 14,
    color: "#000",
    textTransform: "uppercase",
    textAlign: "center",
    fontWeight: 'bold'
  },
  point: {
    padding: 10,
    fontSize: 11,
    backgroundColor: "#ebebeb",
    textTransform: "uppercase",
    textAlign: "center",
  },
});
