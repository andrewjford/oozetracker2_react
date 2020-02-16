import { ExpenseState } from "./expenseInterfaces";

export interface RootState {
  account: any;
  expenses: ExpenseState;
  categories: any;
}
