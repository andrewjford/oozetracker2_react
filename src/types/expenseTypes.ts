export interface ExpenseState {
  expenses: Expense[];
  monthlies: {
    currentView: MonthlyExpenseSummary | null;
    monthlies: MonthlyExpenseSummary[];
  };
  dataFetched: boolean;
}

export interface MonthlyExpenseSummary {
  rows: MonthlyLineItem[];
  rowCount: number;
  month: number;
  year: number;
}

export interface MonthlyLineItem {
  sum: string;
  id: number;
  name: string;
}

export interface Expense {
  id: string;
  description: string;
  amount: number;
  category_id: number;
  date: string;
}

export interface MonthRequest {
  month: number;
  year: number;
}

export interface ExpenseFormState {
  description: string;
  amount: number;
  date: string;
  category: string;
  id?: string;
}
