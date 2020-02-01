import MonthlyExpenseList from "./MonthlyExpenseList";
import React from "react";
import Loading from "../Loading";

interface PassedProps {
  getMonthByCategory: (monthString: string, categoryId: number) => any;
  expensesByMonth: any;
  monthString: string;
  categoryId: number;
}

export const MonthByCategory = (props: PassedProps) => {
  const { expensesByMonth, monthString, categoryId } = props;
  const cachedExpenses =
    expensesByMonth[monthString] && expensesByMonth[monthString][categoryId];

  if (cachedExpenses || cachedExpenses === []) {
    return <MonthlyExpenseList expenses={cachedExpenses} />;
  } else {
    props.getMonthByCategory(monthString, categoryId);
    return <Loading />;
  }
};
