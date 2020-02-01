import React from "react";
import { Route } from "react-router-dom";
import MonthlyTotals from "../components/Monthlies/MonthlyTotals";
import MonthByCategory from "../components/Monthlies/MonthByCategory";

interface PassedProps {
  match: any;
  expensesByMonth: any;
  categoriesMap: any;
  getMonthByCategory: (monthString: string, categoryId: number) => any;
}

export const MonthlyRoute = (props: PassedProps) => {
  const expensesByMonth = props.expensesByMonth;
  const getMonthByCategory = props.getMonthByCategory;
  const categoriesMap = props.categoriesMap;

  return (
    <>
      <Route exact path={props.match.path} render={() => <MonthlyTotals />} />
      <Route
        exact
        path={`${props.match.path}/:monthString/category/:id`}
        render={props => {
          const { monthString, id } = props.match.params;
          return (
            <MonthByCategory
              getMonthByCategory={getMonthByCategory}
              expensesByMonth={expensesByMonth}
              monthString={monthString}
              categoryId={id}
              categoryName={categoriesMap[id].name}
            />
          );
        }}
      />
    </>
  );
};
