import { call, put, takeLeading } from "redux-saga/effects";
import {
  createAction,
  webResponseFailure,
  webResponseInitial,
  webResponseRequest,
  webResponseSuccess
} from "../helpers";
import sanity from "../sanity";

const REQUEST_FRONT_PAGE_CONTENT = "REQUEST_FRONT_PAGE_CONTENT";
const SUCCESS_FRONT_PAGE_CONTENT = "SUCCESS_FRONT_PAGE_CONTENT";
const FAILURE_FRONT_PAGE_CONTENT = "FAILURE_FRONT_PAGE_CONTENT";

export const frontPageActions = {
  request: () => createAction(REQUEST_FRONT_PAGE_CONTENT, webResponseRequest()),
  success: data =>
    createAction(SUCCESS_FRONT_PAGE_CONTENT, webResponseSuccess(data)),
  failure: error =>
    createAction(FAILURE_FRONT_PAGE_CONTENT, webResponseFailure(error))
};

const initialState = webResponseInitial();

export const frontPageReducer = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_FRONT_PAGE_CONTENT:
    case FAILURE_FRONT_PAGE_CONTENT:
    case SUCCESS_FRONT_PAGE_CONTENT:
      return action.payload;
    default:
      return state;
  }
};

export const getFrontPage = () => sanity.getDocument("global-front-page");

function* fetchFrontPage() {
  try {
    const response = yield call(getFrontPage);
    yield put(frontPageActions.success(response));
  } catch (e) {
    yield put(frontPageActions.failure(`${e}`));
  }
}

export function* frontPageSaga() {
  yield takeLeading(REQUEST_FRONT_PAGE_CONTENT, fetchFrontPage);
}
