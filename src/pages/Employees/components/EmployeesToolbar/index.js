import React, { Component } from 'react';

// Externals
import PropTypes from 'prop-types';
import classNames from 'classnames';

// Material helpers
import { withStyles } from '@material-ui/core';

// Material components
import { Button, IconButton } from '@material-ui/core';

// Material icons
import {
  Add,
  Delete as DeleteIcon
} from '@material-ui/icons';

// Shared components
import { SearchInput } from '../../../../components';

// Component styles
import styles from './styles';

class EmployeesToolbar extends Component {
  render() {
    const { classes, className, selectedUsers , onNewEmployee, handleDeleteUsers} = this.props;

    const rootClassName = classNames(classes.root, className);

    return (
      <div className={rootClassName}>
        <div className={classes.row}>
          <SearchInput
            className={classes.searchInput}
            placeholder="Search employee"
          />
          <span className={classes.spacer} />
          {selectedUsers.length > 0 && (
              <IconButton
                  className={classes.deleteButton}
                  onClick={handleDeleteUsers}
              >
                <DeleteIcon />
              </IconButton>
          )}
          <Button
              variant="contained"
              className={classes.button}
              startIcon={<Add />}
              onClick={onNewEmployee}
          >
            Add
          </Button>

        </div>
      </div>
    );
  }
}

EmployeesToolbar.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
  selectedUsers: PropTypes.array
};

EmployeesToolbar.defaultProps = {
  selectedUsers: []
};

export default withStyles(styles)(EmployeesToolbar);
