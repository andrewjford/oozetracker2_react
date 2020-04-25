export interface RevenuesState {
  byMonth: RevenuesMap;
}

export interface RevenuesMap {
  [id: string]: Revenue[] | undefined;
}

export interface Revenue {
  amount: string;
  date: string;
  description: string;
  id?: string;
}
