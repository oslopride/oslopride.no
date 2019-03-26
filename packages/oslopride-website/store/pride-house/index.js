import { all, call, put, takeLeading } from "redux-saga/effects";
import { articleActions } from "../articles";
import {
  createAction,
  webResponseFailure,
  webResponseInitial,
  webResponseRequest,
  webResponseSuccess
} from "../helpers";
import sanity from "../sanity";

const REQUEST_PRIDE_HOUSE_CONTENT = "REQUEST_PRIDE_HOUSE_CONTENT";
const SUCCESS_PRIDE_HOUSE_CONTENT = "SUCCESS_PRIDE_HOUSE_CONTENT";
const FAILURE_PRIDE_HOUSE_CONTENT = "FAILURE_PRIDE_HOUSE_CONTENT";

export const prideHouseActions = {
  request: () =>
    createAction(REQUEST_PRIDE_HOUSE_CONTENT, webResponseRequest()),
  success: data =>
    createAction(SUCCESS_PRIDE_HOUSE_CONTENT, webResponseSuccess(data)),
  failure: error =>
    createAction(FAILURE_PRIDE_HOUSE_CONTENT, webResponseFailure(error))
};

const initialState = webResponseInitial();

export const prideHouseReducer = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_PRIDE_HOUSE_CONTENT:
    case FAILURE_PRIDE_HOUSE_CONTENT:
    case SUCCESS_PRIDE_HOUSE_CONTENT:
      return action.payload;
    default:
      return state;
  }
};

export const getPrideHouse = () =>
  sanity.fetch(`*[_id=="global-pride-house"]{
  image,
  preamble,
  body,
  articles[]->,
}[0]`);

function* fetchPrideHouse() {
  try {
    const response = yield call(getPrideHouse);
    yield all(
      response.articles.map(article => put(articleActions.success(article)))
    );
    yield put(prideHouseActions.success(response));
  } catch (e) {
    yield put(prideHouseActions.failure(`${e}`));
  }
}

export function* prideHouseSaga() {
  yield takeLeading(REQUEST_PRIDE_HOUSE_CONTENT, fetchPrideHouse);
}
