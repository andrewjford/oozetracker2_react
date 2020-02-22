export interface CategoriesState {
  displayCategoryInput: boolean;
  categories: Category[];
  categoriesMap: CategoriesMap;
  dataFetched: boolean;
}

export interface Category {
  id: number;
  name: string;
  account_id: number;
}

export interface CategoriesMap {
  [id: string]: Category | undefined;
}
