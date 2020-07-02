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
        backgroundColor: "#62cdd9",
        color: "#ffffff",
        '&:hover':{
            backgroundColor: "#62cdd9",
            color: "#ffffff",
        }
    },
});
