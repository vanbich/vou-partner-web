export default theme => ({
    root: {
        maxWidth: "100%",
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(1),
        paddingRight: theme.spacing(1),
        paddingLeft: theme.spacing(1)
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
        marginTop: theme.spacing(2),
        color: "#f27a0c",
        textShadow: "2px 2px 0 #ffffff"
    },
    content: {
        fontSize: "15px",
        lineHeight: "21px",
        textAlign: "center",
        marginTop: theme.spacing(2),
        color: "#ffffff"
    },

    description: {
        lineHeight: "16px",
        height: theme.spacing(4),
        overflow: "hidden",
        whiteSpace: "nowrap",
        textOverflow: "ellipsis",
        color: theme.palette.text.secondary,
        textAlign: "center",
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(2)
    },
    stats: {
        display: "flex",
        alignItems: "center",
        paddingTop: theme.spacing(1)
    },
    updateIcon: {
        color: "green"
    },
    updateText: {
        marginLeft: theme.spacing(1),
        color: theme.palette.text.secondary
    },
    downloadsIcon: {
        marginLeft: "auto",
        color: "red"
    },
    downloadsText: {
        marginLeft: theme.spacing(1),
        color: theme.palette.text.secondary
    },
    row: {
        height: "42px",
        display: "flex",
        alignItems: "center",
        marginTop: theme.spacing(1)
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
        color: "#ffa4a8"
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
        color: "#ffa4a8",
    },
    icon:{
        color: "#ffa4a8",
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
        marginLeft: theme.spacing(1),
        flex: 1,
        fontSize: 12,
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
    point: {
        padding: 10,
        fontSize: 11,
        backgroundColor: "#ebebeb",
        textTransform: "uppercase",
        textAlign: "center",
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
    deleted:{
        color: "red",
        marginLeft: theme.spacing(2)
    },
    iconDeleted:{
        color: "red",
        width: 50,
        height: 50
    },
    titlePart: {
        fontSize: 14,
        color: "#000",
        textTransform: "uppercase",
        textAlign: "center",
        fontWeight: 'bold',
        marginBottom: theme.spacing(1)
    },
});
