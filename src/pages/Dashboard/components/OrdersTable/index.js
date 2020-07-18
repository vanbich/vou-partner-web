import React, { Component } from "react";

// Externals
import classNames from "classnames";
import moment from "moment";
import PerfectScrollbar from "react-perfect-scrollbar";
import PropTypes from "prop-types";

// Material helpers
import { withStyles } from "@material-ui/core";

// Material components
import {
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  InputBase
} from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

// Shared services
import { getOrders } from "../../../../services/order";

// Shared components
import {
  Portlet,
  PortletHeader,
  PortletLabel,
  PortletToolbar,
  PortletContent,
  Status
} from "../../../../components";

// Component styles
import styles from "./styles";

const statusColors = {
  delivered: "success",
  pending: "info",
  refund: "danger"
};

const BootstrapInput = withStyles(theme => ({
  root: {
    "label + &": {
      marginTop: theme.spacing(3)
    }
  },
  input: {
    borderRadius: 4,
    textTransform: "uppercase",
    fontWeight: "bold",
    position: "relative",
    backgroundColor: theme.palette.background.paper,
    fontSize: 13,
    padding: "10px 26px 10px 12px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"'
    ].join(","),
    "&:focus": {
      borderRadius: 4,
      borderColor: "#80bdff"
    }
  }
}))(InputBase);

class OrdersTable extends Component {
  signal = false;

  state = {
    isLoading: false,
    limit: 10,
    orders: [],
    ordersTotal: 0
  };

  async getOrders(limit) {
    try {
      this.setState({ isLoading: true });

      const { orders, ordersTotal } = await getOrders(limit);

      if (this.signal) {
        this.setState({
          isLoading: false,
          orders,
          ordersTotal
        });
      }
    } catch (error) {
      if (this.signal) {
        this.setState({
          isLoading: false,
          error
        });
      }
    }
  }

  componentDidMount() {
    this.signal = true;

    const { limit } = this.state;

    this.getOrders(limit);
  }

  componentWillUnmount() {
    this.signal = false;
  }

  render() {
    const { classes, className } = this.props;
    const { isLoading, orders } = this.state;

    const rootClassName = classNames(classes.root, className);
    const showOrders = !isLoading && orders.length > 0;

    return (
      <Portlet className={rootClassName}>
        <PortletHeader noDivider>
          <PortletLabel title="# ON TOP" />
          <PortletToolbar>
            <FormControl style={{ flex: 1 }}>
              <Select
                labelId="demo-customized-select-label"
                id="demo-customized-select"
                defaultValue={5}
                // value={receiverAddress}
                // onChange={this.handleChangeAddressReceiver}
                input={<BootstrapInput />}
              >
                <MenuItem value={5}>Top 5</MenuItem>
                <MenuItem value={10}>Top 10</MenuItem>
              </Select>
            </FormControl>
          </PortletToolbar>
        </PortletHeader>
        <PerfectScrollbar>
          <PortletContent className={classes.portletContent} noPadding>
            {isLoading && (
              <div className={classes.progressWrapper}>
                <CircularProgress />
              </div>
            )}
            {showOrders && (
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell align="center">Top</TableCell>
                    <TableCell align="center">Name</TableCell>
                    <TableCell align="center">Code</TableCell>
                    <TableCell align="center">Numbers</TableCell>
                    <TableCell align="center">Users</TableCell>
                    <TableCell align="center">Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {orders.map((order, index) => (
                    <TableRow className={classes.tableRow} hover key={order.id}>
                      <TableCell align="center">{index}</TableCell>
                      <TableCell align="center">{order.id}</TableCell>
                      <TableCell
                        className={classes.customerCell}
                        align="center"
                      >
                        {order.customer.name}
                      </TableCell>
                      <TableCell align="center">
                        {moment(order.createdAt).format("DD/MM/YYYY")}
                      </TableCell>
                      <TableCell align="center">
                        <div className={classes.statusWrapper}>
                          <Status
                            className={classes.status}
                            color={statusColors[order.status]}
                            size="sm"
                          />
                          {order.status}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </PortletContent>
        </PerfectScrollbar>
      </Portlet>
    );
  }
}

OrdersTable.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(OrdersTable);
