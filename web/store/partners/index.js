import logError from "@/utils/sentry";
import { call, put, takeLeading } from "redux-saga/effects";
import {
  createAction,
  webResponseFailure,
  webResponseInitial,
  webResponseRequest,
  webResponseSuccess
} from "../helpers";
import sanity from "../sanity";

const REQUEST_PARTNERS_CONTENT = "REQUEST_PARTNERS_CONTENT";
const SUCCESS_PARTNERS_CONTENT = "SUCCESS_PARTNERS_CONTENT";
const FAILURE_PARTNERS_CONTENT = "FAILURE_PARTNERS_CONTENT";

export const partnersActions = {
  request: () => createAction(REQUEST_PARTNERS_CONTENT, webResponseRequest()),
  success: data =>
    createAction(SUCCESS_PARTNERS_CONTENT, webResponseSuccess(data)),
  failure: error =>
    createAction(FAILURE_PARTNERS_CONTENT, webResponseFailure(error))
};

const initialState = webResponseInitial();

export const partnersReducer = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_PARTNERS_CONTENT:
    case FAILURE_PARTNERS_CONTENT:
    case SUCCESS_PARTNERS_CONTENT:
      return action.payload;
    default:
      return state;
  }
};

export const getPartners = () => {
  const query = "*[_type == 'partner']";
  return sanity.fetch(query);
};

function* fetchPartners() {
  try {
    const response = yield call(getPartners);
    yield put(partnersActions.success(response));
  } catch (e) {
    logError(e);
    yield put(partnersActions.failure());
  }
}

export function* partnersSaga() {
  yield takeLeading(REQUEST_PARTNERS_CONTENT, fetchPartners);
}
