import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import {
  withStyles,
  Theme,
  WithStyles,
  createStyles
} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Refresh from "@material-ui/icons/Refresh";

import { getMonthly, changeMonthlyView } from "../../actions/expenseActions";
import {
  MonthlyExpenseSummary,
  MonthlyLineItemInterface,
  MonthRequest
} from "../../types/expenseTypes";
import { MonthlyLineItem } from "./MonthlyLineItem";

const styles = (theme: Theme) =>
  createStyles({
    mainHeader: {
      gridColumn: "1 / 5",
      height: "2rem",
      padding: "1rem 1rem 0"
    },
    summary: {
      marginTop: "1rem",
      display: "grid",
      gridTemplateColumns: "1rem 20% auto 20% 1rem"
    },
    paper: {
      gridColumnStart: 3,
      gridColumnEnd: 5,
      [theme.breakpoints.down("sm")]: {
        gridColumn: "2 / 6"
      },
      [theme.breakpoints.down("xs")]: {
        gridColumn: "1 / -1"
      }
    },
    headerItem: {
      verticalAlign: "middle",
      display: "inline"
    },
    headerItemRight: {
      verticalAlign: "middle",
      display: "inline",
      float: "right",
      color: theme.palette.primary.main
    },
    rotate: {
      animation: `$spin 1s`
    },
    "@keyframes spin": {
      "0%": { transform: "rotate(0deg)" },
      "100%": { transform: "rotate(360deg)" }
    }
  });

interface MonthlyProps extends WithStyles<typeof styles> {
  changeMonthlyView: (param: MonthRequest) => any;
  getMonthly: (current: MonthRequest) => any;
  monthlies: any;
  monthlyView: any;
}

interface MonthlyState {
  date: Date;
  monthNames: string[];
  rotate: boolean;
}

class MonthlyTotals extends React.Component<MonthlyProps, MonthlyState> {
  constructor(props: MonthlyProps) {
    super(props);

    this.state = {
      date: new Date(),
      monthNames: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec"
      ],
      rotate: false
    };
  }
  componentDidMount() {
    const currentMonthRequest: MonthRequest = {
      month: this.state.date.getMonth(),
      year: this.state.date.getFullYear()
    };
    this.props.getMonthly(currentMonthRequest);
  }

  changeMonthlyView = (monthlyObject: MonthRequest) => {
    const cachedView = this.props.monthlies.find(
      (monthly: MonthlyExpenseSummary) => {
        return (
          monthly.month === monthlyObject.month &&
          monthly.year === monthlyObject.year
        );
      }
    );

    if (cachedView) {
      this.props.changeMonthlyView(cachedView);
    } else {
      this.props.getMonthly(monthlyObject);
    }
  };

  handleLeftMonthClick = () => {
    const date = this.state.date;
    date.setMonth(this.state.date.getMonth() - 1);
    this.setState({ date });

    const currentMonthRequest = {
      month: date.getMonth(),
      year: date.getFullYear()
    };
    this.changeMonthlyView(currentMonthRequest);
  };

  handleRightMonthClick = () => {
    const date = this.state.date;
    date.setMonth(this.state.date.getMonth() + 1);
    this.setState({ date });

    const currentMonthRequest = {
      month: date.getMonth(),
      year: date.getFullYear()
    };
    this.changeMonthlyView(currentMonthRequest);
  };

  handleRefreshClick = () => {
    this.setState({ rotate: true });
    this.props.getMonthly({
      month: this.state.date.getMonth(),
      year: this.state.date.getFullYear()
    });
  };

  handleRowClick = (id: string) => {
    console.log("hi: " + id);
    // navigate to expense category (id) and month-year (from this.state.date)
  };

  renderLineItems = () => {
    if (!this.props.monthlyView) {
      return null;
    }
    return this.props.monthlyView.rows.map(
      (lineItem: MonthlyLineItemInterface) => {
        return (
          <MonthlyLineItem
            key={lineItem.id}
            lineItem={lineItem}
            handleRowClick={this.handleRowClick}
          />
        );
      }
    );
  };

  render() {
    const total = !this.props.monthlyView
      ? 0
      : this.props.monthlyView.rows
          .reduce((accum: number, lineItem: MonthlyLineItemInterface) => {
            return accum + parseFloat(lineItem.sum);
          }, 0)
          .toFixed(2);

    return (
      <Paper className={this.props.classes.paper}>
        <div className={this.props.classes.mainHeader}>
          <ChevronLeft
            className={this.props.classes.headerItem}
            onClick={this.handleLeftMonthClick}
          />
          <Typography
            className={this.props.classes.headerItem}
            variant="h5"
            component="h3"
          >
            {this.state.date.getFullYear()}{" "}
            {this.state.monthNames[this.state.date.getMonth()]}
          </Typography>
          <ChevronRight
            className={this.props.classes.headerItem}
            onClick={this.handleRightMonthClick}
          />
          <Refresh
            className={`${this.props.classes.headerItemRight} ${
              this.state.rotate ? this.props.classes.rotate : ""
            }`}
            onAnimationEnd={event => this.setState({ rotate: false })}
            onClick={this.handleRefreshClick}
          />
        </div>

        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Category</TableCell>
              <TableCell align="right">Amount</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {this.renderLineItems()}
            <TableRow>
              <TableCell>
                <b>Total</b>
              </TableCell>
              <TableCell align="right">
                <b>{total}</b>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Paper>
    );
  }
}

const mapStateToProps = (state: {
  expenses: {
    monthlies: {
      currentView: MonthlyExpenseSummary | null;
      monthlies: MonthlyExpenseSummary[];
    };
  };
}) => {
  return {
    monthlyView: state.expenses.monthlies.currentView,
    monthlies: state.expenses.monthlies.monthlies
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators(
    {
      getMonthly,
      changeMonthlyView
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(MonthlyTotals));
