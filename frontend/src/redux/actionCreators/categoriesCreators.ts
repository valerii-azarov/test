import { Dispatch } from "redux";
import { RootState } from "../store";
import axios, { AxiosError, AxiosResponse } from "axios";
import { CategoriesTypes } from "../actionTypes/categoriesTypes";
import { CategoriesActions } from "../actions/categoriesActions";
// import { Category } from "../../interfaces/category-interface";
import { ErrorResponse } from "../../interfaces/error-interface";
// import { Notification } from "../../utils/Notification";

// завантаження категорій
export const loadCategoriesData = ({ itemsPerPage, currentPage }: { itemsPerPage?: number; currentPage?: number } = {}) => async (dispatch: Dispatch, getState: () => RootState) => {
  dispatch({
    type: CategoriesTypes.LOAD_CATEGORIES_REQUEST,
  });

  const token = getState().auth.token;
  const queryParams = currentPage && itemsPerPage ? `?limit=${itemsPerPage}&page=${currentPage}` : "";

  axios
    .get(`${process.env.REACT_APP_API_URL}/categories${queryParams}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then((response: AxiosResponse) => {
      dispatch({
        type: CategoriesTypes.LOAD_CATEGORIES_SUCCESS,
        payload: {
          categories: response.data.categories,
          totalItems: response.data.count,
        },
      });
    })
    .catch((error: AxiosError<ErrorResponse>) => {
      dispatch({
        type: CategoriesTypes.LOAD_CATEGORIES_FAILURE,
        payload: error?.response ? error.response.data.message : error.message,
      });
    });
};

// скидання даних
export const resetData = () => async (dispatch: Dispatch<CategoriesActions>) => {
  dispatch({
    type: CategoriesTypes.RESET_DATA,
  });
};
