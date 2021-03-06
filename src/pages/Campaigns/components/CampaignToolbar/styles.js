export default theme => ({
    root: {},
    row: {
        height: '42px',
        display: 'flex',
        alignItems: 'center',
        marginTop: theme.spacing(1)
    },
    spacer: {
        flexGrow: 1
    },
    searchInput: {
        marginRight: theme.spacing(1)
    },
    button:{
        backgroundColor: "#ffa4a8",
        color: "#ffffff",
        '&:hover':{
            backgroundColor: "#ffa4a8",
            color: "#ffffff",
        }
    },
});
