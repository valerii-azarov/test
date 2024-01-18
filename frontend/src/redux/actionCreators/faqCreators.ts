import { Dispatch } from "redux";
import { RootState } from "../store";
import axios, { AxiosError, AxiosResponse } from "axios";
import { FaqTypes } from "../actionTypes/faqTypes";
import { FaqActions } from "../actions/faqActions";
// import { ServiceType } from "../../interfaces/service-type-interface";
import { ErrorResponse } from "../../interfaces/error-interface";
// import { Notification } from "../../utils/Notification";

// завантаження питань та відповідей
export const loadFaqData = ({ itemsPerPage, currentPage }: { itemsPerPage?: number; currentPage?: number } = {}) => async (dispatch: Dispatch, getState: () => RootState) => {
  dispatch({
    type: FaqTypes.LOAD_FAQ_REQUEST,
  });

  const token = getState().auth.token;
  const queryParams = currentPage && itemsPerPage ? `?limit=${itemsPerPage}&page=${currentPage}` : "";

  axios
    .get(`${process.env.REACT_APP_API_URL}/faq${queryParams}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then((response: AxiosResponse) => {
      dispatch({
        type: FaqTypes.LOAD_FAQ_SUCCESS,
        payload: {
          faq: response.data.faq,
          totalItems: response.data.count,
        },
      });
    })
    .catch((error: AxiosError<ErrorResponse>) => {
      dispatch({
        type: FaqTypes.LOAD_FAQ_FAILURE,
        payload: error?.response ? error.response.data.message : error.message,
      });
    });
};

// скидання даних
export const resetData = () => async (dispatch: Dispatch<FaqActions>) => {
  dispatch({
    type: FaqTypes.RESET_DATA,
  });
};
