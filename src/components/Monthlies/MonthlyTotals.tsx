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
import { Redirect } from "react-router-dom";
import { MONTHS_ARRAY } from "./constants";

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
  monthString: string;
}

interface MonthlyState {
  date: Date;
  rotate: boolean;
  redirect: string;
  currentView?: MonthlyExpenseSummary;
}

class MonthlyTotals extends React.Component<MonthlyProps, MonthlyState> {
  constructor(props: MonthlyProps) {
    super(props);

    const [year, month] = props.monthString.split("-");
    const monthStringAsDate: Date = new Date();

    if (!props.monthString) {
      const monthString = `${monthStringAsDate.getFullYear()}-${monthStringAsDate.getMonth() +
        1}`;
      this.state = {
        date: monthStringAsDate,
        rotate: false,
        redirect: `/monthly/${monthString}`
      };
    } else {
      monthStringAsDate.setMonth(parseInt(month, 10) - 1);
      monthStringAsDate.setFullYear(parseInt(year, 10));

      this.state = {
        date: monthStringAsDate,
        rotate: false,
        redirect: ""
      };
    }
  }
  componentDidMount() {
    const currentMonthRequest: MonthRequest = {
      month: this.state.date.getMonth(),
      year: this.state.date.getFullYear()
    };

    this.getCurrentView(currentMonthRequest);
  }

  getCurrentView = (monthRequest: MonthRequest) => {
    const cachedView: MonthlyExpenseSummary = this.props.monthlies.find(
      (monthly: MonthlyExpenseSummary) => {
        return (
          monthly.month === monthRequest.month &&
          monthly.year === monthRequest.year
        );
      }
    );

    if (!cachedView) {
      this.props.getMonthly(monthRequest);
    }
  };

  changeMonthlyView = (monthlyObject: MonthRequest) => {
    const monthString = `${monthlyObject.year}-${monthlyObject.month + 1}`;
    this.setState({
      redirect: `/monthly/${monthString}`
    });
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

  handleRowClick = (categoryId: number) => {
    const monthString = `${this.state.date.getFullYear()}-${this.state.date.getMonth() +
      1}`;
    this.setState({
      redirect: `/monthly/${monthString}/category/${categoryId}`
    });
  };

  renderLineItems = (currentView: MonthlyExpenseSummary) => {
    if (!currentView) {
      return null;
    }
    return currentView.rows.map((lineItem: MonthlyLineItemInterface) => {
      return (
        <MonthlyLineItem
          key={lineItem.id}
          lineItem={lineItem}
          handleRowClick={this.handleRowClick}
        />
      );
    });
  };

  redirect = () => {
    const { redirect } = this.state;
    if (!!redirect) {
      return <Redirect to={redirect} />;
    }
  };

  render() {
    const currentMonthRequest: MonthRequest = {
      month: this.state.date.getMonth(),
      year: this.state.date.getFullYear()
    };

    const currentView: MonthlyExpenseSummary = this.props.monthlies.find(
      (monthly: MonthlyExpenseSummary) => {
        return (
          monthly.month === currentMonthRequest.month &&
          monthly.year === currentMonthRequest.year
        );
      }
    );

    const total = !currentView
      ? 0
      : currentView.rows
          .reduce((accum: number, lineItem: MonthlyLineItemInterface) => {
            return accum + parseFloat(lineItem.sum);
          }, 0)
          .toFixed(2);

    return (
      <Paper className={this.props.classes.paper}>
        {this.redirect()}
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
            {MONTHS_ARRAY[this.state.date.getMonth()]}
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
            {this.renderLineItems(currentView)}
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
