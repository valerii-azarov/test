import { NewsTypes } from "../actionTypes/newsTypes";
import { News } from "../../interfaces/news-interface"; 

export type NewsActions =
  // завантаження новин
  | { type: NewsTypes.LOAD_NEWS_REQUEST }
  | { type: NewsTypes.LOAD_NEWS_SUCCESS; payload: { news: News[], totalItems: number } }
  | { type: NewsTypes.LOAD_NEWS_FAILURE; payload: string }
  // скидання даних
  | { type: NewsTypes.RESET_DATA };
