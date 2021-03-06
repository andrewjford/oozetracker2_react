import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import {
  withStyles,
  Theme,
  WithStyles,
  createStyles,
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
import RevenueSection from "./RevenueSection";

import { getMonthly } from "../../actions/expenseActions";
import { getRevenues } from "../../actions/revenueActions";
import {
  MonthlyExpenseSummary,
  MonthlyLineItemInterface,
  MonthRequest,
} from "../../interfaces/expenseInterfaces";
import MonthlyLineItem from "./MonthlyLineItem";
import { Redirect } from "react-router-dom";
import { MONTHS_ARRAY } from "./constants";
import { TableContainer } from "@material-ui/core";
import { RevenuesMap } from "../../interfaces/revenueInterfaces";

export function dateToMonthString(date: Date): string {
  return `${date.getFullYear()}-${date.getMonth() + 1}`;
}

const styles = (theme: Theme) =>
  createStyles({
    mainHeader: {
      gridColumn: "1 / 5",
      height: "2rem",
      padding: "1rem 1rem 0.5rem",
    },
    summary: {
      marginTop: "1rem",
      display: "grid",
      gridTemplateColumns: "1rem 20% auto 20% 1rem",
    },
    paper: {
      gridColumnStart: 3,
      gridColumnEnd: 5,
      [theme.breakpoints.down("sm")]: {
        gridColumn: "2 / 6",
      },
      [theme.breakpoints.down("xs")]: {
        gridColumn: "1 / -1",
      },
    },
    headerItem: {
      verticalAlign: "middle",
      display: "inline",
    },
    headerItemRight: {
      verticalAlign: "middle",
      display: "inline",
      float: "right",
      color: theme.palette.primary.main,
    },
    rotate: {
      animation: `$spin 1s`,
    },
    "@keyframes spin": {
      "0%": { transform: "rotate(0deg)" },
      "100%": { transform: "rotate(360deg)" },
    },
  });

interface MonthlyProps extends WithStyles<typeof styles> {
  getMonthly: (current: MonthRequest) => any;
  getRevenues: () => any;
  monthlies: { [key: string]: MonthlyExpenseSummary };
  revenuesByMonth: RevenuesMap;
  revenuesFetched: boolean;
  monthString: string;
}

interface MonthlyState {
  date: Date;
  rotate: boolean;
  redirect: string;
}

class MonthlyTotals extends React.Component<MonthlyProps, MonthlyState> {
  constructor(props: MonthlyProps) {
    super(props);

    const [year, month] = props.monthString.split("-");
    const date: Date = new Date();

    if (!props.monthString) {
      const todayMonthString = dateToMonthString(date);
      this.state = {
        date,
        rotate: false,
        redirect: `/monthly/${todayMonthString}`,
      };
    } else {
      date.setMonth(parseInt(month, 10) - 1);
      date.setFullYear(parseInt(year, 10));

      this.state = {
        date,
        rotate: false,
        redirect: "",
      };
    }
  }

  componentDidMount() {
    if (!this.props.revenuesFetched) {
      this.props.getRevenues();
    }
  }

  getCurrentView = () => {
    const monthRequest: MonthRequest = {
      month: this.state.date.getMonth(),
      year: this.state.date.getFullYear(),
    };
    const monthString: string = dateToMonthString(this.state.date);
    const cachedView: MonthlyExpenseSummary = this.props.monthlies[monthString];

    if (!cachedView) {
      this.props.getMonthly(monthRequest);
    }
  };

  changeMonthlyView = (monthlyObject: MonthRequest) => {
    const monthString = `${monthlyObject.year}-${monthlyObject.month + 1}`;
    this.setState({
      redirect: `/monthly/${monthString}`,
    });
  };

  handleMonthClick = (monthChange: number) => {
    const date = this.state.date;
    date.setMonth(this.state.date.getMonth() + monthChange);
    this.setState({ date });

    const currentMonthRequest = {
      month: date.getMonth(),
      year: date.getFullYear(),
    };
    this.changeMonthlyView(currentMonthRequest);
  };

  handleLeftMonthClick = () => {
    this.handleMonthClick(-1);
  };

  handleRightMonthClick = () => {
    this.handleMonthClick(1);
  };

  handleRefreshClick = () => {
    this.setState({ rotate: true });
    this.props.getMonthly({
      month: this.state.date.getMonth(),
      year: this.state.date.getFullYear(),
    });
  };

  handleRowClick = (categoryId: number) => {
    const monthString = dateToMonthString(this.state.date);
    this.setState({
      redirect: `/monthly/${monthString}/category/${categoryId}`,
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
      return <Redirect to={redirect} push={true} />;
    }
  };

  render() {
    const classes = this.props.classes;
    const monthString: string = dateToMonthString(this.state.date);
    const currentView: MonthlyExpenseSummary = this.props.monthlies[
      monthString
    ];

    if (!currentView) {
      this.getCurrentView();
    }

    const totalExpense: number = !currentView
      ? 0
      : currentView.rows.reduce(
          (accum: number, lineItem: MonthlyLineItemInterface) => {
            return accum + parseFloat(lineItem.sum);
          },
          0
        );

    const revenues = () => {
      return this.props.revenuesByMonth[monthString] || [];
    };

    const netIncome: number =
      revenues().reduce((sum, each) => {
        return sum + parseFloat(each.amount);
      }, 0) - totalExpense;

    return (
      <Paper className={classes.paper}>
        {this.redirect()}
        <div className={classes.mainHeader}>
          <ChevronLeft
            className={classes.headerItem}
            onClick={this.handleLeftMonthClick}
          />
          <Typography
            className={classes.headerItem}
            variant="h5"
            component="h3"
          >
            {this.state.date.getFullYear()}{" "}
            {MONTHS_ARRAY[this.state.date.getMonth()]}
          </Typography>
          <ChevronRight
            className={classes.headerItem}
            onClick={this.handleRightMonthClick}
          />
          <Refresh
            className={`${classes.headerItemRight} ${
              this.state.rotate ? classes.rotate : ""
            }`}
            onAnimationEnd={(event) => this.setState({ rotate: false })}
            onClick={this.handleRefreshClick}
          />
        </div>
        <RevenueSection revenues={revenues()} date={this.state.date} />
        <TableContainer>
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
                  <b>Total Expenses</b>
                </TableCell>
                <TableCell align="right">
                  <b>{totalExpense.toFixed(2)}</b>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <b>Net Income</b>
                </TableCell>
                <TableCell align="right">
                  <b>{netIncome.toFixed(2)}</b>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    );
  }
}

const mapStateToProps = (state: {
  expenses: {
    monthlies: {};
  };
  revenues: {
    byMonth: RevenuesMap;
    fetched: boolean;
  };
}) => {
  return {
    monthlies: state.expenses.monthlies,
    revenuesByMonth: state.revenues.byMonth,
    revenuesFetched: state.revenues.fetched,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators(
    {
      getMonthly,
      getRevenues,
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(MonthlyTotals));
