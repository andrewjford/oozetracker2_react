import React from "react";
import { Route } from "react-router-dom";
import MonthlyTotals from "../components/Monthlies/MonthlyTotals";
import { MonthByCategory } from "../components/Monthlies/MonthByCategory";

interface PassedProps {
  match: any;
  expensesByMonth: any;
  getMonthByCategory: (monthString: string, categoryId: number) => any;
}

export const MonthlyRoute = (props: PassedProps) => {
  const expensesByMonth = props.expensesByMonth;
  const getMonthByCategory = props.getMonthByCategory;

  return (
    <>
      <Route exact path={props.match.path} render={() => <MonthlyTotals />} />
      <Route
        exact
        path={`${props.match.path}/:monthString/category/:id`}
        render={props => {
          const { match } = props;
          return (
            <MonthByCategory
              getMonthByCategory={getMonthByCategory}
              expensesByMonth={expensesByMonth}
              monthString={match.params.monthString}
              categoryId={match.params.id}
            />
          );
        }}
      />
    </>
  );
};
