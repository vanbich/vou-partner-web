export default theme => ({
    root: {
        padding: theme.spacing.unit * 3
    },
    content: {
        marginTop: theme.spacing.unit * 2
    },
    progressWrapper: {
        paddingTop: '48px',
        paddingBottom: '24px',
        display: 'flex',
        justifyContent: 'center'
    },
    pagination: {
        marginTop: '24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    button:{
        color: "#ffffff",
        backgroundColor: "#62cdd9",
        '&:hover':{
            color: "#ffffff",
            backgroundColor: "#62cdd9",
        }
    },
    upload:{
        color: "#62cdd9",
        backgroundColor: "#ffffff",
        '&:hover':{
            color: "#62cdd9",
            backgroundColor: "#ffffff",
        }
    },
    fieldError: {
        color: theme.palette.danger.main,
        textAlign: 'center',
        fontWeight: 'bold'
    },
    input: {
        display: 'none',
    },
    dialog:{
    },
    successContent: {
        color: "green",
        marginLeft: theme.spacing.unit * 2
    },
    icon: {
        color: "green"
    },
    paper: {
        display: "flex",
        alignItems: "center",
        width: "auto",
        marginBottom: theme.spacing.unit
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
        marginLeft: theme.spacing.unit,
        flex: 1,
        fontSize: 12,
    },
    productImage: {
        maxWidth: "100%",
        maxHeight: "100%",
        borderRadius: "10px"
    },
    displayImage: {
        height: "120px",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    },
});
