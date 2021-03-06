import { Category } from "./categoryInterfaces";

export interface ExpenseState {
  expenses: {
    [key: string]: Expense | undefined;
  };
  monthlies: {
    [key: string]: MonthlyExpenseSummary | undefined;
  };
  dataFetched: boolean;
  byMonth: any;
  suggestions: {
    topDescriptions: any;
    categoryToDescription: any;
  };
}

export interface MonthlyExpenseSummary {
  rows: MonthlyLineItemInterface[];
  rowCount: number;
  month: number;
  year: number;
}

export interface MonthlyLineItemInterface {
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
  category?: any;
  createdAt: Date;
}

export interface MonthRequest {
  month: number;
  year: number;
}

export interface ExpenseFormState {
  description: string;
  amount: number;
  date: string;
  category: number;
  id?: string;
}

export interface ExpenseSuggestionData {
  description: string;
  category_id: number;
  category: Category;
  recurrence: number;
}
