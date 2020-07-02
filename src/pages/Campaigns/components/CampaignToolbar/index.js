import React, { Component } from 'react';

// Externals
import PropTypes from 'prop-types';

// Material helpers
import { withStyles } from '@material-ui/core';

// Material components
import { Button } from '@material-ui/core';

// Material icons
import {Add} from "@material-ui/icons";

// Shared components
import { SearchInput } from '../../../../components';

// Component styles
import styles from './styles';


class CampaignToolbar extends Component {
    constructor(props){
        super(props);
        this.wrapper = React.createRef();
    }
    render() {
        const { classes ,onNewItem} = this.props;
        return (
            <div className={classes.root} ref={this.wrapper}>
                <div className={classes.row}>
                    <SearchInput
                        className={classes.searchInput}
                        placeholder="Search campaign"
                    />
                    <span className={classes.spacer} />
                    <Button
                        variant="contained"
                        className={classes.button}
                        startIcon={<Add />}
                        onClick={onNewItem}
                    >
                        New
                    </Button>
                </div>
            </div>
        );
    }
}

CampaignToolbar.propTypes = {
    className: PropTypes.string,
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CampaignToolbar);
