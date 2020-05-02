export interface RevenuesState {
  byMonth: RevenuesMap;
  fetched: boolean;
}

export interface RevenuesMap {
  [id: string]: Revenue[];
}

export interface Revenue {
  amount: string;
  date: string;
  description: string;
  id?: string;
  tempId?: string;
}
