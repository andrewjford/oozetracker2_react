import { ExpenseState } from "./expenseInterfaces";
import { RevenuesState } from "./revenueInterfaces";

export interface RootState {
  account: any;
  expenses: ExpenseState;
  categories: any;
  revenues: RevenuesState;
}
