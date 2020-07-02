export default theme => ({
    root: {
        maxWidth: "100%",
        paddingTop: theme.spacing.unit,
        paddingBottom: theme.spacing.unit,
        paddingRight: theme.spacing.unit,
        paddingLeft: theme.spacing.unit
    },
    imageWrapper: {
        height: 150,
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    },
    image: {
        maxWidth: "100%",
        maxHeight: "100%",
        borderRadius: "10px"
    },
    details: {},
    title: {
        fontSize: "30px",
        lineHeight: "21px",
        textAlign: "center",
        marginTop: theme.spacing.unit * 2,
        color: "#f27a0c",
        textShadow: "2px 2px 0 #ffffff"
    },
    content: {
        fontSize: "15px",
        lineHeight: "21px",
        textAlign: "center",
        marginTop: theme.spacing.unit * 2,
        color: "#ffffff"
    },

    description: {
        lineHeight: "16px",
        height: theme.spacing.unit * 4,
        overflow: "hidden",
        whiteSpace: "nowrap",
        textOverflow: "ellipsis",
        color: theme.palette.text.secondary,
        textAlign: "center",
        marginTop: theme.spacing.unit,
        marginBottom: theme.spacing.unit * 2
    },
    stats: {
        display: "flex",
        alignItems: "center",
        paddingTop: theme.spacing.unit
    },
    updateIcon: {
        color: "green"
    },
    updateText: {
        marginLeft: theme.spacing.unit,
        color: theme.palette.text.secondary
    },
    downloadsIcon: {
        marginLeft: "auto",
        color: "red"
    },
    downloadsText: {
        marginLeft: theme.spacing.unit,
        color: theme.palette.text.secondary
    },
    row: {
        height: "42px",
        display: "flex",
        alignItems: "center",
        marginTop: theme.spacing.unit
    },
    spacer: {
        flexGrow: 1
    },
    coupon: {
        position: "relative",
        width: "100%",
        height: "100%",
        borderRadius: "10px",
        backgroundColor: "#ffffff",
        padding: "10px",
    },
    button: {
        color: "#62cdd9"
    },
    input: {
        display: "none"
    },
    dialog: {
        // width: "450px"
    },
    productImage: {
        maxWidth: 300,
        maxHeight: "100%",
        borderRadius: "10px"
    },
    displayImage: {
        height: "100%",
        width: '100%',
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    },
    campaignName:{
        fontWeight: 'bold',
        wordWrap: 'break-word',
        width: 100,
        textAlign: 'center'
    },
    upload:{
        color: "#62cdd9",
    },
    icon:{
        color: "#62cdd9",
    },
    imageWrapperQR: {
        height: 150,
        width: 150,
        margin: '0 auto',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    imageQR: {
        width: '100%'
    },
    fieldError: {
        color: theme.palette.danger.main,
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
});
