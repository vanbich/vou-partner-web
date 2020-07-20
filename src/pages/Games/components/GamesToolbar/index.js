import React, { Component } from 'react';

// Externals
import PropTypes from 'prop-types';
import classNames from 'classnames';

// Material helpers
import { withStyles } from '@material-ui/core';

// Shared components
import { SearchInput } from '../../../../components';

// Component styles
import styles from './styles';

class GamesToolbar extends Component {
  render() {
    const { classes, className } = this.props;

    const rootClassName = classNames(classes.root, className);

    return (
      <div className={rootClassName}>
        <div className={classes.row}>
          <SearchInput
            className={classes.searchInput}
            placeholder="Search game"
          />
          <span className={classes.spacer} />

        </div>
      </div>
    );
  }
}

GamesToolbar.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(GamesToolbar);
