export default theme => ({
  root: {},
  tableRow: {
    height: '64px'
  },
  tableCell: {
    whiteSpace: 'nowrap'
  },
  tableCellInner: {
    display: 'flex',
    alignItems: 'center'
  },
  avatar: {
    backgroundColor: "#80b7f2",
    display: 'inline-flex',
    fontSize: '14px',
    fontWeight: 500,
    height: '36px',
    width: '36px'
  },
  nameText: {
    display: 'inline-block',
    marginLeft: theme.spacing(2),
    fontWeight: 500,
    cursor: 'pointer'
  },
  icon: {
    color: 'green'
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
    iconSuccess: {
        color: "green",
        width: 50,
        height: 50
    }
});
