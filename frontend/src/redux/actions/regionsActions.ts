import { RegionsTypes } from "../actionTypes/regionsTypes";
import { Region } from "../../interfaces/region-interface"; 

export type RegionsActions =
  // завантаження регіонів
  | { type: RegionsTypes.LOAD_REGIONS_REQUEST }
  | { type: RegionsTypes.LOAD_REGIONS_SUCCESS; payload: { regions: Region[], totalItems: number } }
  | { type: RegionsTypes.LOAD_REGIONS_FAILURE; payload: string }
  // додавання нового регіону
  | { type: RegionsTypes.ADD_REGION_REQUEST }
  | { type: RegionsTypes.ADD_REGION_SUCCESS; payload: string }
  | { type: RegionsTypes.ADD_REGION_FAILURE; payload: string }
  // зміна регіону
  | { type: RegionsTypes.UPDATE_REGION_REQUEST }
  | { type: RegionsTypes.UPDATE_REGION_SUCCESS; payload: string }
  | { type: RegionsTypes.UPDATE_REGION_FAILURE; payload: string }
  // видалення регіону
  | { type: RegionsTypes.DELETE_REGION_REQUEST }
  | { type: RegionsTypes.DELETE_REGION_SUCCESS; payload: string }
  | { type: RegionsTypes.DELETE_REGION_FAILURE; payload: string }
  // скидання даних
  | { type: RegionsTypes.RESET_DATA };
