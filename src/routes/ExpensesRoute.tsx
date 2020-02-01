import React from "react";
import { Route } from "react-router-dom";
import SummaryDisplay from "../components/SummaryDisplay";
import ExpenseForm from "../components/Expenses/ExpenseForm";
import ExpenseDetail from "../components/Expenses/ExpenseDetail";

interface PassedProps {
  match: any;
  categories: any;
  categoriesMap: any;
  getExpense: (expenseId: string) => any;
}

export const ExpensesRoute = (props: PassedProps) => {
  const categories = props.categories;
  const getExpense = props.getExpense;
  const categoriesMap = props.categoriesMap;

  return (
    <>
      <Route exact path={props.match.path} render={() => <SummaryDisplay />} />
      <Route
        exact
        path={`${props.match.path}/:id/edit`}
        render={props => {
          return (
            <ExpenseForm
              categories={categories}
              expense={getExpense(props.match.params.id)}
            />
          );
        }}
      />
      <Route
        exact
        path={`${props.match.path}/:id`}
        render={props => {
          if (props.match.params.id === "new") {
            return <ExpenseForm categories={categories} expense={null} />;
          } else {
            return (
              <ExpenseDetail
                categoriesMap={categoriesMap}
                expense={getExpense(props.match.params.id)}
              />
            );
          }
        }}
      />
    </>
  );
};
