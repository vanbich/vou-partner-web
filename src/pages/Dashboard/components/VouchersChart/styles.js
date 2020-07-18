export default theme => ({
  root: {},
  chartWrapper: {
    minWidth: "145vh",
    width: "100%",
    height: "50vh",
  },
  portletFooter: {
    display: 'flex',
    justifyContent: 'flex-end'
  },
  paper: {
    display: "flex",
    alignItems: "center",
    maxHeight: 30,
  },
  typo: {
    padding: theme.spacing(2),
    fontSize: 12,
    textTransform: "uppercase",
    textAlign: "center",
  },
  textfield: {
    fontSize: 12,
    textAlign: "center",
  },
  button: {
    color: "#ffa8a4",
  },
  progressWrapper:{
    paddingTop: "48px",
    paddingBottom: "24px",
    display: "flex",
    justifyContent: "center"
  },
  progress:{
    color: "orange"
  }
});
