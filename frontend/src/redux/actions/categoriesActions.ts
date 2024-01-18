import { CategoriesTypes } from "../actionTypes/categoriesTypes";
import { Category } from "../../interfaces/category-interface"; 

export type CategoriesActions =
  // завантаження категорій
  | { type: CategoriesTypes.LOAD_CATEGORIES_REQUEST }
  | { type: CategoriesTypes.LOAD_CATEGORIES_SUCCESS; payload: { categories: Category[], totalItems: number } }
  | { type: CategoriesTypes.LOAD_CATEGORIES_FAILURE; payload: string }
  // скидання даних
  | { type: CategoriesTypes.RESET_DATA };
