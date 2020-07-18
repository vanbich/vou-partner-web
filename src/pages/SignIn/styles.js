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
  quoteWrapper: {
    [theme.breakpoints.down("md")]: {
      display: "none"
    }
  },
  quote: {
    backgroundColor: theme.palette.common.neutral,
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundImage: "url(/images/banners/login.png)",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center"
  },
  quoteInner: {
    textAlign: "center",
    flexBasis: "600px"
  },
  quoteText: {
    color: theme.palette.common.white,
    fontWeight: 300
  },
  name: {
    marginTop: theme.spacing(3),
    color: theme.palette.common.white
  },
  bio: {
    color: theme.palette.common.white
  },
  contentWrapper: {},
  content: {
    height: "100%",
    display: "flex",
    flexDirection: "column"
  },
  contentHeader: {
    display: "flex",
    alignItems: "center",
    paddingTop: theme.spacing(5),
    paddingBototm: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2)
  },
  backButton: {},
  logoImage: {
    marginLeft: theme.spacing(4)
  },
  contentBody: {
    flexGrow: 1,
    display: "flex",
    alignItems: "center",
    [theme.breakpoints.down("md")]: {
      justifyContent: "center"
    }
  },
  form: {
    paddingLeft: "100px",
    paddingRight: "100px",
    paddingBottom: "125px",
    flexBasis: "700px",
    [theme.breakpoints.down("sm")]: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2)
    }
  },
  title: {
    marginBottom: theme.spacing(5),
  },
  subtitle: {
    color: "#ffffff",
    marginTop: theme.spacing(0.5),
    fontFamily: "Pacifico"
  },
  sugestion: {
    color: theme.palette.text.secondary,
    marginTop: theme.spacing(2),
    textAlign: "center"
  },
  fields: {
    marginTop: theme.spacing(1)
  },
  textField: {
    width: "35ch",

  },
  policy: {
    display: "flex",
    alignItems: "center"
  },
  policyCheckbox: {
    marginLeft: "-14px"
  },
  policyText: {
    display: "inline",
    color: theme.palette.text.secondary
  },
  policyUrl: {
    color: theme.palette.text.primary,
    "&:hover": {
      cursor: "pointer",
      color: theme.palette.primary.main
    }
  },
  progress: {
    display: "block",
    marginTop: theme.spacing(2),
    marginLeft: "auto",
    marginRight: "auto",
    color: "#ffa8a4"
  },
  signInButton: {
    marginTop: theme.spacing(2),
    backgroundColor: "#ffa8a4",
    color: "#ffffff",
    width: "30ch",
    borderRadius: 50,
    '&:hover': {
      backgroundColor: "#ffa8a4",
      color: "#ffffff",
    }
  },
  signUp: {
    marginTop: theme.spacing(2),
    color: theme.palette.text.secondary
  },
  signUpUrl: {
    color: "#ffa8a4",
    fontWeight: "bold",
    "&:hover": {
      color: "#ffa8a4"
    }
  },
  fieldError: {
    color: theme.palette.danger.main,
  },
  submitError: {
    color: theme.palette.danger.main,
    alignText: "center",
    marginBottom: theme.spacing(1),
    marginTop: theme.spacing(2),
    textAlign: 'center',
    fontWeight: 'bold'
  },
  forgotContainer: {
    marginTop: theme.spacing(4),
  },
  forgot: {
    color: "#299ebf",
    fontSize: 13,
  }
});
