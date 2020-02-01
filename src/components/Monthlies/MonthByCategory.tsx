import MonthlyExpenseList from "./MonthlyExpenseList";
import React from "react";
import Loading from "../Loading";
import {
  Paper,
  Theme,
  WithStyles,
  Typography,
  createStyles,
  withStyles
} from "@material-ui/core";
import { MONTHS_ARRAY } from "./constants";

const styles = (theme: Theme) =>
  createStyles({
    mainHeader: {
      padding: "1rem 1rem 0"
    },
    paper: {
      gridColumnStart: 2,
      gridColumnEnd: 6,
      [theme.breakpoints.down("xs")]: {
        gridColumn: "1 / -1"
      }
    },
    loadingSpinner: {
      gridColumnStart: 2,
      gridColumnEnd: 6,
      height: "20rem"
    },
    tableWrapper: {
      overflowX: "auto"
    }
  });

interface PassedProps extends WithStyles<typeof styles> {
  getMonthByCategory: (monthString: string, categoryId: number) => any;
  expensesByMonth: any;
  monthString: string;
  categoryId: number;
  categoryName: string;
}

const MonthByCategory = (props: PassedProps) => {
  const { expensesByMonth, monthString, categoryId, categoryName } = props;
  const [year, month] = monthString.split("-");
  const cachedExpenses =
    expensesByMonth[monthString] && expensesByMonth[monthString][categoryId];
  const title = `${
    MONTHS_ARRAY[parseInt(month, 10) - 1]
  } ${year} - ${categoryName}`;

  if (cachedExpenses || cachedExpenses === []) {
    return (
      <Paper className={props.classes.paper}>
        <Typography
          className={props.classes.mainHeader}
          variant="h5"
          component="h3"
        >
          {title}
        </Typography>
        <section className={props.classes.tableWrapper}>
          <MonthlyExpenseList expenses={cachedExpenses} />
        </section>
      </Paper>
    );
  } else {
    props.getMonthByCategory(monthString, categoryId);
    return (
      <Paper className={props.classes.paper}>
        <Loading />
      </Paper>
    );
  }
};

export default withStyles(styles)(MonthByCategory);
