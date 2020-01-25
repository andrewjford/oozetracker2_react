import { ExpenseState } from "./expenseTypes";

export interface RootState {
  account: any;
  expenses: ExpenseState;
  categories: any;
}
