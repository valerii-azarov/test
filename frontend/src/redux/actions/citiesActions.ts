import { CitiesTypes } from "../actionTypes/citiesTypes";
import { City } from "../../interfaces/city-interface"; 

export type CitiesActions =
  // завантаження міст
  | { type: CitiesTypes.LOAD_CITIES_REQUEST }
  | { type: CitiesTypes.LOAD_CITIES_SUCCESS; payload: { cities: City[], totalItems: number } }
  | { type: CitiesTypes.LOAD_CITIES_FAILURE; payload: string }
  // завантаження міст області
  | { type: CitiesTypes.LOAD_CITIES_BY_REGION_REQUEST }
  | { type: CitiesTypes.LOAD_CITIES_BY_REGION_SUCCESS; payload: City[] }
  | { type: CitiesTypes.LOAD_CITIES_BY_REGION_FAILURE; payload: string }
  // додавання нового міста
  | { type: CitiesTypes.ADD_CITY_REQUEST }
  | { type: CitiesTypes.ADD_CITY_SUCCESS; payload: string }
  | { type: CitiesTypes.ADD_CITY_FAILURE; payload: string }
  // зміна міста
  | { type: CitiesTypes.UPDATE_CITY_REQUEST }
  | { type: CitiesTypes.UPDATE_CITY_SUCCESS; payload: string }
  | { type: CitiesTypes.UPDATE_CITY_FAILURE; payload: string }
  // видалення міста
  | { type: CitiesTypes.DELETE_CITY_REQUEST }
  | { type: CitiesTypes.DELETE_CITY_SUCCESS; payload: string }
  | { type: CitiesTypes.DELETE_CITY_FAILURE; payload: string }
  // скидання даних
  | { type: CitiesTypes.RESET_DATA };
