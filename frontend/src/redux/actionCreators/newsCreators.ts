import { Dispatch } from "redux";
import { RootState } from "../store";
import axios, { AxiosError, AxiosResponse } from "axios";
import { NewsTypes } from "../actionTypes/newsTypes";
import { NewsActions } from "../actions/newsActions";
// import { ServiceType } from "../../interfaces/service-type-interface";
import { ErrorResponse } from "../../interfaces/error-interface";
// import { Notification } from "../../utils/Notification";

// завантаження новин
export const loadNewsData = ({ itemsPerPage, currentPage }: { itemsPerPage?: number; currentPage?: number } = {}) => async (dispatch: Dispatch, getState: () => RootState) => {
  dispatch({
    type: NewsTypes.LOAD_NEWS_REQUEST,
  });

  const token = getState().auth.token;
  const queryParams = currentPage && itemsPerPage ? `?limit=${itemsPerPage}&page=${currentPage}` : "";

  axios
    .get(`${process.env.REACT_APP_API_URL}/news${queryParams}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then((response: AxiosResponse) => {
      dispatch({
        type: NewsTypes.LOAD_NEWS_SUCCESS,
        payload: {
          news: response.data.news,
          totalItems: response.data.count,
        },
      });
    })
    .catch((error: AxiosError<ErrorResponse>) => {
      dispatch({
        type: NewsTypes.LOAD_NEWS_FAILURE,
        payload: error?.response ? error.response.data.message : error.message,
      });
    });
};

// скидання даних
export const resetData = () => async (dispatch: Dispatch<NewsActions>) => {
  dispatch({
    type: NewsTypes.RESET_DATA,
  });
};
